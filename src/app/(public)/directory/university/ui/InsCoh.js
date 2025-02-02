import React, { Fragment, useEffect, useState } from "react";
import DisplayFellows from "../../fellows/ui/DisplayFellows";

const InsCoh = ({ content, callToAction, allFellow, type }) => {
  const { array, loading, error } = content;

  const [searchHandler, setSearchHandler] = useState("");

  useEffect(() => {
    if (!(searchHandler === "")) {
      scrollToSection("getToView");
      callToAction(searchHandler);
    }
  }, [searchHandler]);
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return !loading ? (
    !error ? (
      <Fragment>
        <div>
          {array.length > 0 ? (
            <div className="bg-gray-700 rounded-sm p-5 flex flex-col gap-3">
              <label htmlFor="inner_search" className=" text-white">
                Please select{" "}
                {type === "institution" ? "an Institution" : "a Cohort"}
              </label>
              <select
                id="inner_search"
                value={searchHandler}
                onChange={(e) => setSearchHandler(e.target.value)}
                className="border-2 rounded-sm shadow-sm p-2 w-full md:w-1/3 capitalize"
              >
                {[{ id: "", name: "Select an option" }, ...array].map(
                  (arr, index) => (
                    <option key={index} value={arr.id}>
                      {arr.name ? arr.name : arr.cohort + "-" + arr.description}
                    </option>
                  )
                )}
              </select>
            </div>
          ) : (
            <div>
              <p>
                Please add{" "}
                {type === "institution" ? "an Institution" : "a Cohort"}
              </p>
            </div>
          )}
        </div>

        <div
          id="getToView"
          className="w-full  md:h-full shadow-sm overflow-y-auto scrolling "
        >
          {!allFellow.error ? (
            allFellow.array.length > 0 ? (
              <DisplayFellows allFellow={allFellow} />
            ) : (
              <p>No data found!</p>
            )
          ) : (
            <p>{allFellow.error}</p>
          )}
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <p>{error}</p>
      </Fragment>
    )
  ) : (
    <Fragment>
      <p>loading</p>
    </Fragment>
  );
};

export default InsCoh;
