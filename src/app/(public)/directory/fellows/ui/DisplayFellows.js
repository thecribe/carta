import React, { Fragment, useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import { useRouter } from "next/navigation";

const DisplayFellows = ({ allFellow }) => {
  const [layout, setLayout] = useState(true);
  const router = useRouter();

  return (
    <Fragment>
      <div className="hidden md:flex w-full h-full flex-col gap-4">
        <div className="justify-end flex gap-5">
          <div className="flex justify-center items-center border divide-x-2 rounded-sm">
            <p
              onClick={() => setLayout(true)}
              className="px-3 py-1 hover:bg-gray-600 hover:text-white cursor-pointer"
            >
              Grid
            </p>
            <p
              onClick={() => setLayout(false)}
              className="px-3 py-1 hover:bg-gray-600 hover:text-white cursor-pointer"
            >
              List
            </p>
          </div>
        </div>
        {layout ? (
          <div className="md:block h-[95%] overflow-y-auto scrolling p-2">
            <div className="flex flex-col justify-center items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-7">
              {!allFellow.loading ? (
                !allFellow.error ? (
                  allFellow.array.map((fellow, index) => {
                    return <ProfileCard key={index} fellow={fellow} />;
                  })
                ) : (
                  <p>{allFellow.error}</p>
                )
              ) : (
                <p>loading</p>
              )}
            </div>
          </div>
        ) : (
          <div className="h-[95%] overflow-y-auto scrolling rounded-sm shadow-sm ">
            {!allFellow.loading ? (
              !allFellow.error ? (
                <table className="w-full shadow-sm text-left py-5">
                  <thead className="bg-gray-100 sticky top-0 text-sm  ">
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
                            {fellow.name.firstname + " " + fellow.name.lastname}
                          </td>
                          <td className="py-3 px-5  items-center">
                            {fellow.email}
                          </td>
                          <td className="py-3 px-5  items-center">
                            {fellow.faculty + "/" + fellow.university}
                          </td>
                          <td className="py-3 px-5  items-center">
                            {fellow.department}
                          </td>
                          <td className="py-3 px-5  items-center">
                            {fellow.cohort}
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
              <p>loading</p>
            )}
          </div>
        )}
      </div>
      <div className=" md:hidden h-full overflow-y-auto scrolling rounded-sm shadow-sm ">
        {!allFellow.loading ? (
          !allFellow.error ? (
            <table className="w-full shadow-sm text-left py-5">
              <thead className="bg-gray-100 sticky top-0 text-sm  ">
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
                        {fellow.name.firstname + " " + fellow.name.lastname}
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
          <p>loading</p>
        )}
      </div>
    </Fragment>
  );
};

export default DisplayFellows;
