"use server";

import axios from "axios";
import { validate } from "./formValidation";
axios.defaults.baseURL = process.env.API_REQUEST_BASE_URL;

export const getAllInstitution = async () => {
  try {
    const response = await axios.get("/api/institution");

    return response.data;
  } catch (error) {
    return false;
  }
};

export const addInstitution = async (forminput) => {
  const { name } = forminput;
  console.log(forminput);
  if (!validate.username(name.trim())) {
    return false;
  }

  try {
    const response = await axios.post("/api/institution", {
      ...forminput,
      name: name.trim().toLowerCase(),
    });
    return response.data;
  } catch (error) {
    return false;
  }
};

export const editinstitution = async (forminput, id) => {
  const { name } = forminput;

  if (!validate.username(name.trim())) {
    return false;
  }

  try {
    const response = await axios.put(`/api/institution?id=${id}`, {
      ...forminput,
      name: name.trim().toLowerCase(),
    });

    return response.data;
  } catch (error) {
    return false;
  }
};
export const deleteInstitution = async (id) => {
  try {
    const response = await axios.delete(`/api/institution?id=${id}`);

    return response.data;
  } catch (error) {
    return false;
  }
};
