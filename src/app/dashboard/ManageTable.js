import Modal from "@/components/modal/Modal";
import Link from "next/link";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { TiWarning } from "react-icons/ti";
import Button from "./Button";
import { GeneralContext } from "@/components/Context";
import { useRouter } from "next/navigation";

const ManageTable = ({ data, editLink }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const router = useRouter();

  const { selectedOption, setSelectedOption, searchInput, deleteHandler } =
    useContext(GeneralContext);
  let newArr = [];

  data.array.length > 0 && searchInput === ""
    ? (newArr = [...data.array])
    : data.array.forEach((fellow) => {
        (fellow.name.firstname + " " + fellow.name.lastname)
          .toLowerCase()
          .includes(searchInput) && newArr.push(fellow);
      });
  useEffect(() => {
    if (!selectedOption.id) {
      setDeleteModal(false);
    }
  }, [selectedOption]);
  return (
    <Fragment>
      {deleteModal && (
        <Modal
          modalClose={() => {
            setSelectedOption({});
            setDeleteModal(false);
          }}
          height="sm"
        >
          <div className="flex flex-col gap-5 justify-center items-center">
            <TiWarning className="text-yellow-600 text-6xl" />
            <p>
              Deleting this item is permanent and cannot be undone. Are you sure
              you want to proceed?
            </p>
            <Button handleButtonClick={deleteHandler}>Delete</Button>
          </div>
        </Modal>
      )}
      {!data.loading ? (
        !data.error ? (
          <table className="w-full  text-left py-5 ">
            <thead className=" md:sticky top-0 text-sm bg-white ">
              <tr>
                <th className="py-3 px-5">S/N</th>
                <th className="py-3 px-5">Name</th>
                <th className="py-3 px-5">Email</th>
                <th className="py-3 px-5">Faculty/Institute</th>
                <th className="py-3 px-5">Cohort</th>
              </tr>
            </thead>
            <tbody>
              {newArr.map((fellow, index) => {
                return (
                  <tr key={index} className="border-b-2">
                    <td className="py-3 px-5 items-center">{index + 1}</td>
                    <td className="py-3 px-5 cursor-pointer h-[70px] edit-panel-control">
                      <div>
                        <p
                          className="hover:underline underline-offset-2 font-semibold"
                          onClick={() => router.push(`${editLink}${fellow.id}`)}
                        >
                          {fellow.name.surname +
                            " " +
                            fellow.name.firstname +
                            " " +
                            fellow.name.othername}
                        </p>
                        <div className=" edit-panel hidden py-1">
                          <div className="flex gap-1 items-center">
                            <Link
                              href={`${editLink}${fellow.id}`}
                              className="text-xs mr-2"
                            >
                              Edit
                            </Link>
                            <p
                              className="text-xs mr-2"
                              onClick={() => {
                                setSelectedOption(fellow);
                                setDeleteModal(true);
                              }}
                            >
                              Delete
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5  items-center">{fellow.email}</td>
                    <td className="py-3 px-5  items-center">
                      {fellow.faculty} /{" "}
                      <a
                        href={fellow.institution.website}
                        className="underline text-blue-700 cursor-pointer"
                      >
                        {fellow.institution.name}
                      </a>
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
          <p>{data.error}</p>
        )
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <span className="loader"></span>
        </div>
      )}
    </Fragment>
  );
};

export default ManageTable;
