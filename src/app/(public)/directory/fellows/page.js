import React, { Fragment } from "react";
import Fellows from "./ui/Fellows";

const page = () => {
  return (
    <Fragment>
      <section className="w-full h-full p-8">
        <Fellows />
      </section>
    </Fragment>
  );
};

export default page;
