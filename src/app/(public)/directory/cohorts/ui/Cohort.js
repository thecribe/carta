"use client";
import React, { Fragment, useEffect, useState } from "react";

import InsCoh from "../../_university/ui/InsCoh";
import { getAllCohort } from "@/utils/cohort";
import { getAllFellow } from "@/utils/fellow";

const Cohort = () => {
  const [cohort, setCohort] = useState({
    array: [],
    loading: true,
    error: false,
  });

  const [allFellow, setAllFellow] = useState({});

  const getFellows = async (e) => {
    setAllFellow({ array: [], loading: true, error: false });
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
        array: [...response.cohorts],
        loading: false,
        error: false,
      });
    };

    getData();
  }, []);

  return (
    <Fragment>
      <div className="flex gap-3 items-center mb-3  ">
        <h2 className="h2 text-black ">Cohorts</h2>
        <p className="bg-primary_color px-2 text-secondary_text_color text-xs rounded-xl">
          {/* {allFellow.loading ? "..." : allFellow.array.length} */}
        </p>
      </div>
      <div className="w-full h-[96%] flex flex-col gap-5">
        <InsCoh
          content={cohort}
          callToAction={(e) => getFellows(e)}
          allFellow={allFellow}
          type="cohort"
        />
      </div>
    </Fragment>
  );
};

export default Cohort;
