"use server";

import { researchers, institutions, cohorts } from "./fellowList";

// const institution =
//Fellows
export const getSearchFellows = async (input) => {
  let output = [];
  if (input !== "") {
    researchers.forEach((fellow, index) => {
      if (
        (fellow.name.firstname + " " + fellow.name.lastname)
          .toLowerCase()
          .includes(input)
      ) {
        output.push(fellow);
      }
    });
  }
  return output;
};

export const getAllFellow = async (data, filter) => {
  if (!filter) {
    return researchers;
  }

  let response;

  if (filter === "institution") {
    response = researchers.filter((obj) =>
      obj.university.toLowerCase().includes(data.toLowerCase())
    );
  } else if (filter === "cohort") {
    response = researchers.filter((obj) =>
      obj.cohort.toString().includes(data.toString())
    );
  }

  if (!response) {
    return false;
  }
  return response;
};

export const getSingleFellow = async (id) => {
  const fellow = researchers.find((obj) => obj.id === +id);

  if (!fellow) {
    return false;
  }

  return fellow;
};

export const getAllUniversity = async () => {
  return institutions;
};
export const getAllCohort = async () => {
  return cohorts;
};
