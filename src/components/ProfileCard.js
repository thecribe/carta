import { useRouter } from "next/navigation";
import React from "react";

const ProfileCard = ({ fellow }) => {
  const router = useRouter();
  return (
    <div
      className="w-full flex flex-col gap-3 cursor-pointer p-3 border rounded-md shadow-sm"
      onClick={() => {
        router.push(`/directory/fellows/${fellow.id}`);
      }}
    >
      <img
        src={fellow.profileImg.url}
        alt="placeholder"
        className="rounded-tr-lg rounded-bl-lg "
      />
      <h3 className="text-center">
        {fellow.name.surname +
          " " +
          fellow.name.firstname +
          " " +
          fellow.name.othername}
      </h3>
      <p className="text-xs text-center">{fellow.currentLevel}</p>
    </div>
  );
};

export default ProfileCard;
