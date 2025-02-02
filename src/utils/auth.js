"use server";
import { signIn, signOut } from "@/auth";
import { validate } from "./formValidation";
import axios from "axios";
import { generateAccessRefreshToken } from "./tokens";

axios.defaults.baseURL = process.env.API_REQUEST_BASE_URL;
var bcrypt = require("bcryptjs");

export const doUserLogin = async (formInput) => {
  const { username, password } = formInput;

  let validationObj = { username: false, password: false };

  if (!validate.username(username)) {
    validationObj = { ...validationObj, username: true };
  }
  if (!validate.username(password)) {
    validationObj = { ...validationObj, password: true };
  }

  if (validationObj.username || validationObj.password) {
    return false;
  }

  try {
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
      //   redirectTo: "/dashboard",
    });

    return true;
  } catch (error) {
    return { error: true, message: error.cause.err.message };
  }
};

export const userValidation = async (username, password) => {
  try {
    const response = await axios.get(
      `/api/users/single_user?username=${username}`
    );
    if (!response.data.user) {
      return { user: null };
    }
    //Check and compare passwords
    const checkPassword = bcrypt.compareSync(
      password,
      response.data.user.password
    );
    if (!checkPassword) {
      return { user: null };
    }

    //Make api call to receive access and refresh tokens
    const token = await generateAccessRefreshToken({
      id: response.data.user.id,
    });

    return {
      ...response.data,
      user: { ...response.data.user, password: null },
      ...token,
    };
  } catch (error) {
    return false;
  }
};
export const doUserLogout = async () => {
  await signOut({ redirectTo: "/directory" });
};
