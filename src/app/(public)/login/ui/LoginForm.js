"use client";
import Button from "@/app/dashboard/Button";
import { validate } from "@/utils/formValidation";
import React, { Fragment, useState } from "react";
import { MdError } from "react-icons/md";

const LoginForm = ({ handleLoginPrompt }) => {
  const [formInput, setFormInput] = useState({
    username: { username: "", error: false },
    password: { password: "", error: false },
  });

  const handleSubmitValidation = async () => {
    let validationObj = { username: false, password: false };

    if (!validate.username(formInput.username.username)) {
      validationObj = { ...validationObj, username: true };
    }
    if (!validate.username(formInput.password.password)) {
      validationObj = { ...validationObj, password: true };
    }

    if (validationObj.username || validationObj.password) {
      setFormInput({
        ...formInput,
        username: { ...formInput.username, error: validationObj.username },
        password: { ...formInput.password, error: validationObj.password },
      });
    } else {
      handleLoginPrompt({
        username: formInput.username.username.trim(),
        password: formInput.password.password.trim(),
      });
    }
  };
  return (
    <Fragment>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3  ">
          <label className="font-semibold text-white" htmlFor="username">
            Username/E-mail:
          </label>
          <div className="flex justify-between items-center gap-5 border-2 pr-2 bg-white shadow-sm rounded-sm">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Please enter your username or email"
              value={formInput.username.username}
              onChange={(e) => {
                setFormInput({
                  ...formInput,
                  username: {
                    ...formInput.username,
                    username: e.target.value,
                    error: false,
                  },
                });
              }}
              className=" outline-none p-2 w-full"
            />

            {formInput.username.error && (
              <p className="text-red-900 hover:text-red-700 cursor-pointer hover:underline underline-offset-2">
                <MdError />
              </p>
            )}
          </div>
          {formInput.username.error && (
            <p className="-mt-3 text-right pr-2 text-xs text-red-200">
              Please make sure your input is correct
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3  ">
          <label className="font-semibold text-white" htmlFor="password">
            Password
          </label>
          <div className="flex justify-between items-center gap-5 border-2 pr-2 bg-white shadow-sm rounded-sm">
            <input
              type="password"
              id="password"
              name="password"
              value={formInput.password.password}
              onChange={(e) => {
                setFormInput({
                  ...formInput,
                  password: {
                    ...formInput.password,
                    password: e.target.value,
                    error: false,
                  },
                });
              }}
              className=" outline-none p-2 w-full"
            />

            {formInput.username.error && (
              <p className="text-red-900 hover:text-red-700 cursor-pointer hover:underline underline-offset-2">
                <MdError />
              </p>
            )}
          </div>
          {formInput.username.error && (
            <p className="-mt-3 text-right pr-2 text-xs text-red-200">
              Please make sure your input is correct
            </p>
          )}
        </div>
        <div className="">
          <Button handleButtonClick={handleSubmitValidation}>Login</Button>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginForm;
