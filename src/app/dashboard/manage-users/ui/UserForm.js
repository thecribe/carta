"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Button from "../../Button";
import { MdError } from "react-icons/md";
import { validate } from "@/utils/formValidation";

const UserForm = ({ type, userDetails, handleFormSubmission }) => {
  const [formFields, setFormFields] = useState({
    username: {
      username: userDetails.username ? userDetails.username : "",
      error: false,
    },
    email: { email: userDetails.email ? userDetails.email : "", error: false },
    password: { password: "", error: false },
  });

  const [passwordControl, setPassword] = useState(false);

  const handleFormValidation = () => {
    const { username, email, password } = formFields;
    let newErrorObj = { username: false, email: false, password: false };

    if (!validate.username(username.username)) {
      newErrorObj = { ...newErrorObj, username: true };
    }

    if (!validate.password(password.password)) {
      newErrorObj = { ...newErrorObj, password: true };
    }

    if (!validate.email(email.email)) {
      newErrorObj = { ...newErrorObj, email: true };
    }

    if (!type) {
      if (newErrorObj.username || newErrorObj.password || newErrorObj.email) {
        setFormFields({
          ...formFields,
          username: {
            ...formFields.username,
            error: newErrorObj.username,
          },
          email: {
            ...formFields.email,
            error: newErrorObj.email,
          },
          password: {
            ...formFields.password,
            error: newErrorObj.password,
          },
        });
      } else {
        handleFormSubmission({
          username: formFields.username.username,
          email: formFields.email.email,
          password: formFields.password.password,
        });
      }
    } else {
      console.log(newErrorObj);
      if (passwordControl) {
        if (newErrorObj.username || newErrorObj.password || newErrorObj.email) {
          setFormFields({
            ...formFields,
            username: {
              ...formFields.username,
              error: newErrorObj.username,
            },
            email: {
              ...formFields.email,
              error: newErrorObj.email,
            },
            password: {
              ...formFields.password,
              error: newErrorObj.password,
            },
          });
        } else {
          console.log(formFields);
        }
      } else {
        if (newErrorObj.username || newErrorObj.email) {
          setFormFields({
            ...formFields,
            username: {
              ...formFields.username,
              error: newErrorObj.username,
            },
            email: {
              ...formFields.email,
              error: newErrorObj.email,
            },
          });
        } else {
          console.log(formFields);
        }
      }
    }
    // handleFormSubmission(formFields);
  };

  return (
    <Fragment>
      <div className="w-full flex flex-col gap-5 ">
        <div className="flex flex-col gap-3  ">
          <label className="font-semibold" htmlFor="username">
            Username
          </label>
          <div className="flex justify-between items-center gap-5 border-2 pr-2 bg-white shadow-sm rounded-sm">
            <input
              id="username"
              name="username"
              value={formFields.username.username}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  username: {
                    ...formFields.username,
                    username: e.target.value,
                    error: false,
                  },
                })
              }
              className=" outline-none p-2 w-full"
            />
            {formFields.username.error && (
              <p className="text-red-900 hover:text-red-700 cursor-pointer hover:underline underline-offset-2">
                <MdError />
              </p>
            )}
          </div>
          {formFields.username.error && (
            <p className="-mt-3 text-right pr-2 text-xs text-red-900">
              Please make sure your input is correct
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3  ">
          <label className="font-semibold" htmlFor="username">
            Email
          </label>
          <div className="flex justify-between items-center gap-5 border-2 pr-2 bg-white shadow-sm rounded-sm">
            <input
              type="email"
              id="email"
              name="email"
              value={formFields.email.email}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  email: {
                    ...formFields.email,
                    email: e.target.value,
                    error: false,
                  },
                })
              }
              className=" outline-none p-2 w-full"
            />
            {formFields.email.error && (
              <p className="text-red-900 hover:text-red-700 cursor-pointer hover:underline underline-offset-2">
                <MdError />
              </p>
            )}
          </div>
          {formFields.email.error && (
            <p className="-mt-3 text-right pr-2 text-xs text-red-900">
              Please enter a valid e-mail address
            </p>
          )}
        </div>

        {!type && (
          <div className="flex flex-col gap-3  ">
            <label className="font-semibold" htmlFor="username">
              Password
            </label>
            <div className="flex justify-between items-center gap-5 border-2 pr-2 bg-white shadow-sm rounded-sm">
              <input
                type="password"
                id="password"
                name="password"
                value={formFields.password.password}
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    password: {
                      ...formFields.password,
                      password: e.target.value,
                      error: false,
                    },
                  })
                }
                className=" outline-none p-2 w-full"
              />
              {formFields.password.error && (
                <p className="text-red-900 hover:text-red-700 cursor-pointer hover:underline underline-offset-2">
                  <MdError />
                </p>
              )}
            </div>
            {formFields.password.error && (
              <p className="-mt-3 text-right pr-2 text-xs text-red-900">
                Please enter a minimum of 6 characters
              </p>
            )}
          </div>
        )}

        {type &&
          (!passwordControl ? (
            <p
              onClick={() => setPassword(true)}
              className="text-blue-900 hover:text-blue-700 cursor-pointer hover:underline underline-offset-2 w-fit"
            >
              Change user password?
            </p>
          ) : (
            <div className="flex flex-col gap-3  ">
              <label className="font-semibold" htmlFor="changePassword">
                Change Password
              </label>
              <div className="flex justify-between items-center gap-5 border-2 pr-2 shadow-sm rounded-sm">
                <input
                  type="password"
                  id="changePassword"
                  name="changePassword"
                  placeholder="Please enter a new password"
                  value={formFields.password.password}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      password: {
                        ...formFields.password,
                        password: e.target.value,
                        error: false,
                      },
                    })
                  }
                  className=" outline-none p-2 w-full"
                />
                <p
                  onClick={() => {
                    setFormFields({
                      ...formFields,
                      password: {
                        ...formFields.password,
                        password: "",
                        error: false,
                      },
                    });
                    setPassword(false);
                  }}
                  className="text-red-900 hover:text-red-700 cursor-pointer hover:underline underline-offset-2"
                >
                  Cancel
                </p>
              </div>
              {formFields.password.error && (
                <div className="flex gap-5 items-center -mt-3">
                  <p className="text-red-900 hover:text-red-700 cursor-pointer hover:underline underline-offset-2">
                    <MdError />
                  </p>
                  <p className=" text-right pr-2 text-xs text-red-900">
                    Please enter a minimum of 6 characters
                  </p>
                </div>
              )}
            </div>
          ))}
        <div className="">
          <Button handleButtonClick={handleFormValidation}>
            {type ? "Update User" : "Add New User"}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default UserForm;
