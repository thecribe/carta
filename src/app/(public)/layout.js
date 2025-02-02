import React, { Fragment } from "react";

const layout = ({ children }) => {
  return (
    <Fragment>
      <section className="w-full h-full">{children}</section>
    </Fragment>
  );
};

export default layout;
