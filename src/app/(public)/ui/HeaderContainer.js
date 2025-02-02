import React from "react";
import Header from "./Header";
import { auth } from "@/auth";

const HeaderContainer = async () => {
  const session = await auth();

  return <Header session={session} />;
};

export default HeaderContainer;
