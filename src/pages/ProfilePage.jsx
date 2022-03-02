import React from "react";
import Button from "../components/Button";
import useLocalStorage from "../hooks/useLocalStorage";

const ProfilePage = () => {
  const { avatar, name, email } = useLocalStorage();

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="w-full max-w-[800px] mx-auto px-3 mb-10 shadow shadow-gray-300 border border-gray-200">
      <h2 className="text-xl font-medium my-2">Profile</h2>
      <div>
        <div>
          <img src={avatar} alt="Profile" className="rounded" />
        </div>
        <h2 className="mt-2 font-medium text-lg">{name}</h2>
        <div className="mt-2 font-medium text-base">{email}</div>
        <div className="mt-4">
          <Button className="bg-stay-primary text-white" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
