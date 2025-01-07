"use client";
import React, { Fragment, useEffect, useState } from "react";

import { getAllCohort, getAllFellow } from "@/apiServerActions";
import InsCoh from "../../university/ui/InsCoh";

const Cohort = () => {
  const [cohort, setCohort] = useState({
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
    const response = await getAllFellow(e, "cohort");

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
      const response = await getAllCohort();

      if (!response) {
        setCohort({
          ...cohort,
          loading: false,
          error: "Unable to fetch data",
        });

        return null;
      }

      setCohort({
        ...cohort,
        array: [...response],
        loading: false,
        error: false,
      });
    };

    getData();
  }, []);

  return (
    <Fragment>
      <div className="flex gap-3 items-center mb-5">
        <h2 className="h2">Cohorts</h2>
        <p className="bg-gray-500 px-2 text-white text-xs rounded-xl">
          {/* {allFellow.loading ? "..." : allFellow.array.length} */}
        </p>
      </div>
      <div className="w-full h-[96%] md:flex gap-5 p-2">
        <InsCoh
          content={cohort}
          callToAction={(e) => getFellows(e)}
          allFellow={allFellow}
        />
      </div>
    </Fragment>
  );
};

export default Cohort;
