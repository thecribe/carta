"use server";

import axios from "axios";
import { validate } from "./formValidation";

axios.defaults.baseURL = process.env.API_REQUEST_BASE_URL;

export const addFellow = async (forminput) => {
  if (!validate.email(forminput.email.trim().toLowerCase())) {
    return { message: "Please input a valid email" };
  }
  if (!validate.username(forminput.cohortId.trim().toLowerCase())) {
    return { message: "Please select a cohort" };
  }
  if (!validate.username(forminput.institutionId.trim().toLowerCase())) {
    return { message: "Please select your institution" };
  }

  const dataReprocessed = {
    ...forminput,
    firstname: forminput.name.firstname,
    othername: forminput.name.othername,
    surname: forminput.name.surname,
    img_url: JSON.stringify(forminput.profileImg),
    email: forminput.email.trim().toLowerCase(),
  };

  try {
    const response = await axios.post("/api/fellow", dataReprocessed);
    if (!response.data.created) {
      return { message: "Fellow with the email already added" };
    }
    return {
      ...response.data,
    };
  } catch (error) {
    return false;
  }
};

export const getAllFellow = async (query, type) => {
  let sortedArray = [];
  try {
    let response;
    if (type) {
      if (type === "institution") {
        response = await axios.get(
          `/api/fellow?query=${query}&type=institution`
        );
      } else if (type === "cohort") {
        response = await axios.get(`/api/fellow?query=${query}&type=cohort`);
      }
    } else {
      response = await axios.get(`/api/fellow`);
    }

    if (!response.data) {
      return false;
    }

    response.data.fellows.forEach((fellow) => {
      sortedArray.push({
        ...fellow,
        name: {
          surname: fellow.surname,
          firstname: fellow.firstname,
          othername: fellow.othername,
        },
        profileImg: JSON.parse(fellow.img_url),
      });
    });

    return sortedArray;
  } catch (error) {
    return false;
  }
};

export const getSingleFellow = async (id) => {
  let newfellow = {};
  try {
    const response = await axios.get(
      `/api/fellow/single_fellow?id=${id.toString()}`
    );

    if (!response.data) {
      return false;
    }

    newfellow = {
      ...response.data,
      name: {
        surname: response.data.surname,
        firstname: response.data.firstname,
        othername: response.data.othername,
      },
      profileImg: JSON.parse(response.data.img_url),
    };
    // console.log(newfellow);
    return newfellow;
  } catch (error) {
    return false;
  }
};

export const updateFellow = async (forminput, id) => {
  if (!validate.email(forminput.email.trim().toLowerCase())) {
    return { message: "Please input a valid email" };
  }
  if (!validate.username(forminput.cohortId.trim().toLowerCase())) {
    return { message: "Please select a cohort" };
  }
  if (!validate.username(forminput.institutionId.trim().toLowerCase())) {
    return { message: "Please select your institution" };
  }
  const dataReprocessed = {
    ...forminput,
    firstname: forminput.name.firstname,
    othername: forminput.name.othername,
    surname: forminput.name.surname,
    img_url: JSON.stringify(forminput.profileImg),
    email: forminput.email.trim().toLowerCase(),
  };

  try {
    const response = await axios.put(`/api/fellow?id=${id}`, dataReprocessed);

    return {
      ...response.data,
    };
  } catch (error) {
    return false;
  }
};
export const deleteFellow = async (id) => {
  try {
    const response = await axios.delete(`/api/fellow?id=${id}`);

    return response.data;
  } catch (error) {
    return false;
  }
};
