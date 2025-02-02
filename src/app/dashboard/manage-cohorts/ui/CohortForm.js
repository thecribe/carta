"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Button from "../../Button";
import { validate } from "@/utils/formValidation";
import { MdError } from "react-icons/md";

const CohortForm = ({ type, cohortDetails, handleFormSubmission }) => {
  const [formFields, setFormFields] = useState({
    cohort: {
      cohort: cohortDetails.cohort ? cohortDetails.cohort : "",
      error: false,
    },
    description: {
      description: cohortDetails.description ? cohortDetails.description : "",
      error: false,
    },
    password: { password: "", error: false },
  });

  const handleFormValidation = () => {
    const { cohort, description } = formFields;

    let newErrorObj = { cohort: false, description: false };

    if (!validate.username(cohort.cohort)) {
      newErrorObj = { ...newErrorObj, cohort: true };
    }

    if (newErrorObj.cohort) {
      setFormFields({
        ...formFields,
        cohort: {
          ...formFields.cohort,
          error: newErrorObj.cohort,
        },
      });
    } else {
      handleFormSubmission({
        cohort: formFields.cohort.cohort,
        description: formFields.description.description,
      });
    }
  };
  return (
    <Fragment>
      <div className="w-full flex flex-col gap-5 ">
        <div className="flex flex-col gap-3 ">
          <label className="font-semibold" htmlFor="cohort">
            Cohort
          </label>
          <div className="flex justify-between items-center gap-5 border-2 pr-2 bg-white shadow-sm rounded-sm">
            <input
              id="cohort"
              name="cohort"
              value={formFields.cohort.cohort}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  cohort: {
                    ...formFields.cohort,
                    cohort: e.target.value,
                    error: false,
                  },
                })
              }
              className=" outline-none p-2 w-full"
            />
            {formFields.cohort.error && (
              <p className="text-red-900 hover:text-red-700 cursor-pointer hover:underline underline-offset-2">
                <MdError />
              </p>
            )}
          </div>
          {formFields.cohort.error && (
            <p className="-mt-3 text-right pr-2 text-xs text-red-900">
              Please enter cohort name
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 ">
          <label className="font-semibold" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formFields.description.description}
            onChange={(e) =>
              setFormFields({
                ...formFields,
                description: {
                  ...formFields.description,
                  description: e.target.value,
                  error: false,
                },
              })
            }
            className="border-2 shadow-sm rounded-sm outline-none p-2"
            rows="2"
          ></textarea>
        </div>

        <div className="">
          <Button handleButtonClick={handleFormValidation}>
            {type ? "Update Cohort" : "Add New Cohort"}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default CohortForm;
