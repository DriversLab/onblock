"use client";

import WebApp from "@twa-dev/sdk";

import { useEffect, useState } from "react";

import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";

import { getUser } from "@/lib/firebase/api";
import { UserData } from "@/types/user";
import { Loading } from "@/components/atoms";

const Page = () => {
  const [profileInfo, setProfileInfo] = useState<UserData | null | undefined>();

  const address = useTonAddress();

  useEffect(() => {
    const user = WebApp.initDataUnsafe.user;
    if (user) {
      const fetchUserData = async () => {
        const userQuery = await getUser(user.id);
        setProfileInfo(userQuery);
      };

      fetchUserData();
    }
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center p-4 pt-10 font-extralight">
      {profileInfo ? (
        <>
          <div
            className={"size-16 rounded-full flex justify-center items-center border-[0.5px] border-dashed border-white px-5"}
            style={{
              backgroundColor: profileInfo.profile_color?.bg,
              color: profileInfo.profile_color?.text,
            }}
          >
            <span className="text-2xl">
              {profileInfo.first_name[0]}
            </span>
          </div>
          <h2 className="text-3xl mt-5">
            {profileInfo?.first_name} {profileInfo?.last_name}
          </h2>

          <div className="mt-5 w-full flex justify-between items-center">
            <span>Wallet</span>
            { !address ? <TonConnectButton /> : <span>{address}</span>}
          </div>

          
          <div className="flex flex-col w-full justify-start items-center mt-5 flex-grow overflow-y-scroll">
              <span className="text-right mb-5 w-full">Quests</span>
              {
                profileInfo.quests.length > 0 ? profileInfo.quests.map((item, i) => (
                  <div key={`quests-profile-${i}`} className="w-full my-1">
                    Some info
                  </div>
                )) : <span>There is no quests yet</span>
              }
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

export default Page;
