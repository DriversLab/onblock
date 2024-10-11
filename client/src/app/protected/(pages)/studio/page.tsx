"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserQuests } from "@/lib/firebase/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuestsData } from "@/types/quest";

const StudioPage = ({ userId }: { userId: string }) => {
  const [quests, setQuests] = useState<QuestsData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchQuests = async () => {
      const userQuests = await getUserQuests(userId);
      setQuests(userQuests || []);
      console.log(userQuests);
    };
    fetchQuests();
  }, [userId]);

  const handleCreateQuest = () => {
    router.push("studio/[create-quest]");
  };

  const handleEditQuest = (questId: string) => {
    router.push(`protected/edit-quest/${questId}`);
  };

  return (
    <div className="container h-screen mx-auto py-8 px-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Your Quests</h1>
        <Button
          onClick={handleCreateQuest}
          className="bg-slate-800 text-white hover:bg-black px-4 py-2 rounded-md"
        >
          Create Quest
        </Button>
      </div>

      {quests.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-center text-gray-300">No quests created yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest) => (
            <Card
              key={quest.id}
              onClick={() => handleEditQuest(quest.id)}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default StudioPage;
