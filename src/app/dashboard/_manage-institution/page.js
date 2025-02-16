import React, { Fragment } from "react";

import ManageInstitution from "./ui/ManageInstitution";

const page = () => {
  return (
    <Fragment>
      <section className="p-8 h-full">
        <ManageInstitution />
      </section>
    </Fragment>
  );
};

export default page;
