import React, { Fragment } from "react";
import Sidebar from "./ui/Sidebar";

const layout = ({ children }) => {
  return (
    <Fragment>
      <section className="w-full md:flex h-full">
        <section className="w-full md:w-[15%] lg:w-[13%] h-full overflow-y-auto bg-gray-100 py-8 hidden  md:flex flex-col gap-5">
          <Sidebar />
        </section>
        <section className="w-full md:w-[85%] lg:w-[87%]">{children}</section>
      </section>
    </Fragment>
  );
};

export default layout;
