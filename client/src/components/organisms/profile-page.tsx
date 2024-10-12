"use client";

import WebApp from "@twa-dev/sdk";

import { useState, useEffect, useCallback } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Address } from "@ton/core";

import { getUser, getUserQuests } from "@/lib/firebase/api";
import { UserData } from "@/types/user";
import { Loading } from "@/components/atoms";

import { QuestsData } from "@/types/quest";
import Image from "next/image";
import { TabBar } from "../molecules";
import { Button } from "../ui/button";

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
        const userQuests = await getUserQuests(user.id.toString());

        setQuests(userQuests || []);
      };

      fetchUserData();
    }
  }, []);

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-start items-center px-10 pt-10 font-extralight">
        {profileInfo ? (
          <>
            <div
              className="size-16 rounded-full flex justify-center items-center px-5"
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
                <Button onClick={handleWalletAction}>Connect Wallet</Button>
              ) : (
                <span>{formatAddress(tonWalletAddress)}</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full justify-start items-center mt-5 max-h-80 min-h-24 overflow-y-scroll rounded-xl border border-dashed border-white p-2">
              {quests.length > 0 ? (
                quests.map((quest) => (
                  <div
                    key={quest.id}
                    className="bg-gray-900 p-4 rounded-lg border border-l-sky-50 text-black mb-1 group"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-2xl text-gray-200 font-extrabold mb-1">
                          {quest.name || "Name"}
                        </h2>
                        <p className="text-xs text-slate-200">
                          Stages: {quest.totalStages || "total stages"}
                        </p>
                        <p className="text-xs text-slate-200 flex items-center">
                          {quest.isActive ? "Active" : "Disabled"}
                          <span
                            className={`ml-2 w-3 h-3 rounded-full ${
                              quest.isActive
                                ? "bg-green-500 animate-pulse shadow-green-400 shadow-[0_0_8px]"
                                : "bg-gray-400"
                            }`}
                          ></span>
                        </p>
                      </div>
                      <div className="w-16 h-16 mr-4 rounded-full bg-purple-100 flex justify-center items-center">
                        <Image
                          src={quest.pictureUrl}
                          alt="Quest"
                          width={32}
                          height={32}
                          objectFit={"contain"}
                          quality={100}
                          priority
                          className="w-full h-full rounded-full"
                        />
                      </div>
                    </div>
                    <div className="relative mb-4">
                      <div className="relative w-full bg-gray-300 rounded-full h-1">
                        <div
                          className="absolute top-0 left-0 h-1 bg-green-400 rounded-full"
                          style={{
                            width: `${
                              (quest.stagesCompleted / quest.totalStages) * 100
                            }%`,
                          }}
                        ></div>
                        <div className="relative flex justify-between">
                          {[...Array(quest.totalStages)].map((_, i) => (
                            <span
                              key={i}
                              className="absolute top-[-2px] w-2 h-2 bg-green-700 rounded-full"
                              style={{
                                left: `${(i / (quest.totalStages - 1)) * 100}%`,
                                transform: `translateX(-50%)`,
                              }}
                            ></span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-200">Tags: {quest.tag}</p>
                  </div>
                ))
              ) : (
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
      <TabBar />
    </>
  );
};

export default ProfilePage;
