"use client";
import React, { Fragment, useState } from "react";
import LoginForm from "./LoginForm";
import { doUserLogin } from "@/utils/auth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const handleLoginPrompt = async (formInput) => {
    setLoading(true);
    const response = await doUserLogin(formInput);

    if (!response) {
      setError({
        ...response,
        error: true,
        message:
          "Server Error: We're Experiencing Technical Difficulties. Please Try Again Later",
      });
      setLoading(false);

      return null;
    }

    if (response.error) {
      setLoading(false);
      setError({ ...response });
      return null;
    }
    setError({});
    setLoading(false);
    router.push("/dashboard");
  };
  return (
    <Fragment>
      <div className="w-full text-center pb-3 text-white font-semibold">
        <h2 className="text-2xl">Login Form</h2>
      </div>
      <LoginForm handleLoginPrompt={handleLoginPrompt} />
      {!loading ? (
        <p className="text-sm text-center text-red-800">
          {error.error && error.message}
        </p>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <span className="loader"></span>
        </div>
      )}
      <p
        className="text-sm text-center text-blue-900 underline underline-offset-4 cursor-pointer"
        onClick={() => {
          router.push("/directory");
        }}
      >
        Return to directory page
      </p>
    </Fragment>
  );
};

export default LoginPage;
