"use client";

import { getAllFellow } from "@/utils/fellow";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const SearchPage = ({ close_func }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState({
    array: [],
    loading: true,
    error: false,
  });
  const router = useRouter();

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
            (
              fellow.name.surname +
              " " +
              fellow.name.firstname +
              " " +
              fellow.name.othername
            )
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

  const searchClickHandler = (id) => {
    router.push(`/directory/fellows/${id}`);
    close_func();
    setSearchInput("");
  };
  return (
    <Fragment>
      <div className="w-full flex justify-center">
        <IoClose
          className="text-6xl text-center cursor-pointer text-white"
          onClick={close_func}
        />
      </div>
      <div className=" w-full flex text-black gap-2  justify-center items-center bg-white p-2 divide-x-2 rounded-sm shadow-sm">
        <FaSearch />
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search for profile"
          className="outline-none bg-transparent px-2 w-full"
          onChange={(e) => {
            setSearchInput(e.target.value.trim().toLowerCase());
          }}
          value={searchInput}
        />
      </div>
      <div className="bg-white flex flex-col gap-2 divide-y-2 w-full h-[30rem] overflow-y-auto text-gray-500 p-3 rounded-md">
        {!searchResult.loading ? (
          searchResult.array.length > 0 ? (
            searchResult.array.map((fellow, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-2  py-2 cursor-pointer"
                  onClick={() => searchClickHandler(fellow.id)}
                >
                  <div className="w-[3rem] h-[3rem] rounded-full">
                    <img
                      src="/placeholder.png"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className=" text-black">
                      {fellow.name.firstname + " " + fellow.name.lastname}
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
    </Fragment>
  );
};

export default SearchPage;
