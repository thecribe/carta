"use client";
import React, { Fragment, useEffect, useState } from "react";
import Button from "../../Button";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import Modal from "@/components/modal/Modal";
import { TiWarning } from "react-icons/ti";
import Link from "next/link";
import UserForm from "./UserForm";
import { addUser, deleteUser, getAllUsers, updateUser } from "@/utils/user";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState({
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

  allUsers.array.length > 0 && searchInput === ""
    ? (newArr = [...allUsers.array])
    : allUsers.array.forEach((user) => {
        user.username.toLowerCase().includes(searchInput) && newArr.push(user);
      });

  useEffect(() => {
    const getUsers = async () => {
      const response = await getAllUsers();

      if (!response.users) {
        setAllUsers({
          ...allUsers,
          loading: false,
          error: "Failed to retrieve required data!",
        });
        return null;
      }

      setAllUsers({
        ...allUsers,
        array: [...response.users],
        loading: false,
        error: false,
      });
    };

    getUsers();
  }, [modalToggle.delete, modalToggle.add, modalToggle.edit]);

  const deleteHandler = async () => {
    const response = await deleteUser(selectedOption.id);
    if (!response) {
      alert("Unable to delete user");
      return null;
    }

    alert(`${selectedOption.username} deleted successfully`);

    setModalToggle({ ...modalToggle, delete: false });
  };
  const editHandler = async (formInput) => {
    const response = await updateUser(formInput, selectedOption.id);
    if (!response) {
      alert("Unable to update user profile");
      return null;
    }

    alert(`${selectedOption.username} updated successfully`);

    setModalToggle({ ...modalToggle, edit: false });
  };
  const addHandler = async (formInput) => {
    const response = await addUser(formInput);
    if (!response.created) {
      alert("User already exist");
      return null;
    }

    alert(`${response.user.username} created successfully`);

    setModalToggle({ ...modalToggle, add: false });
  };
  return (
    <Fragment>
      <div className="h-full flex flex-col gap-3  ">
        <div className="flex gap-3 items-center mb-5">
          <h2 className="h2">Manage all user</h2>
          <p className="bg-gray-500 px-2 text-white text-xs rounded-xl">
            {/* {allUsers.loading ? "..." : allUsers.array.length} */}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 bg-secondary_color rounded-md py-5 px-3">
          <div className="">
            <Button
              handleButtonClick={(event) => {
                event.preventDefault();
                router.push("/dashboard/manage-users?action=addUsers");
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
              placeholder="Enter an user to search"
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
            modal_title={"Add New user"}
            modalClose={() => {
              setSelectedOption({});
              setModalToggle({ ...modalToggle, add: false });
            }}
            height="sm"
          >
            <UserForm
              userDetails={selectedOption}
              handleFormSubmission={addHandler}
            />
          </Modal>
        )}
        {modalToggle.edit && (
          <Modal
            modal_title={"Edit user"}
            modalClose={() => {
              setSelectedOption({});
              setModalToggle({ ...modalToggle, edit: false });
            }}
            height="sm"
          >
            <UserForm
              userDetails={selectedOption}
              type="update"
              handleFormSubmission={editHandler}
            />
          </Modal>
        )}
        <div className="h-full shadow-sm border overflow-y-auto rounded-md p-2 scrolling">
          {!allUsers.loading ? (
            !allUsers.error ? (
              <table className="w-full  text-left py-5">
                <thead className="md:sticky top-0 text-sm bg-white shadow-sm  ">
                  <tr>
                    <th className="py-3 px-5">S/N</th>
                    <th className="py-3 px-5">Username</th>
                    <th className="py-3 px-5">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {newArr.map((user, index) => {
                    return (
                      <tr key={index} className="border-b-2">
                        <td className="w-1/5 py-3 px-5 items-center">
                          {index + 1}
                        </td>
                        <td className="w-2/5 py-3 px-5 cursor-pointer h-[70px] edit-panel-control">
                          <div>
                            <p className="hover:underline underline-offset-2 font-semibold">
                              {user.username}
                            </p>
                            <div className=" edit-panel hidden py-1">
                              <div className="flex gap-1 items-center">
                                <Link
                                  href={`/dashboard/manage-users?edit=${user.id}`}
                                  className="text-xs mr-2 hover:underline underline-offset-2"
                                  onClick={() => {
                                    setSelectedOption(user);
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
                                    setSelectedOption(user);
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
                          {user.email}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>{allUsers.error}</p>
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

export default ManageUsers;
