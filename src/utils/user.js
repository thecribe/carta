"use server";

import axios from "axios";
import { validate } from "./formValidation";
var bcrypt = require("bcryptjs");
axios.defaults.baseURL = process.env.API_REQUEST_BASE_URL;

export const getAllUsers = async () => {
  try {
    const response = await axios.get("/api/users");
    return response.data;
  } catch (error) {
    return false;
  }
};

export const addUser = async (forminput) => {
  const { username, email, password } = forminput;

  //Input Validation

  if (
    !validate.username(username) ||
    !validate.email(email) ||
    !validate.password(password)
  ) {
    return { status: false, message: "One or more inccorect field" };
  }

  //HashPassword
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password.trim(), salt);

  //REGISTER USER

  try {
    const response = await axios.post("/api/users", {
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    return {
      ...response.data,
      user: { ...response.data.user, password: null },
    };
  } catch (error) {
    return false;
  }
};

export const updateUser = async (forminput, id) => {
  let username = forminput.username.username.trim();
  let email = forminput.email.email.trim();

  if (!!forminput.password.password) {
    //HashPassword
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(
      forminput.password.password.trim(),
      salt
    );

    try {
      const response = await axios.put(`/api/users?userId=${id}`, {
        username,
        email,
        password: hashedPassword,
      });

      return response.data;
    } catch (error) {
      return false;
    }
  } else {
    try {
      const response = await axios.put(`/api/users?userId=${id}`, {
        username,
        email,
      });
      return response.data;
    } catch (error) {
      return false;
    }
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/api/users?userId=${id}`);

    return response.data;
  } catch (error) {
    return false;
  }
};
