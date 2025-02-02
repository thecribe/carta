import React, { Fragment } from "react";

import { IoClose } from "react-icons/io5";

const Modal = ({ modal_title, modalClose, children, height }) => {
  return (
    <Fragment>
      <div className="fixed top-0 w-full h-full z-30 left-0 flex  md:justify-center items-center">
        <div className="absolute top-0 w-full h-full opacity-65 bg-black"></div>
        <div
          className={`bg-gray-50 absolute w-full mx-2 md:w-1/2 ${
            height != "sm" && "h-5/6"
          }  rounded-lg flex flex-col gap-5 p-5`}
        >
          <div className="w-full flex justify-between items-center border-b-2 pb-2">
            <h3 className="text-black font-semibold">{modal_title}</h3>
            <p
              onClick={modalClose}
              className="text-xl cursor-pointer text-red-600 "
            >
              <IoClose />
            </p>
          </div>
          <div className="h-full w-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
