import React from "react";
import Sidebar from "./ui/Sidebar";
import { auth } from "@/auth";

const layout = async ({ children }) => {
  const session = await auth();
  return (
    <section className="w-full md:flex  h-full">
      <section className="w-full md:w-[15%] lg:w-[13%] h-full py-5 pl-5 hidden md:flex  ">
        <section className="w-full h-full overflow-y-auto flex flex-col gap-5 bg-secondary_color rounded-lg py-3 shadow-sm">
          <Sidebar session={session} />
        </section>
      </section>
      <section className="w-full p-5 md:w-[85%] h-full  lg:w-[87%] ">
        {children}
      </section>
    </section>
  );
};

export default layout;
