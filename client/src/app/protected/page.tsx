"use client";

import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllQuests } from "@/lib/firebase/api";
import { Button } from "@/components/ui/button";
import { QuestsData } from "@/types/quest";
import { Loading } from "@/components/atoms";
import Image from "next/image";

const MainPage = () => {
  const [quests, setQuests] = useState<QuestsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = WebApp.initDataUnsafe?.user;
    if (user) {
      const fetchQuests = async () => {
        try {
          const allQuests = await getAllQuests();
          setQuests(allQuests || []);
        } catch (error) {
          console.error("Error fetching quests:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchQuests();
    } else {
      console.log("No Telegram Web App user detected");
      setIsLoading(false);
    }
  }, []);

  const handleNavigateToStudio = () => {
    router.push("protected/studio");
  };

  const filteredQuests = quests.filter(
    (quest) =>
      quest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quest.tag?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderProgressBar = (totalStages: number) => {
    if (!totalStages || totalStages <= 0) return null;

    const bulletPoints = [];
    for (let i = 0; i < totalStages; i++) {
      bulletPoints.push(
        <span
          key={i}
          className="absolute top-[-2px] w-2 h-2 bg-green-700 rounded-full"
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
            style={{ width: `${(1 / totalStages) * 100}%` }}
          ></div>

          <div className="relative flex justify-between">{bulletPoints}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="container h-screen overflow-y-scroll mx-auto py-8 px-4 pb-28 bg-gradient rounded-lg shadow-md">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">OnBlock</h1>

        <Button
          onClick={handleNavigateToStudio}
          className="bg-slate-800 text-white hover:bg-black px-4 py-2 rounded-md"
        >
          Studio
        </Button>
      </header>

      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search quests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Quests Section */}
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loading />
        </div>
      ) : filteredQuests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuests.map((quest) => (
            <div key={quest.id}>
              <div className="bg-gray-900 p-4 rounded-lg border border-l-sky-50 text-black mb-1 group">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-2xl text-gray-200 font-extrabold mb-1">
                      {quest.name || "Name"}
                    </h2>
                    <p className="text-xs text-slate-200 ">{quest.authorId}</p>
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
                  <div className="w-24 h-24 mr-8 rounded-full bg-purple-100 flex justify-center items-center">
                    {
                      <Image
                        src={quest.pictureUrl}
                        alt="Quest"
                        width={24}
                        height={24}
                        objectFit={"contain"}
                        className="w-full h-full object-fill rounded-full"
                      />
                    }
                  </div>
                </div>
                {renderProgressBar(quest.totalStages)}
                <p className="text-sm text-slate-200">Tags: {quest.tag}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-300 text-lg">
          There are no quests yet
        </p>
      )}
    </div>
  );
};

export default MainPage;
