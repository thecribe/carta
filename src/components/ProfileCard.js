import { useRouter } from "next/navigation";
import React from "react";

const ProfileCard = ({ fellow }) => {
  const router = useRouter();
  return (
    <div
      className=" w-full flex justify-center items-center gap-3 cursor-pointer "
      onClick={() => {
        router.push(`/directory/fellows/${fellow.id}`);
      }}
    >
      <div className="flex flex-col gap-3 border rounded-md shadow-sm p-2 ">
        <div className=" w-[150px]">
          <img
            src={fellow.profileImg.url}
            alt="placeholder"
            className="w-full object-cover rounded-tr-lg rounded-bl-lg "
          />
        </div>

        <h3 className="text-center text-secondary_color">
          {fellow.name.surname +
            " " +
            fellow.name.firstname +
            " " +
            fellow.name.othername}
        </h3>
        <p className="text-xs -mt-3 text-center text-primary_text_color">
          {fellow.currentLevel}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
