"use server";

import axios from "axios";
import { validate } from "./formValidation";
axios.defaults.baseURL = process.env.API_REQUEST_BASE_URL;

export const getAllCohort = async () => {
  try {
    const response = await axios.get("/api/cohort");

    return response.data;
  } catch (error) {
    return false;
  }
};

export const addCohort = async (forminput) => {
  const { cohort } = forminput;

  if (!validate.username(cohort.trim())) {
    return false;
  }

  try {
    const response = await axios.post("/api/cohort", {
      ...forminput,
      cohort: cohort.trim().toLowerCase(),
    });
    return response.data;
  } catch (error) {
    return false;
  }
};

export const editCohort = async (forminput, id) => {
  const { cohort } = forminput;

  if (!validate.username(cohort.trim())) {
    return false;
  }

  try {
    const response = await axios.put(`/api/cohort?id=${id}`, {
      ...forminput,
      cohort: cohort.trim().toLowerCase(),
    });

    return response.data;
  } catch (error) {
    return false;
  }
};
export const deleteCohort = async (id) => {
  try {
    const response = await axios.delete(`/api/cohort?id=${id}`);

    return response.data;
  } catch (error) {
    return false;
  }
};
