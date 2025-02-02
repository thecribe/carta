import React, { Fragment } from "react";
import ManageCohorts from "./ui/ManageCohorts";

const page = () => {
  return (
    <Fragment>
      <section className="p-8 h-full">
        <ManageCohorts />
      </section>
    </Fragment>
  );
};

export default page;
