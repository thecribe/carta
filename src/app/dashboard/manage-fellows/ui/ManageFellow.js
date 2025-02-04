"use client";
import React, { Fragment, useEffect, useState } from "react";
import Button from "../../Button";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import ManageTable from "../../ManageTable";

import { GeneralContext } from "@/components/Context";
import { deleteFellow, getAllFellow } from "@/utils/fellow";

const ManageFellow = () => {
  const [allFellow, setAllFellow] = useState({
    array: [],
    loading: true,
    error: false,
  });
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [selectedOption, setSelectedOption] = useState({});

  useEffect(() => {
    const getFellows = async () => {
      const response = await getAllFellow();

      if (!response) {
        setAllFellow({
          ...allFellow,
          loading: false,
          error: "Failed to retrieve required data!",
        });
        return null;
      }

      setAllFellow({
        ...allFellow,
        array: [...response],
        loading: false,
        error: false,
      });
    };

    getFellows();
  }, [selectedOption]);

  const deleteHandler = async () => {
    const response = await deleteFellow(selectedOption.id);

    if (!response) {
      alert("Unable to delete cohort. Please try again!");
    }
    alert("Cohort deleted successfully");
    setSelectedOption({});
  };
  return (
    <Fragment>
      <div className="h-full flex flex-col gap-3  ">
        <div className="flex gap-3 items-center mb-5 rounded-md ">
          <h2 className="h2 text-black">Manage all fellows</h2>
          <p className="bg-primary_color px-2 text-secondary_text_color text-xs rounded-xl">
            {/* {allFellow.loading ? "..." : allFellow.array.length} */}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-5 bg-secondary_color rounded-md py-5 px-3">
          <div className="">
            <Button
              handleButtonClick={(event) => {
                event.preventDefault();
                router.push("/dashboard/manage-fellows/newFellow");
              }}
            >
              Add New
            </Button>
          </div>
          <div className=" flex gap-2 justify-center items-center bg-white p-2 divide-x-2 rounded-sm shadow-sm">
            <FaSearch className="text-primary_color" />
            <div className="w-full sm:w-2/3">
              <input
                type="text"
                id="searchbar"
                name="searchbar"
                placeholder="Enter a fellow name"
                className="outline-none bg-transparent px-2 w-full"
                onChange={(e) => {
                  setSearchInput(e.target.value.toLowerCase());
                }}
              />
            </div>
          </div>
        </div>
        <GeneralContext.Provider
          value={{
            searchInput,
            selectedOption,
            setSelectedOption,
            deleteHandler,
          }}
        >
          <div className="h-full shadow-sm border overflow-y-auto rounded-md p-2 scrolling">
            <ManageTable
              data={allFellow}
              editLink={`/dashboard/manage-fellows/`}
            />
          </div>
        </GeneralContext.Provider>
      </div>
    </Fragment>
  );
};

export default ManageFellow;
