"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Button from "../../Button";
import { validate } from "@/utils/formValidation";
import { MdError } from "react-icons/md";

const InstitutionForm = ({
  type,
  institutionDetails,
  handleFormSubmission,
}) => {
  const [formFields, setFormFields] = useState({
    name: {
      name: institutionDetails.name ? institutionDetails.name : "",
      error: "",
    },
    website: {
      website: institutionDetails.website ? institutionDetails.website : "",
      error: "",
    },
  });

  const handleFormValidation = () => {
    const { name, website } = formFields;

    let newErrorObj = { name: false, website: false };

    if (!validate.username(name.name)) {
      newErrorObj = { ...newErrorObj, name: true };
    }

    if (newErrorObj.name) {
      setFormFields({
        ...formFields,
        name: {
          ...formFields.name,
          error: newErrorObj.name,
        },
      });
    } else {
      handleFormSubmission({
        name: formFields.name.name,
        website: formFields.website.website,
      });
    }
  };
  return (
    <Fragment>
      <div className="w-full flex flex-col gap-5 ">
        <div className="flex flex-col gap-3 ">
          <label className="font-semibold" htmlFor="name">
            Instituiton name
          </label>
          <div className="flex justify-between items-center gap-5 border-2 pr-2 bg-white shadow-sm rounded-sm">
            <input
              id="name"
              name="name"
              value={formFields.name.name}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  name: {
                    ...formFields.name,
                    name: e.target.value,
                    error: false,
                  },
                })
              }
              className="outline-none p-2 w-full"
            />
            {formFields.name.error && (
              <p className="text-red-900 hover:text-red-700 cursor-pointer hover:underline underline-offset-2">
                <MdError />
              </p>
            )}
          </div>
          {formFields.name.error && (
            <p className="-mt-3 text-right pr-2 text-xs text-red-900">
              Please enter institution name
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 ">
          <label className="font-semibold" htmlFor="website">
            University Website
          </label>
          <div className="flex justify-between items-center gap-5 border-2 pr-2 bg-white shadow-sm rounded-sm">
            <input
              id="website"
              name="website"
              value={formFields.website.website}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  website: {
                    ...formFields.website,
                    website: e.target.value,
                    error: false,
                  },
                })
              }
              className="outline-none p-2 w-full"
            />
          </div>
        </div>

        <div className="">
          <Button handleButtonClick={handleFormValidation}>
            {type ? "Update Instituiton" : "Add New Instituiton"}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default InstitutionForm;
