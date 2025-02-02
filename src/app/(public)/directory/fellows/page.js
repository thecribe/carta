import React, { Fragment } from "react";
import Fellows from "./ui/Fellows";
import { auth } from "@/auth";

const page = () => {
  const session = auth();
  return (
    <Fragment>
      <section className="w-full h-full p-8">
        <Fellows session={session} />
      </section>
    </Fragment>
  );
};

export default page;
