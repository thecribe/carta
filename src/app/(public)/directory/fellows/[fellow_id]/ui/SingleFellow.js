"use client";
import { getSingleFellow } from "@/apiServerActions";
import React, { Fragment, useEffect, useState } from "react";

const SingleFellow = ({ id }) => {
  const [fellowDetails, setFellow] = useState({
    fellow: {},
    loading: true,
    error: false,
  });

  const fellow = { ...fellowDetails.fellow };
  useEffect(() => {
    const singleFellow = async () => {
      const response = await getSingleFellow(id);

      if (!response) {
        setFellow({
          ...fellowDetails,
          loading: false,
          error: "Error retrieving required data",
        });

        return null;
      }

      setFellow({
        ...fellowDetails,
        fellow: { ...response },
        loading: false,
        error: false,
      });
    };

    singleFellow();
  }, []);

  return (
    <Fragment>
      {!fellowDetails.loading ? (
        !fellowDetails.error ? (
          <div className="h-full w-full">
            <div className="h-full w-full hidden md:block overflow-y-auto">
              <div className=" bg-gray-300 p-8 flex flex-col gap-5">
                <div>
                  <h2 className="h2 uppercase">
                    {fellow.name.firstname + " " + fellow.name.lastname}
                  </h2>
                  <p className="capitalize">{fellow.position}</p>
                </div>
                <div className="text-xs capitalize">
                  <p>{fellow.faculty}</p>
                  <p>{fellow.department}</p>
                  <p>{fellow.university}</p>
                </div>
                <div className="flex gap-5 items-center text-xs">
                  {fellow.ORCIDNumber.includes("http") ? (
                    <a
                      href={fellow.ORCIDNumber}
                      className="bg-white text-black px-2 py-1"
                    >
                      ORCID Number
                    </a>
                  ) : null}
                  <a
                    href={
                      fellow.googleScholarProfile === ""
                        ? "#"
                        : fellow.googleScholarProfile
                    }
                    className="bg-white text-black px-2 py-1"
                  >
                    Google Scholar
                  </a>
                  <a
                    href={
                      fellow.researchGateProfile === ""
                        ? "#"
                        : fellow.researchGateProfile
                    }
                    className="bg-white text-black px-2 py-1"
                  >
                    ResearchGate
                  </a>
                </div>
              </div>
              <div className="h-[74%]   p-8 w-full xl:w-4/5  flex gap-5">
                <div className="h-full overflow-y-auto scrolling w-1/2 lg:w-3/4 flex flex-col gap-5">
                  <div>
                    <h3 className="font-semibold text-black w-full border-b-2 pb-2 uppercase">
                      Contact Details
                    </h3>
                    <div className="flex flex-col gap-5 mt-5">
                      <p className="font-semibold text-black">
                        Name:
                        <span className="block text-gray-500 mt-1">
                          {fellow.name.firstname + " " + fellow.name.lastname}
                        </span>
                      </p>
                      <p className="font-semibold text-black">
                        Email:
                        <span className="block text-gray-500 mt-1">
                          {fellow.email}
                        </span>
                      </p>
                      <p className="font-semibold text-black">
                        Sex:
                        <span className="block text-gray-500 mt-1">
                          {fellow.sex}{" "}
                        </span>
                      </p>
                      <p className="font-semibold text-black">
                        Current Level:
                        <span className="block text-gray-500 mt-1">
                          {fellow.currentLevel}{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black w-full border-b-2 pb-2 uppercase mb-2">
                      Bio
                    </h3>
                    <p>{fellow.shortBio}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black w-full border-b-2 pb-2 uppercase mb-2">
                      Area of Specialization
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {fellow.areaOfSpecialization.length > 0
                        ? fellow.areaOfSpecialization.map((spec, index) => {
                            return (
                              <p
                                key={index}
                                className="border-2 w-fit px-2 py-1 rounded-xl"
                              >
                                {spec}
                              </p>
                            );
                          })
                        : `No Area of Specialization for ${
                            fellow.name.firstname + " " + fellow.name.lastname
                          }`}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black w-full border-b-2 pb-2 uppercase mb-2">
                      Research Interests
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {fellow.researchInterest.length > 0
                        ? fellow.researchInterest.map((interest, index) => {
                            return (
                              <p
                                key={index}
                                className="border-2 w-fit px-2 py-1 rounded-xl"
                              >
                                {interest}
                              </p>
                            );
                          })
                        : `No Area of Specialization for ${
                            fellow.name.firstname + " " + fellow.name.lastname
                          }`}
                    </div>
                  </div>
                </div>
                <div className="w-1/2 lg:w-1/4 h-full -mt-48 flex flex-col gap-5">
                  <div className=" w-full flex flex-col   shadow-sm bg-white rounded-md">
                    <div className="w-full h-[300px]  ">
                      <img
                        src="/placeholder.png"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col gap-3 p-3">
                      <h3 className="h3 font-semibold text-black">
                        PhD Research Title
                      </h3>
                      <p className="text-xs">{fellow.PhDResearchTitle}</p>
                      {/* <p className="text-xs">....2019</p> */}
                    </div>
                  </div>
                  <div className="w-full bg-white p-5 shadow-sm flex flex-col gap-5 ">
                    <div className="flex justify-between items-center">
                      <p className="text-black ">CARTA Cohort</p>
                      <p className="text-xs">{fellow.cohort}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-black ">CARTA Graduate</p>
                      <p className="text-xs capitalize">
                        {fellow.CARTAGraduate ? "Yes" : "no"}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-black ">ORCID Number</p>
                      <p className="text-xs">{fellow.ORCIDNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-full md:hidden p-2 flex flex-col gap-5">
              <div className="w-full bg-gray-300  flex flex-col gap-2 justify-center items-center p-5">
                <div className="w-[150px] h-[150px]">
                  <img
                    src="/placeholder.png"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="w-full">
                  <h2 className="h2 uppercase text-center">
                    {fellow.name.firstname + " " + fellow.name.lastname}
                  </h2>
                  <p className="capitalize text-center">{fellow.position}</p>
                </div>
                <div className="flex justify-center items-center divide-x-2  text-xs capitalize">
                  <p className="px-1">{fellow.faculty}</p>
                  <p className="px-1">{fellow.department}</p>
                </div>
                <p>{fellow.university}</p>
                <div className="flex flex-wrap gap-3 justify-center items-center text-xs mt-5">
                  {fellow.ORCIDNumber.includes("http") ? (
                    <a
                      href={fellow.ORCIDNumber}
                      className="bg-white text-black px-2 py-1"
                    >
                      ORCID Number
                    </a>
                  ) : null}
                  <a
                    href={
                      fellow.googleScholarProfile === ""
                        ? "#"
                        : fellow.googleScholarProfile
                    }
                    className="bg-white text-black px-2 py-1"
                  >
                    Google Scholar
                  </a>
                  <a
                    href={
                      fellow.researchGateProfile === ""
                        ? "#"
                        : fellow.researchGateProfile
                    }
                    className="bg-white text-black px-2 py-1"
                  >
                    ResearchGate
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5 px-2 py-4 shadow-md rounded-md">
                  <h3 className="font-semibold text-black w-full border-b-2 pb-2 uppercase mb-2">
                    Bio
                  </h3>
                  <p>{fellow.shortBio}</p>
                  <div className="w-full flex flex-col gap-5  ">
                    <div className="flex justify-between items-center">
                      <p className="">CARTA Cohort</p>
                      <p className="text-xs">{fellow.cohort}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="">CARTA Graduate</p>
                      <p className="text-xs capitalize">
                        {fellow.CARTAGraduate ? "Yes" : "no"}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="">ORCID Number</p>
                      <p className="text-xs">{fellow.ORCIDNumber}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="h3 font-semibold text-black">
                      PhD Research Title
                    </h3>
                    <p className="text-xs">{fellow.PhDResearchTitle}</p>
                    {/* <p className="text-xs">....2019</p> */}
                  </div>
                </div>
                <div className=" px-2 shadow-md py-4 rounded-md">
                  <h3 className="font-semibold text-black w-full border-b-2 pb-2 uppercase">
                    Contact Details
                  </h3>
                  <div className="flex flex-col gap-5 mt-5">
                    <p className="font-semibold text-black">
                      Name:
                      <span className="block text-gray-500 mt-1">
                        {fellow.name.firstname + " " + fellow.name.lastname}
                      </span>
                    </p>
                    <p className="font-semibold text-black">
                      Email:
                      <span className="block text-gray-500 mt-1">
                        {fellow.email}
                      </span>
                    </p>
                    <p className="font-semibold text-black">
                      Sex:
                      <span className="block text-gray-500 mt-1">
                        {fellow.sex}{" "}
                      </span>
                    </p>
                    <p className="font-semibold text-black">
                      Current Level:
                      <span className="block text-gray-500 mt-1">
                        {fellow.currentLevel}{" "}
                      </span>
                    </p>
                  </div>
                </div>
                <div className=" flex flex-col py-4 gap-5 px-2 shadow-md rounded-md">
                  <div>
                    <h3 className="font-semibold text-black w-full border-b-2 pb-2 uppercase mb-2">
                      Area of Specialization
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {fellow.areaOfSpecialization.length > 0
                        ? fellow.areaOfSpecialization.map((spec, index) => {
                            return (
                              <p
                                key={index}
                                className="border-2 w-fit px-2 py-1 rounded-xl"
                              >
                                {spec}
                              </p>
                            );
                          })
                        : `No Area of Specialization for ${
                            fellow.name.firstname + " " + fellow.name.lastname
                          }`}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black w-full border-b-2 pb-2 uppercase mb-2">
                      Research Interests
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {fellow.researchInterest.length > 0
                        ? fellow.researchInterest.map((interest, index) => {
                            return (
                              <p
                                key={index}
                                className="border-2 w-fit px-2 py-1 rounded-xl"
                              >
                                {interest}
                              </p>
                            );
                          })
                        : `No Area of Specialization for ${
                            fellow.name.firstname + " " + fellow.name.lastname
                          }`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>{fellowDetails.error}</p>
        )
      ) : (
        <p>loading</p>
      )}
    </Fragment>
  );
};

export default SingleFellow;
