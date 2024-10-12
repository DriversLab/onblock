"use client";

import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserQuests } from "@/lib/firebase/api";
import { Button } from "@/components/ui/button";
import { QuestsData } from "@/types/quest";
import { TabBar } from "../molecules";
import Image from "next/image";

const StudioPage = () => {
  const [quests, setQuests] = useState<QuestsData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const user = WebApp.initDataUnsafe?.user;
    if (user) {
      const fetchQuests = async () => {
        try {
          const userQuests = await getUserQuests(user.id.toString());
          setQuests(userQuests || []);
        } catch (error) {
          console.error("Error fetching quests:", error);
        }
      };
      fetchQuests();
    }
  }, []);

  const handleCreateQuest = () => {
    router.push("studio/[create-quest]");
  };

  const handleEditQuest = (questId: string) => {
    router.push(`protected/edit-quest/${questId}`);
  };

  const renderProgressBar = (totalStages: number, stagesCompleted: number) => {
    if (!totalStages || totalStages <= 0) return null;

    const bulletPoints = [];
    for (let i = 0; i < totalStages; i++) {
      bulletPoints.push(
        <span
          key={i}
          className={`absolute top-[-2px] w-2 h-2 rounded-full ${
            i < stagesCompleted ? "bg-green-700" : "bg-gray-500"
          }`}
          style={{
            left: `${(i / (totalStages - 1)) * 100}%`,
            transform: `translateX(-50%)`,
          }}
        ></span>
      );
    }

    return (
      <div className="relative mb-4 mt-">
        <div className="relative w-full bg-gray-300 rounded-full h-1">
          <div
            className="absolute top-0 left-0 h-1 bg-green-400 rounded-full"
            style={{ width: `${(stagesCompleted / totalStages) * 100}%` }}
          ></div>

          <div className="relative flex justify-between">{bulletPoints}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container h-screen overflow-y-scroll mx-auto py-8 px-4 pb-28 bg-gradient rounded-lg shadow-md">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-white">Your Quests</h1>

          <Button
            onClick={handleCreateQuest}
            className="bg-slate-800 text-white hover:bg-black px-4 py-2 rounded-md"
          >
            Create Quest
          </Button>
        </header>

        {/* Quests Section */}
        {quests.length === 0 ? (
          <div className="flex justify-center">
            <p className="text-center text-gray-300 text-lg">
              No quests created yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quests.map((quest) => (
              <div key={quest.id} onClick={() => handleEditQuest(quest.id)}>
                <div className="bg-gray-900 p-4 rounded-lg border border-l-sky-50 text-black mb-1  group cursor-pointer hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-2xl text-gray-200 font-extrabold mb-1">
                        {quest.name || "Quest Name"}
                      </h2>
                      <p className="text-xs text-slate-200">
                        Stages: {quest.totalStages || "N/A"}
                      </p>
                      <p className="text-xs text-slate-200 flex items-center">
                        {quest.isActive ? "Active" : "Inactive"}
                        <span
                          className={`ml-2 w-3 h-3 rounded-full ${
                            quest.isActive
                              ? "bg-green-500 animate-pulse shadow-green-400 shadow-[0_0_8px]"
                              : "bg-gray-400"
                          }`}
                        ></span>
                      </p>
                    </div>
                    <div className="w-24 h-24 rounded-full bg-purple-100 flex justify-center items-center">
                      {quest.pictureUrl?.length > 0 ? (
                        <Image
                          src={quest.pictureUrl}
                          alt={quest.name}
                          width={24}
                          height={24}
                          objectFit={"contain"}
                          className="w-full h-full rounded-full"
                        />
                      ) : (
                        <span className="text-black">Picture</span>
                      )}
                    </div>
                  </div>
                  {renderProgressBar(quest.totalStages, quest.stagesCompleted)}
                  <p className="text-sm text-slate-200">
                    Tags: {quest.tag || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <TabBar />
    </>
  );
};

export default StudioPage;
