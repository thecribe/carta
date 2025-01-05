"use server";

import { researchers } from "./fellowList";

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

export const getAllFellow = async () => {
  return researchers;
};

export const getSingleFellow = async (id) => {
  const fellow = researchers.find((obj) => obj.id === +id);

  if (!fellow) {
    return false;
  }

  return fellow;
};
