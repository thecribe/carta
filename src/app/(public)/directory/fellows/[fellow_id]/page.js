import React, { Fragment } from "react";
import SingleFellow from "./ui/SingleFellow";

const page = async ({ params }) => {
  const fellowId = (await params).fellow_id;
  return (
    <Fragment>
      <SingleFellow id={fellowId} />
    </Fragment>
  );
};

export default page;
