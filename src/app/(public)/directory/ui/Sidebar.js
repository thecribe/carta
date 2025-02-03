"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { Fragment } from "react";
export const siderNav = [
  {
    menu: "Fellows",
    link: "/directory/fellows",
  },
  {
    menu: "Institutions",
    link: "/directory/university",
  },

  {
    menu: "Cohorts",
    link: "/directory/cohorts",
  },
];
export const adminNav = [
  { menu: "Manage Fellows", link: "/dashboard/manage-fellows" },
  { menu: "Manage Cohorts", link: "/dashboard/manage-cohorts" },
  { menu: "Manage Institution", link: "/dashboard/manage-institution" },
  { menu: "Manage Users", link: "/dashboard/manage-users" },
];

const Sidebar = ({ session }) => {
  const pathname = usePathname();

  return (
    <Fragment>
      <div className="flex flex-col gap-3">
        <h4 className="h4 px-5 my-3 text-secondary_text_color">Directory</h4>
        <div className="flex flex-col ">
          {siderNav.map((nav, index) => {
            return (
              <Link
                href={nav.link}
                key={index}
                className={`smooth_transition px-5 hover:font-medium py-3 text-secondary_text_color hover:bg-primary_color hover:text-black border-r-2 border-transparent hover:border-r-2 hover:border-yellow-600 ${
                  pathname === nav.link
                    ? "bg-primary_color text-secondary_text_color"
                    : "text-secondary_text_color"
                }`}
              >
                {nav.menu}
              </Link>
            );
          })}
        </div>
        {session?.user ? (
          <div className="flex flex-col gap-3">
            <h4 className="h4 px-5 my-3 text-secondary_text_color">Admin</h4>
            <div className="flex flex-col ">
              {adminNav.map((nav, index) => {
                return (
                  <Link
                    href={nav.link}
                    key={index}
                    className={`smooth_transition px-5 hover:font-medium py-3 text-secondary_text_color hover:bg-primary_color hover:text-black border-r-2 border-transparent hover:border-r-2 hover:border-yellow-600 ${
                      pathname === nav.link
                        ? "bg-primary_color text-secondary_text_color"
                        : "text-secondary_text_color"
                    }`}
                  >
                    {nav.menu}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Sidebar;
