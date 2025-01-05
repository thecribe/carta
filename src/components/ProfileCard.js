import { useRouter } from "next/navigation";
import React from "react";

const ProfileCard = ({ fellow }) => {
  const router = useRouter();
  return (
    <div
      className="w-full flex flex-col gap-3 cursor-pointer"
      onClick={() => {
        router.push(`/directory/fellows/${fellow.id}`);
      }}
    >
      <img
        src="/placeholder.png"
        alt="placeholder"
        className="rounded-tr-md rounded-bl-md"
      />
      <h3 className="text-center">
        {fellow.name.firstname + " " + fellow.name.lastname}
      </h3>
    </div>
  );
};

export default ProfileCard;
