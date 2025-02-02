"use client";
import React, { Fragment, useEffect, useState } from "react";
import InsCoh from "./InsCoh";
import { getAllInstitution } from "@/utils/institution";
import { getAllFellow } from "@/utils/fellow";

const University = () => {
  const [university, setUniversity] = useState({
    array: [],
    loading: true,
    error: false,
  });

  const [allFellow, setAllFellow] = useState({
    array: [],
    loading: true,
    error: false,
  });

  const getFellows = async (e) => {
    const response = await getAllFellow(e, "institution");

    if (!response) {
      setAllFellow({
        ...allFellow,
        loading: false,
        error: "Unable to fetch data",
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

  useEffect(() => {
    const getData = async () => {
      const response = await getAllInstitution();

      if (!response) {
        setUniversity({
          ...university,
          loading: false,
          error: "Unable to fetch data",
        });

        return null;
      }

      setUniversity({
        ...university,
        array: [...response.institutions],
        loading: false,
        error: false,
      });
    };

    getData();
  }, []);

  return (
    <Fragment>
      <div className="flex gap-3 items-center mb-5">
        <h2 className="h2">Institutions</h2>
        <p className="bg-gray-500 px-2 text-white text-xs rounded-xl">
          {/* {allFellow.loading ? "..." : allFellow.array.length} */}
        </p>
      </div>
      <div className="w-full h-[96%]  flex flex-col gap-5 p-2">
        <InsCoh
          content={university}
          callToAction={(e) => getFellows(e)}
          allFellow={allFellow}
          type="institution"
        />
      </div>
    </Fragment>
  );
};

export default University;
