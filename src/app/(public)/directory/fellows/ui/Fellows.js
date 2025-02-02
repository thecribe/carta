"use client";
import React, { Fragment, useEffect, useState } from "react";
import DisplayFellows from "./DisplayFellows";
import { getAllFellow } from "@/utils/fellow";

const Fellows = ({ session }) => {
  const [allFellow, setAllFellow] = useState({
    array: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    setAllFellow({
      ...allFellow,
      loading: true,
    });
    const getallFellows = async () => {
      const response = await getAllFellow(null, "");

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

      return null;
    };

    getallFellows();
  }, []);
  return (
    <Fragment>
      <div className="flex gap-3 items-center mb-5">
        <h2 className="h2">Fellows</h2>
        <p className="bg-gray-500 px-2 text-white text-xs rounded-xl">
          {allFellow.loading ? "..." : allFellow.array.length}
        </p>
      </div>
      <div className="w-full h-[98%]">
        <DisplayFellows allFellow={allFellow} />
      </div>
    </Fragment>
  );
};

export default Fellows;
