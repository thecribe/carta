import React, { Fragment } from "react";
import DisplayFellows from "../../fellows/ui/DisplayFellows";

const InsCoh = ({ content, callToAction, allFellow }) => {
  const { array, loading, error } = content;

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return !loading ? (
    !error ? (
      <Fragment>
        {array.length > 0 ? (
          <div className=" w-full md:w-1/6 h-full p-2 shadow-sm overflow-y-auto ">
            <div className="flex flex-col divide-y-2 justify-center  ">
              {array.map((array, index) => {
                return (
                  <p
                    className="py-2 px-2 hover:underline underline-offset-2 cursor-pointer"
                    key={array.id}
                    onClick={() => {
                      scrollToSection("getToView");
                      callToAction(array.name ? array.name : array.cohort);
                    }}
                  >
                    {array.name
                      ? array.name
                      : array.cohort + "-" + array.description}
                  </p>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <p>No {title} found!</p>
          </div>
        )}

        <div
          id="getToView"
          className="w-full md:w-5/6 md:h-full p-2 shadow-sm overflow-y-auto scrolling "
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
