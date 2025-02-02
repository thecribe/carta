"use client";
import React, { Fragment, useState } from "react";
import FellowForm from "../../ui/FellowForm";

import Modal from "@/components/modal/Modal";
import { TiWarning } from "react-icons/ti";
import { SiTicktick } from "react-icons/si";
import Button from "@/app/dashboard/Button";
import { addFellow } from "@/utils/fellow";

const AddFellow = () => {
  const [statusModal, setStatusModal] = useState({
    message: "",
    error: false,
    status: false,
  });
  const handleFormSubmission = async (formInput) => {
    const response = await addFellow(formInput);
    if (!response) {
      setStatusModal({
        ...statusModal,
        status: true,
        message: "Failed to add fellow!",
        error: true,
      });
      return null;
    }

    if (!response.created) {
      setStatusModal({
        ...statusModal,
        status: true,
        message: response.message,
        error: true,
      });
      return null;
    }
    setStatusModal({
      ...statusModal,
      status: true,
      message: "Fellow Add successfully",
      error: false,
    });

    return null;
  };
  return (
    <Fragment>
      {statusModal.status && (
        <Modal
          modalClose={() => {
            setStatusModal({ message: "", error: false, status: false });
          }}
          height="sm"
        >
          <div className="flex flex-col gap-5 justify-center items-center">
            {statusModal.error ? (
              <TiWarning className="text-yellow-600 text-6xl" />
            ) : (
              <SiTicktick className="text-green-600 text-6xl" />
            )}
            {statusModal.message}
            <Button
              handleButtonClick={() => {
                setStatusModal({ message: "", error: false, status: false });
              }}
            >
              Back
            </Button>
          </div>
        </Modal>
      )}
      <div className="flex gap-3 items-center mb-5">
        <h2 className="h2">Add new fellow</h2>
      </div>
      <div className="w-full md:w-2/3 h-[95%] overflow-y-auto mx-auto my-0 md:p-2 scrolling shadow-md overflow-x-hidden">
        <FellowForm
          fellowDetails={{}}
          handleFormSubmission={handleFormSubmission}
        />
      </div>
    </Fragment>
  );
};

export default AddFellow;
