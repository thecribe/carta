import React, { Fragment } from "react";
import LoginPage from "./ui/LoginPage";

const page = () => {
  return (
    <Fragment>
      <section className="h-full w-full">
        <div className="w-full flex items-center justify-center p-2 h-full login_bg">
          <div className=" w-2/3 md:w-2/5 lg:w-1/5 p-5 shadow-sm border-2 rounded-md flex flex-col gap-5">
            <LoginPage />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default page;
