"use client";

import WebApp from "@twa-dev/sdk";

import { useState, useEffect, useCallback } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { Address } from "@ton/core";

import { getUser, getUserQuests } from "@/lib/firebase/api";
import { UserData } from "@/types/user";
import { Loading } from "@/components/atoms";

import { QuestsData } from "@/types/quest";
import { Card, CardContent } from "@/components/ui/card";

const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState<UserData | null | undefined>();
  const [quests, setQuests] = useState<QuestsData[]>([]);

  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);


  const handleWalletConnection = useCallback((address: string) => {
    setTonWalletAddress(address);
    console.log("Wallet connected successfully!");
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    console.log("Wallet disconnected successfully!");
  }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account?.address);
      } else {
        handleWalletDisconnection();
      }
    };

    checkWalletConnection();

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  };

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
            {!tonWalletAddress ? (
               <button
               onClick={handleWalletAction}
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
             >
               Connect TON Wallet
             </button>
            ) : (
              <span>{formatAddress(tonWalletAddress)}</span>
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
      )}
    </div>
  );
};

export default ProfilePage;
