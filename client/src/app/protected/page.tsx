"use client";

import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllQuests } from "@/lib/firebase/api";
import { Button } from "@/components/ui/button";
import { QuestsData } from "@/types/quest";
import { Loading } from "@/components/atoms";
import { Card, CardContent } from "@/components/ui/card";
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

  return (
    <div className="container max-h-screen overflow-y-scroll mx-auto py-8 px-4 pb-28 bg-gradient rounded-lg shadow-md">
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
            <Card
              key={quest.id}
              className="cursor-pointer hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg p-4 shadow-md"
            >
              <CardContent>
                <Image
                  src={quest.pictureUrl || "/default-picture.png"}
                  alt={quest.name}
                  width={100}
                  height={100}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {quest.name}
                </h2>
                <p className="text-sm text-gray-500 mb-1">{`Tag: ${
                  quest.tag || "N/A"
                }`}</p>
                <p className="text-sm">
                  {quest.isActive ? "Status: Active" : "Status: Inactive"}
                </p>
              </CardContent>
            </Card>
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
