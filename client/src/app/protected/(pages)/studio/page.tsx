// components/StudioPage.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { getUserQuests } from "@/lib/firebase/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { QuestsData } from "@/types/quest";

const StudioPage = ({ userId }: { userId: string }) => {
  const [quests, setQuests] = useState<QuestsData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchQuests = async () => {
      const userQuests = await getUserQuests(userId);
      setQuests(userQuests || []);
    };
    fetchQuests();
  }, [userId]);

  const handleCreateQuest = () => {
    router.push("/create-quest");
  };

  const handleEditQuest = (questId: string) => {
    router.push(`/edit-quest/${questId}`);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Your Quests</h1>
      {quests.length === 0 ? (
        <div className="flex justify-center">
          <Button onClick={handleCreateQuest}>Create Quest</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quests.map((quest) => (
            <Card
              key={quest.id}
              onClick={() => handleEditQuest(quest.id)}
              className="cursor-pointer hover:shadow-lg"
            >
              <CardContent>
                <h2 className="text-xl font-semibold">{quest.name}</h2>
                <p>{`Stages Completed: ${quest.stagesCompleted}/${quest.totalStages}`}</p>
                {quest.requiresConfirmation && <p>Confirmation Required</p>}
                {quest.requiresAnswerCheck && <p>Answer Check Required</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudioPage;
