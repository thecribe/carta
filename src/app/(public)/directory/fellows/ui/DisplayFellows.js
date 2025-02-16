import React, { Fragment, useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import { useRouter } from "next/navigation";
import { PiGridNineFill } from "react-icons/pi";
import { CiCircleList } from "react-icons/ci";

const DisplayFellows = ({ allFellow }) => {
  const [layout, setLayout] = useState(true);
  const router = useRouter();

  return (
    <Fragment>
      <div className="hidden md:flex w-full h-full flex-col gap-4">
        <div className="justify-end flex gap-5 ">
          <div className="flex justify-center items-center border border-primary_color divide-x-2 divide-primary_color rounded-sm">
            <p
              onClick={() => setLayout(true)}
              className="px-3 py-1 text-primary_color smooth-transition  cursor-pointer"
            >
              <PiGridNineFill />
            </p>
            <p
              onClick={() => setLayout(false)}
              className="px-3 py-1 text-primary_color smooth-transition cursor-pointer"
            >
              <CiCircleList />
            </p>
          </div>
        </div>
        {layout ? (
          <div className="md:block h-[95%] overflow-y-auto scrolling p-2">
            <div className="flex flex-col  items-center md:flex-row flex-wrap gap-7">
              {!allFellow.loading ? (
                !allFellow.error ? (
                  allFellow.array.map((fellow, index) => {
                    return <ProfileCard key={index} fellow={fellow} />;
                  })
                ) : (
                  <p>{allFellow.error}</p>
                )
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <span className="loader"></span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-[95%] overflow-y-auto scrolling rounded-sm shadow-sm ">
            {!allFellow.loading ? (
              !allFellow.error ? (
                <table className="w-full shadow-sm text-left py-5">
                  <thead className="bg-white sticky top-0 text-sm  ">
                    <tr>
                      <th className="py-3 px-5">S/N</th>
                      <th className="py-3 px-5">Name</th>
                      <th className="py-3 px-5">Email</th>
                      <th className="py-3 px-5">Faculty/Institute</th>
                      <th className="py-3 px-5">Department</th>
                      <th className="py-3 px-5">Cohort</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allFellow.array.map((fellow, index) => {
                      return (
                        <tr key={index}>
                          <td className="py-3 px-5 items-center">
                            {index + 1}
                          </td>
                          <td
                            className="py-3 px-5  items-center cursor-pointer hover:underline underline-offset-2"
                            onClick={() => {
                              router.push(`/directory/fellows/${fellow.id}`);
                            }}
                          >
                            {fellow.name.surname +
                              " " +
                              fellow.name.firstname +
                              " " +
                              fellow.name.othername}
                          </td>
                          <td className="py-3 px-5  items-center">
                            {fellow.email}
                          </td>
                          <td className="py-3 px-5  items-center">
                            {fellow.faculty + "/" + fellow.institutionId}
                          </td>
                          <td className="py-3 px-5  items-center">
                            {fellow.department}
                          </td>
                          <td className="py-3 px-5  items-center">
                            {fellow.cohort.cohort}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p>{allFellow.error}</p>
              )
            ) : (
              <div className="flex justify-center items-center">
                <span className="loader"></span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className=" md:hidden h-full overflow-y-auto scrolling rounded-sm shadow-sm ">
        {!allFellow.loading ? (
          !allFellow.error ? (
            <table className="w-full shadow-sm text-left py-5">
              <thead className="bg-white sticky top-0 text-sm  ">
                <tr>
                  <th className="py-3 px-5">S/N</th>
                  <th className="py-3 px-5">Name</th>
                  <th className="py-3 px-5">Email</th>
                </tr>
              </thead>
              <tbody>
                {allFellow.array.map((fellow, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-3 px-5 items-center">{index + 1}</td>
                      <td
                        className="py-3 px-5  items-center cursor-pointer hover:underline underline-offset-2"
                        onClick={() => {
                          router.push(`/directory/fellows/${fellow.id}`);
                        }}
                      >
                        {fellow.name.surname +
                          " " +
                          fellow.name.firstname +
                          " " +
                          fellow.name.othername}
                      </td>
                      <td className="py-3 px-5  items-center">
                        {fellow.email}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>{allFellow.error}</p>
          )
        ) : (
          <div className="flex justify-center items-center">
            <span className="loader"></span>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default DisplayFellows;
