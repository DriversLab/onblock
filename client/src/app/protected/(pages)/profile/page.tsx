"use client";

import { useEffect, useState } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { getUser } from "@/lib/firebase/api";
import WebApp from "@twa-dev/sdk";
import { UserData } from "@/types/user";
import Image from "next/image";


const Page = () => {
  const [ profileInfo, setProfileInfo ] = useState<UserData | null | undefined>();
  useEffect(() => {
      const user = WebApp.initDataUnsafe.user;
      if(user) {
        const fetchUserData = async () => {
          const userQuery = await getUser(user.id);
          setProfileInfo(userQuery)
        }
  
        fetchUserData();
      }
  }, []); 

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-4">
      <TonConnectButton />

      {profileInfo ? (
        <div className="mt-8 p-6 bg-white shadow-md rounded-lg w-96 text-center">
          <Image 
            src={profileInfo.photo_url || ""}
            alt="Profile Pickture"
          />
          <h2 className="text-2xl font-semibold mb-4">
            {profileInfo.first_name} {profileInfo.last_name}
          </h2>
          <p className="text-gray-500 mb-2">
            @{profileInfo.username || "No username"}
          </p>
          <p className="text-gray-700">Language: {profileInfo.language_code}</p>
          {profileInfo.is_premium && (
            <p className="text-green-500 font-semibold mt-2">Premium User</p>
          )}
        </div>
      ) : (
        <p className="text-gray-500 mt-8">Loading profile...</p>
      )}
    </div>
  );
};

export default Page;
