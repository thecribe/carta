import React, { Fragment } from "react";
import Sidebar from "../(public)/directory/ui/Sidebar";
import { auth } from "@/auth";

export const metadata = {
  title: "Dashboard | CARTA",
  description: "A directory for CARTA fellows",
};

const layout = async ({ children }) => {
  const session = await auth();

  return (
    <Fragment>
      <section className="w-full md:flex  h-full ">
        <section className="w-full md:w-[15%] lg:w-[13%] h-full py-5 pl-5 hidden md:flex  ">
          <section className="w-full h-full overflow-y-auto flex flex-col gap-5 bg-secondary_color rounded-lg py-3 shadow-sm">
            <Sidebar session={session} />
          </section>
        </section>
        <section className="w-full p-2 md:p-5  md:w-[85%] lg:w-[87%]">
          {children}
        </section>
      </section>
    </Fragment>
  );
};

export default layout;
