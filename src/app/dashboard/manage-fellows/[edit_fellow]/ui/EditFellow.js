"use client";
import React, { Fragment, useEffect, useState } from "react";
import FellowForm from "../../ui/FellowForm";
import { GeneralContext } from "@/components/Context";

import Modal from "@/components/modal/Modal";
import { TiWarning } from "react-icons/ti";
import Button from "@/app/dashboard/Button";
import { SiTicktick } from "react-icons/si";
import { getSingleFellow, updateFellow } from "@/utils/fellow";

const EditFellow = ({ id }) => {
  const [fellowDetails, setFellowDetails] = useState({
    fellow: {},
    loading: true,
    error: false,
  });
  const [statusModal, setStatusModal] = useState({
    message: "",
    error: false,
    status: false,
  });

  useEffect(() => {
    const getInitialData = async () => {
      const response = await getSingleFellow(id);

      if (!response) {
        setFellowDetails({
          ...fellowDetails,
          loading: false,
          error: "Failed to retrieve required data!",
        });
        return null;
      }

      setFellowDetails({
        ...fellowDetails,
        fellow: { ...response },
        loading: false,
        error: false,
      });

      return null;
    };
    if (id) {
      getInitialData();
    }
  }, [statusModal, id]);

  const handleFormSubmission = async (formInput) => {
    const response = await updateFellow(formInput, id);
    if (!response) {
      setStatusModal({
        ...statusModal,
        status: true,
        message: "Failed to update fellow!",
        error: true,
      });
      return null;
    }

    setStatusModal({
      ...statusModal,
      status: true,
      message: "Fellow updated successfully",
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
      <GeneralContext.Provider value={{}}>
        {!fellowDetails.loading && !fellowDetails.error && (
          <div>
            <FellowForm
              type="update"
              fellowDetails={fellowDetails}
              handleFormSubmission={handleFormSubmission}
            />
          </div>
        )}
      </GeneralContext.Provider>
    </Fragment>
  );
};

export default EditFellow;
