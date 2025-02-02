import React from "react";
import { Fragment } from "react";
import AddFellow from "./ui/AddFellow";

const page = () => {
  return (
    <Fragment>
      <div className="h-full p-8 overflow-y-auto scrolling">
        <AddFellow />
      </div>
    </Fragment>
  );
};

export default page;
