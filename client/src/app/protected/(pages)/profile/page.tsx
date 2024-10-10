"use client";

<<<<<<< HEAD
import WebApp from "@twa-dev/sdk";

import { useEffect, useState } from "react";

import { getUser, getUserQuests } from "@/lib/firebase/api";
import { UserData } from "@/types/user";
import { Loading } from "@/components/atoms";

import { Address } from "@ton/core";
import { TonConnectButton, useTonAddress, useTonConnectModal } from "@tonconnect/ui-react";
import { QuestsData } from "@/types/quest";
import { Card, CardContent } from "@/components/ui/card";

const Page = () => {
  const [profileInfo, setProfileInfo] = useState<UserData | null | undefined>();
  const [quests, setQuests] = useState<QuestsData[]>([]);

  const address = useTonAddress();

  const formatAddress = (address: string) => {
    const tempAddress = Address.parse(address).toString();
    return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
  };

  useEffect(() => {
    const user = WebApp.initDataUnsafe.user;
    if (user) {
      const fetchUserData = async () => {
        const userQuery = await getUser(user.id);
        setProfileInfo(userQuery);
        const userQuests = await getUserQuests(userQuery?.id);

        setQuests(userQuests || []);
      };

      fetchUserData();
    }
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center px-10 pt-10 font-extralight">
      {profileInfo ? (
        <>
          <div
            className={
              "size-16 rounded-full flex justify-center items-center  px-5"
            }
            style={{
              backgroundColor: profileInfo.profile_color?.bg,
              color: profileInfo.profile_color?.text,
            }}
          >
            <span className="text-2xl">{profileInfo.first_name[0]}</span>
          </div>

          <h2 className="text-3xl mt-5">
            {profileInfo?.first_name} {profileInfo?.last_name}
          </h2>

          <div className="mt-5 w-full flex justify-between items-center">
            <span>Wallet</span>
            {!address ? (
             <TonConnectButton />
            ) : (
              <span>{formatAddress(address)}</span>
            )}
          </div>
          
          <div className="flex flex-col w-full justify-start items-center mt-5 max-h-98 min-h-24 overflow-y-scroll rounded-xl border border-dashed border-white p-2 ">
            {quests.length > 0 ?  quests.map((quest) => (
            <Card
              key={quest.id}
              onClick={() => {}}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg p-4 shadow-md"
            >
              <CardContent>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {quest.name}
                </h2>
                <p className="text-sm text-gray-500 mb-1">
                  {`Stages Completed: ${quest.stagesCompleted} / ${quest.totalStages}`}
                </p>
                {quest.requiresConfirmation && (
                  <p className="text-sm text-red-500">Confirmation Required</p>
                )}
                {quest.requiresAnswerCheck && (
                  <p className="text-sm text-red-500">Answer Check Required</p>
                )}
              </CardContent>
            </Card>
          )) : (
              <span>There is no quests yet</span>
            )}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
=======
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
>>>>>>> 34e8a46 (feat: update auth, restaruct rabbar and start ui part of profile)
      )}
    </div>
  );
};

export default Page;
