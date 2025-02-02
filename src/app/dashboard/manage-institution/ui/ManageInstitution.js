"use client";
import React, { Fragment, useEffect, useState } from "react";
import Button from "../../Button";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

import Modal from "@/components/modal/Modal";
import { TiWarning } from "react-icons/ti";
import Link from "next/link";

import InstitutionForm from "./InstitutionForm";
import {
  addInstitution,
  deleteInstitution,
  editinstitution,
  getAllInstitution,
} from "@/utils/institution";

const ManageInstitution = () => {
  const [allInstitution, setAllInstitution] = useState({
    array: [],
    loading: true,
    error: false,
  });
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [selectedOption, setSelectedOption] = useState({});

  const [modalToggle, setModalToggle] = useState({
    delete: false,
    edit: false,
    add: false,
  });

  let newArr = [];

  allInstitution.array.length > 0 && searchInput === ""
    ? (newArr = [...allInstitution.array])
    : allInstitution.array.forEach((institution) => {
        institution.name.toLowerCase().includes(searchInput) &&
          newArr.push(institution);
      });

  useEffect(() => {
    const getInstitution = async () => {
      const response = await getAllInstitution();

      if (!response) {
        setAllInstitution({
          ...allInstitution,
          loading: false,
          error: "Failed to retrieve required data!",
        });
        return null;
      }

      setAllInstitution({
        ...allInstitution,
        array: [...response.institutions],
        loading: false,
        error: false,
      });
    };

    getInstitution();
  }, [modalToggle.delete, modalToggle.edit, modalToggle.add]);

  const deleteHandler = async () => {
    const response = await deleteInstitution(selectedOption.id);

    if (!response) {
      alert("Unable to delete Institution. Please try again!");
    }
    alert("Institution deleted successfully");
    setModalToggle({ ...modalToggle, delete: false });
  };
  const editHandler = async (formInput) => {
    if (
      !(
        formInput.name.trim().toLowerCase() === selectedOption.name &&
        formInput.website.trim().toLowerCase() === selectedOption.website
      )
    ) {
      const response = await editinstitution(formInput, selectedOption.id);

      if (!response) {
        alert("Unable to edit Institution Please check that name is not empty");
        return null;
      }

      alert("Institution edited successfully");
    } else {
      alert("No changes detected!");
    }
  };
  const addHandler = async (formInput) => {
    const response = await addInstitution(formInput);

    if (!response) {
      alert(
        "Unable to add new institution. Please check that name is not empty"
      );
    }

    setModalToggle({ ...modalToggle, add: false });
    router.push("/dashboard/manage-institution");
  };
  return (
    <Fragment>
      <div className="h-full flex flex-col gap-5  ">
        <div className="flex gap-3 items-center mb-5">
          <h2 className="h2">Manage all institution</h2>
          <p className="bg-gray-500 px-2 text-white text-xs rounded-xl">
            {/* {allInstitution.loading ? "..." : allInstitution.array.length} */}
          </p>
        </div>
        <div className="flex gap-5">
          <Button
            handleButtonClick={(event) => {
              event.preventDefault();
              router.push(
                "/dashboard/manage-institution?action=addnewinstitute"
              );
              setModalToggle({ ...modalToggle, add: true });
            }}
          >
            Add New
          </Button>
          <div className=" flex gap-2 justify-center items-center bg-white p-2 divide-x-2 rounded-sm shadow-sm">
            <FaSearch />
            <input
              type="text"
              id="searchbar"
              name="searchbar"
              placeholder="Enter an institution to search"
              className="outline-none bg-transparent px-2 w-full"
              onChange={(e) => {
                setSearchInput(e.target.value.toLowerCase());
              }}
            />
          </div>
        </div>
        {modalToggle.delete && (
          <Modal
            modalClose={() => {
              setSelectedOption({});
              setModalToggle({ ...modalToggle, delete: false });
              router.push("/dashboard/manage-institution");
            }}
            height="sm"
          >
            <div className="flex flex-col gap-5 justify-center items-center">
              <TiWarning className="text-yellow-600 text-6xl" />
              <p>
                Deleting this item is permanent and cannot be undone. Are you
                sure you want to proceed?
              </p>
              <Button handleButtonClick={deleteHandler}>Delete</Button>
            </div>
          </Modal>
        )}
        {modalToggle.add && (
          <Modal
            modal_title={"Add New Institution"}
            modalClose={() => {
              setSelectedOption({});
              setModalToggle({ ...modalToggle, add: false });
              router.push("/dashboard/manage-institution");
            }}
            height="sm"
          >
            <InstitutionForm
              institutionDetails={selectedOption}
              handleFormSubmission={addHandler}
            />
          </Modal>
        )}
        {modalToggle.edit && (
          <Modal
            modal_title={"Edit Institution"}
            modalClose={() => {
              setSelectedOption({});
              setModalToggle({ ...modalToggle, edit: false });
              router.push("/dashboard/manage-institution");
            }}
            height="sm"
          >
            <InstitutionForm
              institutionDetails={selectedOption}
              type="update"
              handleFormSubmission={editHandler}
            />
          </Modal>
        )}
        <div className="h-full shadow-sm overflow-y-auto scrolling">
          {!allInstitution.loading ? (
            !allInstitution.error ? (
              <table className="w-full shadow-sm text-left py-5">
                <thead className="bg-gray-100 sticky top-0 text-sm  ">
                  <tr>
                    <th className="py-3 px-5">S/N</th>
                    <th className="py-3 px-5">Institution</th>
                    <th className="py-3 px-5">Official Website</th>
                  </tr>
                </thead>
                <tbody>
                  {newArr.map((institution, index) => {
                    return (
                      <tr key={index} className="border-b-2">
                        <td className="w-1/5 py-3 px-5 items-center">
                          {index + 1}
                        </td>
                        <td className="w-2/5 py-3 px-5 cursor-pointer h-[70px] edit-panel-control">
                          <div>
                            <p className="capitalize hover:underline underline-offset-2 font-semibold">
                              {institution.name}
                            </p>
                            <div className=" edit-panel hidden py-1">
                              <div className="flex gap-1 items-center">
                                <Link
                                  href={`/dashboard/manage-institution?edit=${institution.id}`}
                                  className="text-xs mr-2 hover:underline underline-offset-2"
                                  onClick={() => {
                                    setSelectedOption(institution);
                                    setModalToggle({
                                      ...modalToggle,
                                      edit: true,
                                    });
                                  }}
                                >
                                  Edit
                                </Link>
                                <p
                                  className="text-xs mr-2 hover:underline underline-offset-2"
                                  onClick={() => {
                                    setSelectedOption(institution);
                                    setModalToggle({
                                      ...modalToggle,
                                      delete: true,
                                    });
                                  }}
                                >
                                  Delete
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="w-2/5 py-3 px-5  items-center">
                          {institution.website}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>{allInstitution.error}</p>
            )
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ManageInstitution;
