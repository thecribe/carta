import React, { Fragment } from "react";
import EditFellow from "./ui/EditFellow";

const page = async ({ params }) => {
  const id = (await params).edit_fellow;
  return (
    <Fragment>
      <div className="h-full p-8 overflow-y-auto scrolling">
        <EditFellow id={id} />
      </div>
    </Fragment>
  );
};

export default page;
