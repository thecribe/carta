"use server";

import axios from "axios";
import jwt from "jsonwebtoken";

axios.defaults.baseURL = process.env.API_REQUEST_BASE_URL;

//Create access and refresh token

export const generateAccessRefreshToken = async (data) => {
  const accessToken = jwt.sign(data, process.env.JWT_TOKEN_KEY, {
    expiresIn: "15000",
  });
  const refreshToken = jwt.sign(data, process.env.JWT_TOKEN_KEY, {
    expiresIn: "12h",
  });

  return { accessToken, refreshToken };
};

//Confirm access token validity and refresh if expired

export const checkTokenValidity = async (accessToken, refreshToken) => {
  if (accessToken && refreshToken) {
    try {
      const response = await axios.get(
        `/api/token?bearer=${JSON.stringify({ accessToken, refreshToken })}`
      );

      return response.data;
    } catch (error) {
      return { message: "Session expired" };
    }
  }
};

//Generate User login token

export const userLoginToken = async (email, password) => {
  const token = jwt.sign({ email, password }, process.env.JWT_TOKEN_KEY, {
    expiresIn: "15000",
  });

  return token;
};

//decode user login details
