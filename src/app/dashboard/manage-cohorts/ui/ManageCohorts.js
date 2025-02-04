"use client";
import React, { Fragment, useEffect, useState } from "react";
import Button from "../../Button";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

import Modal from "@/components/modal/Modal";
import { TiWarning } from "react-icons/ti";
import Link from "next/link";
import CohortForm from "./CohortForm";
import {
  addCohort,
  deleteCohort,
  editCohort,
  getAllCohort,
} from "@/utils/cohort";

const ManageCohorts = () => {
  const [allCohorts, setAllCohorts] = useState({
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

  allCohorts.array.length > 0 && searchInput === ""
    ? (newArr = [...allCohorts.array])
    : allCohorts.array.forEach((cohort) => {
        cohort.cohort.toString().toLowerCase().includes(searchInput) &&
          newArr.push(cohort);
      });

  useEffect(() => {
    const getFellows = async () => {
      const response = await getAllCohort();

      if (!response) {
        setAllCohorts({
          ...allCohorts,
          loading: false,
          error: "Failed to retrieve required data!",
        });
        return null;
      }

      setAllCohorts({
        ...allCohorts,
        array: [...response.cohorts],
        loading: false,
        error: false,
      });
    };

    getFellows();
  }, [modalToggle.delete, modalToggle.edit, modalToggle.add]);

  const deleteHandler = async () => {
    const response = await deleteCohort(selectedOption.id);

    if (!response) {
      alert("Unable to delete cohort. Please try again!");
    }
    alert("Cohort deleted successfully");
    setModalToggle({ ...modalToggle, delete: false });
  };

  const editHandler = async (formInput) => {
    if (
      !(
        formInput.cohort.trim().toLowerCase() === selectedOption.cohort &&
        formInput.description.trim().toLowerCase() ===
          selectedOption.description
      )
    ) {
      const response = await editCohort(formInput, selectedOption.id);

      if (!response) {
        alert("Unable to edit cohort Please check that cohort is not empty");
        return null;
      }

      alert("Cohort edited successfully");
    } else {
      alert("No changes detected!");
    }
  };

  const addHandler = async (formInput) => {
    const response = await addCohort(formInput);

    if (!response) {
      alert("Unable to add new cohort. Please check that cohort is not empty");
    }

    setModalToggle({ ...modalToggle, add: false });
  };
  return (
    <Fragment>
      <div className="h-full flex flex-col gap-3  ">
        <div className="flex gap-3 items-center mb-5  rounded-md ">
          <h2 className="h2 text-black">Manage all cohorts</h2>
          <p className="bg-primary_color px-2 text-secondary_text_color text-xs rounded-xl">
            {/* {allFellow.loading ? "..." : allFellow.array.length} */}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-5 bg-secondary_color rounded-md py-5 px-3">
          <div className="">
            <Button
              handleButtonClick={(event) => {
                event.preventDefault();
                router.push("/dashboard/manage-cohorts?action=addnewcohort");
                setModalToggle({ ...modalToggle, add: true });
              }}
            >
              Add New
            </Button>
          </div>
          <div className=" flex gap-2 justify-center items-center bg-white p-2 divide-x-2 rounded-sm shadow-sm">
            <FaSearch className="text-primary_color" />
            <input
              type="text"
              id="searchbar"
              name="searchbar"
              placeholder="Enter a cohort to search"
              className="outline-none bg-transparent px-2"
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
            modal_title={"Add New Cohort"}
            modalClose={() => {
              setSelectedOption({});
              setModalToggle({ ...modalToggle, add: false });
            }}
            height="sm"
          >
            <CohortForm
              cohortDetails={selectedOption}
              handleFormSubmission={addHandler}
            />
          </Modal>
        )}
        {modalToggle.edit && (
          <Modal
            modal_title={"Edit Cohort"}
            modalClose={() => {
              setSelectedOption({});
              setModalToggle({ ...modalToggle, edit: false });
            }}
            height="sm"
          >
            <CohortForm
              cohortDetails={selectedOption}
              type="update"
              handleFormSubmission={editHandler}
            />
          </Modal>
        )}
        <div className="h-full shadow-sm border overflow-y-auto rounded-md p-2 scrolling">
          {!allCohorts.loading ? (
            !allCohorts.error ? (
              <table className="w-full text-left py-5">
                <thead className="md:sticky top-0 text-sm bg-white shadow-sm  ">
                  <tr>
                    <th className="py-3 px-5">S/N</th>
                    <th className="py-3 px-5">Cohort</th>
                    <th className="py-3 px-5">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {newArr.map((cohort, index) => {
                    return (
                      <tr key={index} className="border-b-2">
                        <td className="w-1/5 py-3 px-5 items-center">
                          {index + 1}
                        </td>
                        <td className="w-1/5 py-3 px-5 cursor-pointer h-[70px] edit-panel-control">
                          <div>
                            <p className=" capitalize hover:underline underline-offset-2 font-semibold">
                              {cohort.cohort}
                            </p>
                            <div className=" edit-panel hidden py-1">
                              <div className="flex gap-1 items-center">
                                <Link
                                  href={`/dashboard/manage-cohorts?edit=${cohort.id}`}
                                  className="text-xs mr-2 hover:underline underline-offset-2"
                                  onClick={() => {
                                    setSelectedOption(cohort);
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
                                    setSelectedOption(cohort);
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
                        <td className="py-3 px-5  items-center">
                          {cohort.description}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>{allCohorts.error}</p>
            )
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loader"></span>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ManageCohorts;
