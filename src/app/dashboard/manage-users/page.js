import React, { Fragment } from "react";
import ManageUsers from "./ui/ManageUsers";

const page = () => {
  return (
    <Fragment>
      <section className="p-8 h-full">
        <ManageUsers />
      </section>
    </Fragment>
  );
};

export default page;
