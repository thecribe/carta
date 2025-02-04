import { Karla } from "next/font/google";
import "./globals.css";

import HeaderContainer from "./(public)/ui/HeaderContainer";

const karla = Karla({ subsets: ["latin"] });

export const metadata = {
  title: "Consortium for Advanced Research Training in Africa",
  description: "A directory for CARTA fellows",
  icons: {
    icon: "/carta_site_logo.png", // Path to your favicon
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${karla.className} scrolling`}>
        <section className="sticky top-0 p-5 px-5 flex justify-center items-center bg-main_background shadow-sm ">
          <section className="flex justify-between items-center w-full md:w-2/3 my-0 mx-auto px-2 md:shadow-sm  py-1">
            <HeaderContainer />
          </section>
        </section>
        <section className="w-full md:h-[92vh]">{children}</section>
        <section className=" bg-black text-white py-3">
          <p className="text-center">©2025 CARTA OAU | All rights reserved</p>
        </section>
      </body>
    </html>
  );
}
