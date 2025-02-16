"use client";

import { getSingleFellow } from "@/utils/fellow";
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
        fellow: {
          ...response,
          areaOfSpecialization: response.areaOfSpecialization.split(","),
          researchInterest: response.researchInterest.split(","),
        },
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
            <div className="h-full w-full hidden md:block overflow-hidden">
              <div className=" bg-secondary_color p-8 flex flex-col gap-5">
                <div>
                  <h2 className="h2 uppercase text-white">
                    {fellow.name.surname +
                      " " +
                      fellow.name.firstname +
                      " " +
                      fellow.name.othername}
                  </h2>
                  <p className="capitalize text-white">{fellow.position}</p>
                </div>
                <div className="text-xs capitalize text-white">
                  <p>{fellow.faculty}</p>
                  <p>{fellow.department}</p>
                  <p>{fellow.institutionId}</p>
                </div>
                <div className="flex gap-5 items-center text-xs">
                  <a
                    href={fellow.ORCIDNumber === "" ? "#" : fellow.ORCIDNumber}
                    className="hover:border-primary_color hover:bg-white hover:text-primary_color border border-transparent bg-primary_color text-secondary_text_color px-2 py-1 smooth transition shadow-sm"
                  >
                    ORCID Number
                  </a>

                  <a
                    href={
                      fellow.googleScholarProfile === ""
                        ? "#"
                        : fellow.googleScholarProfile
                    }
                    className="hover:border-primary_color hover:bg-white hover:text-primary_color border border-transparent bg-primary_color text-secondary_text_color px-2 py-1 smooth transition shadow-sm"
                  >
                    Google Scholar
                  </a>
                  <a
                    href={
                      fellow.researchGateProfile === ""
                        ? "#"
                        : fellow.researchGateProfile
                    }
                    className="hover:border-primary_color hover:bg-white hover:text-primary_color border border-transparent bg-primary_color text-secondary_text_color px-2 py-1 smooth transition shadow-sm"
                  >
                    ResearchGate
                  </a>
                </div>
              </div>
              <div className="h-[74%]  w-full xl:w-5/6 flex justify-between gap-5">
                <div className="h-full overflow-y-auto py-8  scrolling w-1/2 md:w-3/4  flex flex-col gap-5">
                  <div>
                    <h3 className="font-semibold text-secondary_color w-full border-b-2 pb-2 uppercase">
                      Contact Details
                    </h3>
                    <div className="flex flex-col gap-5 mt-5">
                      <p className="font-semibold text-black">
                        Name:
                        <span className="block text-gray-500 mt-1">
                          {fellow.name.surname +
                            " " +
                            fellow.name.firstname +
                            " " +
                            fellow.name.othername}
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
                    <h3 className="font-semibold text-secondary_color w-full border-b-2 pb-2 uppercase mb-2">
                      Bio
                    </h3>
                    <p>{fellow.shortBio}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-secondary_color w-full border-b-2 pb-2 uppercase mb-2">
                      Area of Specialization
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {fellow.areaOfSpecialization.length > 0
                        ? fellow.areaOfSpecialization.map((spec, index) => {
                            return (
                              <p
                                key={index}
                                className="border-2 border-primary_color w-fit px-2 py-1 rounded-xl"
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
                    <h3 className="font-semibold text-secondary_color w-full border-b-2 pb-2 uppercase mb-2">
                      Research Interests
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {fellow.researchInterest.length > 0
                        ? fellow.researchInterest.map((interest, index) => {
                            return (
                              <p
                                key={index}
                                className="border-2 border-primary_color w-fit px-2 py-1 rounded-xl"
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
                <div className="w-1/2 md:w-1/4 h-full -mt-44 flex flex-col gap-5">
                  <div className=" w-full flex flex-col   shadow-sm bg-white rounded-md">
                    <div className="w-full h-[300px]  ">
                      <img
                        src={
                          fellow.profileImg.url !== ""
                            ? fellow.profileImg.url
                            : "/our-fellows/placeholder.png"
                        }
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col gap-3 p-3">
                      <h3 className="h3 font-semibold text-black">
                        PhD Research Title
                      </h3>
                      <p className="text-xs">{fellow.PhDResearchTitle}</p>
                      <p className="text-xs">
                        ...{fellow.PhDResearchInstitute}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-white p-5 shadow-sm flex flex-col gap-5 ">
                    <div className="flex items-center">
                      <p className="text-black w-1/2 ">CARTA Cohort</p>
                      <p className="text-xs">{fellow.cohort.cohort}</p>
                    </div>
                    <div className="flex  items-center">
                      <p className="text-black w-1/2 ">CARTA Graduate</p>
                      <p className="text-xs capitalize">
                        {fellow.CARTAGraduate ? "Yes" : "no"}
                      </p>
                    </div>
                    {/* <div className="flex  items-center">
                      <p className="text-black w-1/2 ">ORCID Number</p>
                      <a
                        href={fellow.ORCIDNumber}
                        className="text-xs cursor-pointer hover:underline underline-offset-2"
                      >
                        {fellow.ORCIDNumber}
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-full md:hidden p-2 flex flex-col gap-5">
              <div className="w-full bg-secondary_color flex flex-col gap-2 justify-center items-center p-5">
                <div className="w-[150px] h-[150px]">
                  <img
                    src={
                      fellow.profileImg.url !== ""
                        ? fellow.profileImg.url
                        : "/our-fellows/placeholder.png"
                    }
                    alt={fellow.profileImg.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="w-full">
                  <h2 className="h2 uppercase text-center text-white ">
                    {fellow.name.surname +
                      " " +
                      fellow.name.firstname +
                      " " +
                      fellow.name.othername}
                  </h2>
                  <p className="capitalize text-center text-white">
                    {fellow.position}
                  </p>
                </div>
                <div className="text-white flex justify-center items-center divide-x-2  text-xs capitalize">
                  <p className="px-1 text-white">{fellow.faculty}</p>
                  <p className="px-1 text-white">{fellow.department}</p>
                </div>
                <p className="text-white">{fellow.institutionId}</p>
                <div className="flex flex-wrap gap-3 justify-center items-center text-xs mt-5">
                  <a
                    href={fellow.ORCIDNumber === "" ? "#" : fellow.ORCIDNumber}
                    className="hover:border-primary_color hover:bg-white hover:text-primary_color border border-transparent bg-primary_color text-secondary_text_color px-2 py-1 smooth transition shadow-sm"
                  >
                    ORCID Number
                  </a>

                  <a
                    href={
                      fellow.googleScholarProfile === ""
                        ? "#"
                        : fellow.googleScholarProfile
                    }
                    className="hover:border-primary_color hover:bg-white hover:text-primary_color border border-transparent bg-primary_color text-secondary_text_color px-2 py-1 smooth transition shadow-sm"
                  >
                    Google Scholar
                  </a>
                  <a
                    href={
                      fellow.researchGateProfile === ""
                        ? "#"
                        : fellow.researchGateProfile
                    }
                    className="hover:border-primary_color hover:bg-white hover:text-primary_color border border-transparent bg-primary_color text-secondary_text_color px-2 py-1 smooth transition shadow-sm"
                  >
                    ResearchGate
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5 px-2 py-4 shadow-md rounded-md">
                  <h3 className="font-semibold text-secondary_color w-full border-b-2 pb-2 uppercase mb-2">
                    Bio
                  </h3>
                  <p>{fellow.shortBio}</p>
                  <div className="w-full flex flex-col gap-5  ">
                    <div className="flex justify-between items-center">
                      <p className="">CARTA Cohort</p>
                      <p className="text-xs">{fellow.cohort.cohort}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="">CARTA Graduate</p>
                      <p className="text-xs capitalize">
                        {fellow.CARTAGraduate ? "Yes" : "no"}
                      </p>
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
                  <h3 className="font-semibold text-secondary_color w-full border-b-2 pb-2 uppercase">
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
                    <h3 className="font-semibold text-black w-full border-b-2 pb-2 uppercase mb-2 text-secondary_color">
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
                    <h3 className="font-semibold text-black w-full border-b-2 pb-2 uppercase mb-2 text-secondary_color">
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
        <div className="w-full h-full flex justify-center items-center">
          <span className="loader"></span>
        </div>
      )}
    </Fragment>
  );
};

export default SingleFellow;
