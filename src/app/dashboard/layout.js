import React, { Fragment } from "react";
import Sidebar from "../(public)/directory/ui/Sidebar";
import { auth } from "@/auth";

const layout = async ({ children }) => {
  const session = await auth();

  return (
    <Fragment>
      <section className="w-full md:flex h-[95vh]">
        <section className="w-full md:w-[15%] lg:w-[13%] h-full overflow-y-auto bg-gray-100 py-8 hidden  md:flex flex-col gap-5">
          <Sidebar session={session} />
        </section>
        <section className="w-full md:w-[85%] lg:w-[87%]">{children}</section>
      </section>
    </Fragment>
  );
};

export default layout;
