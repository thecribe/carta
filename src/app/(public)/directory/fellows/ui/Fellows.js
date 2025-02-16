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
      <div className="flex gap-3 items-center   ">
        <h2 className="h2 text-black">Fellows</h2>
        <p className="bg-primary_color px-2 text-secondary_text_color text-xs rounded-xl">
          {allFellow.loading ? "..." : allFellow.array.length}
        </p>
      </div>
      <div className="w-full h-[92%] ">
        <DisplayFellows allFellow={allFellow} />
      </div>
    </Fragment>
  );
};

export default Fellows;
