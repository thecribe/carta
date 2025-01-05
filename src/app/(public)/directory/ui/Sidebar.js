import Link from "next/link";
import React, { Fragment } from "react";
export const siderNav = [
  {
    menu: "Fellows",
    link: "/directory/fellows",
  },
  {
    menu: "Institutions",
    link: "#",
  },

  {
    menu: "Cohorts",
    link: "#",
  },
];
export const adminNav = [
  { menu: "Manage Fellows", link: "#" },
  { menu: "Manage Cohorts", link: "#" },
  { menu: "Manage Institution", link: "#" },
  { menu: "Manage Users", link: "#" },
];

const Sidebar = () => {
  return (
    <Fragment>
      <div className="flex flex-col gap-3">
        <h4 className="h4 px-5 my-3">Directory</h4>
        {siderNav.map((nav, index) => {
          return (
            <Link
              href={nav.link}
              key={index}
              className="px-5 hover:font-medium hover:text-black border-r-2 border-transparent hover:border-r-2 hover:border-yellow-600"
            >
              {nav.menu}
            </Link>
          );
        })}

        <h4 className="h4 px-5 my-3">Admin</h4>
        {adminNav.map((nav, index) => {
          return (
            <Link
              href={nav.link}
              key={index}
              className="px-5 hover:font-medium hover:text-black border-r-2 border-transparent hover:border-r-2 hover:border-yellow-600"
            >
              {nav.menu}
            </Link>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Sidebar;
