"use client";

import { useEffect, useState } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { getUser } from "@/lib/firebase/api";
import WebApp from "@twa-dev/sdk";
import { UserData } from "@/types/user";
import Image from "next/image";
import { Loading } from "@/components/atoms";


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
    <div className="w-full h-screen flex flex-col justify-start items-center p-4 pt-10">
      {profileInfo ? (
        <>
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
        </>
      ) : (
       <div className="w-full h-full flex justify-center items-center">
         <Loading />
        </div>
      )}
    </div>
  );
};

export default Page;
