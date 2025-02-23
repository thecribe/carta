"use client";

import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import React, { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { adminNav, siderNav } from "../directory/ui/Sidebar";
import SearchPage from "./SearchPage";
import { doUserLogout } from "@/utils/auth";
import { getAllFellow } from "@/utils/fellow";
import { IoLogInOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

const Header = ({ session, key }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchPopUp, setSearchPopUp] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchPage, setSearchPage] = useState(false);

  const [searchResult, setSearchResult] = useState({
    array: [],
    loading: true,
    error: false,
  });
  const popRef = useRef(null);

  const handleClickOutside = (event) => {
    // Check if the click is outside the referenced div
    if (popRef.current && !popRef.current.contains(event.target)) {
      setSearchPopUp(false); // Close the div if click is outside
    }
  };

  const router = useRouter();

  // Use Effect
  useEffect(() => {
    // Attach event listener to the document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleSearchFilter = async () => {
      const response = await getAllFellow();

      if (!response) {
        setSearchInput({
          ...searchResult,
          loading: false,
          error: "Failed to retrieve required data!",
        });
        return null;
      }

      let output = [];
      if (searchInput !== "") {
        [...response].forEach((fellow, index) => {
          if (
            (fellow.name.firstname + " " + fellow.name.lastname)
              .toLowerCase()
              .includes(searchInput)
          ) {
            output.push(fellow);
          }
        });
      }

      setSearchResult({
        ...searchResult,
        array: [...output],
        loading: false,
        error: false,
      });
    };

    if (searchInput !== "") {
      handleSearchFilter();
    }
  }, [searchInput]);

  return (
    <Fragment>
      {mobileMenu && (
        <div className="fixed top-0 left-0 w-full h-full z-50 text-sm capitalize md:hidden">
          <div
            className=" absolute top-0 left-0 w-full h-full bg-black opacity-60 z-20"
            onClick={() => {
              setMobileMenu(false);
            }}
          ></div>
          <div className="absolute right-0 w-1/2 h-full bg-white z-30 p-5">
            <div className="w-full flex justify-end">
              <p
                onClick={() => {
                  setMobileMenu(false);
                }}
                className="text-xl cursor-pointer text-black"
              >
                <IoClose />
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className="h4 px-5 my-3 text-secondary_color ">Directory</h4>
              {siderNav.map((nav, index) => {
                return (
                  <Link
                    href={nav.link}
                    key={index}
                    className="px-5 hover:font-medium hover:text-black border-r-2 border-transparent hover:border-r-2 hover:border-yellow-600"
                    onClick={() => setMobileMenu(false)}
                  >
                    {nav.menu}
                  </Link>
                );
              })}
              {!session?.user ? null : (
                <div
                  className=" px-5 hover:font-medium hover:text-black border-r-2 border-transparent hover:border-r-2 hover:border-yellow-600 cursor-pointer"
                  onClick={async () => {
                    await doUserLogout();
                  }}
                >
                  <p>Logout</p>
                </div>
              )}
              {session?.user && <h4 className="h4 px-5 my-3">Admin</h4>}
              {session?.user &&
                adminNav.map((nav, index) => {
                  return (
                    <Link
                      href={nav.link}
                      key={index}
                      className="px-5 hover:font-medium hover:text-black border-r-2 border-transparent hover:border-r-2 hover:border-yellow-600"
                      onClick={() => setMobileMenu(false)}
                    >
                      {nav.menu}
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {searchPage && (
        <div className="fixed top-0 left-0 h-full w-full  z-10 md:hidden flex  justify-center items-center text-white">
          <div
            className=" absolute top-0 left-0 w-full h-full bg-gray-600 opacity-60 z-20"
            onClick={() => {
              setMobileMenu(false);
            }}
          ></div>
          <div className="absolute  w-full h-full z-30 p-5">
            <div className="w-full flex flex-col gap-5 items-center">
              <SearchPage close_func={() => setSearchPage(false)} />
            </div>
          </div>
        </div>
      )}
      <div className="flex  gap-5 justify-center items-center ">
        <div className="w-[50px]  ">
          <img
            src={`/our-fellows/carta_site_logo.png`}
            alt="Site Logo"
            className="w-full object-cover"
          />
        </div>
        <div className="flex gap-5 justify-center items-center">
          <a
            href="https://carta.oauife.edu.ng/"
            className="text-primary_text_color hover:text-black hover:underline-offset-8 hover:underline cursor-pointer"
          >
            Carta Home
          </a>
        </div>
      </div>
      <div className="flex gap-5 justify-center items-center relative text-primary_text_color">
        <FaSearch
          className="sm:hidden cursor-pointer text-primary_color"
          onClick={() => setSearchPage(true)}
        />
        <div className="hidden sm:flex gap-2 justify-center items-center bg-white p-2 divide-x-2 rounded-sm shadow-sm">
          <FaSearch className="text-primary_color" />
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search for profile"
            className="outline-none bg-transparent px-2"
            onChange={(e) => {
              setSearchInput(e.target.value.trim().toLowerCase());
              setSearchPopUp(true);
            }}
            value={searchInput}
          />
        </div>
        {session?.user && (
          <div
            className="hidden md:flex items-center justify-center gap-1 cursor-pointer hover:underline underline-offset-4 hover:font-semibold "
            onClick={async () => await doUserLogout()}
          >
            <BiLogOut className="text-primary_color" />
            <p>Logout</p>
          </div>
        )}
        <div
          className="hamburger cursor-pointer md:hidden"
          onClick={() => {
            setMobileMenu(true);
          }}
        ></div>
        {searchPopUp &&
          (!searchResult.error ? (
            <div
              ref={popRef}
              className="absolute w-[20rem] h-[30em] border-2-0  shadow-md rounded-md top-11 right-9  scrolling overflow-y-auto z-10 bg-main_background border-2 p-3 divide-y-2 italic text-xs "
            >
              {!searchResult.loading ? (
                searchResult.array.length > 0 ? (
                  searchResult.array.map((fellow, index) => {
                    console.log(fellow);
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2  py-2 cursor-pointer"
                        onClick={() => {
                          router.push(`/directory/fellows/${fellow.id}`);
                          setSearchPopUp(false);
                          setSearchInput("");
                        }}
                      >
                        <div className="w-[3rem] h-[3rem] rounded-full">
                          <img
                            src={fellow.profileImg.url}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h2 className=" text-secondary_color">
                            {fellow.name.surname +
                              " " +
                              fellow.name.firstname +
                              " " +
                              fellow.name.othername}
                          </h2>
                          <p className="">{fellow.email}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center">No matching profile</p>
                )
              ) : (
                <p>loading</p>
              )}
            </div>
          ) : (
            <div
              ref={popRef}
              className="absolute w-[20rem] h-[30em] border-2-0  shadow-md rounded-md top-11 right-9  scrolling overflow-y-auto z-10 bg-white p-3 divide-y-2 italic text-xs "
            >
              <p>{searchResult.error}</p>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default Header;
