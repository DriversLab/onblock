"use client";

import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createQuest } from "@/lib/firebase/api";
import { QuestsData } from "@/types/quest";
import Image from "next/image";

const CreateQuestPage = () => {
  const [questName, setQuestName] = useState("");
  const [tag, setTag] = useState("");
  const [totalStages, setTotalStages] = useState<number | "">("");
  const [requiresConfirmation, setRequiresConfirmation] = useState(false);
  const [requiresAnswerCheck, setRequiresAnswerCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [pictureUrl, setPictureUrl] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const user = WebApp.initDataUnsafe?.user;
    if (user) {
      setUserId(user.id);
    } else {
      console.log("No Telegram Web App user detected");
    }
  }, []);

  const handleCreateQuest = async () => {
    setIsLoading(true);

    const newQuest: QuestsData = {
      id: new Date().getTime().toString(),
      name: questName,
      totalStages,
      stagesCompleted: 0,
      requiresConfirmation,
      requiresAnswerCheck,
      isActive,
      tag,
      pictureUrl,
    };

    try {
      const result = await createQuest(newQuest);
      if (result) {
        router.push("protected/studio");
      } else {
        alert("Failed to create the quest. It might already exist.");
      }
    } catch (error) {
      console.error("Error creating quest: ", error);
      alert("An error occurred while creating the quest.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderProgressBar = () => {
    if (!totalStages || totalStages <= 0) return null;

    const bulletPoints = [];
    for (let i = 0; i < totalStages; i++) {
      bulletPoints.push(
        <span
          key={i}
          className="absolute top-[-2px] w-2 h-2 bg-green-500 rounded-full"
          style={{
            left: `${(i / (totalStages - 1)) * 100}%`,
            transform: `translateX(-50%)`,
          }}
        ></span>
      );
    }

    return (
      <div className="relative mb-3">
        <div className="relative w-full bg-gray-300 rounded-full h-1">
          <div
            className="absolute top-0 left-0 h-1 bg-green-500 rounded-full"
            style={{ width: `${(1 / totalStages) * 100}%` }}
          ></div>

          <div className="relative flex justify-between">{bulletPoints}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-10 px-4 rounded-lg shadow-lg md-10 pb-28">
      <div className="bg-gradient-to-b from-slate-400 to-slate-800 p-4 rounded-lg shadow-md text-black mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">{questName || "Name"}</h2>
            <p className="text-sm text-slate-900  ">{userId || "Id: id"}</p>
            <p className="text-sm text-slate-900">
              Stages: {totalStages || "total stages"}
            </p>
            <p className="text-sm text-slate-900 flex items-center">
              {isActive ? "Active" : "Disabled"}
              <span
                className={`ml-2 w-3 h-3 rounded-full ${
                  isActive
                    ? "bg-green-500 animate-pulse shadow-green-400 shadow-[0_0_8px]"
                    : "bg-gray-400"
                }`}
              ></span>
            </p>
          </div>
          <div className="w-48 h-24 bg-purple-100 flex justify-center items-center">
            {pictureUrl.length > 0 ? (
              <Image
                src={pictureUrl}
                alt="Quest"
                width={48}
                height={24}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <span className="text-black">Picture</span>
            )}
          </div>
        </div>
        {renderProgressBar()}
        <p className="text-base text-slate-900">{tag || "Tag: tag"}</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md text-black">
        <div className="mb-6">
          <label
            className="block text-gray-700 mb-2 font-semibold"
            htmlFor="questName"
          >
            Quest Name
          </label>
          <input
            type="text"
            id="questName"
            value={questName}
            onChange={(e) => setQuestName(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 mb-2 font-semibold"
            htmlFor="tag"
          >
            Tag
          </label>
          <input
            type="text"
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 mb-2 font-semibold"
            htmlFor="totalStages"
          >
            Total Stages
          </label>
          <input
            type="number"
            id="totalStages"
            value={totalStages === "" ? "" : totalStages}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setTotalStages(
                isNaN(value) ? "" : Math.min(Math.max(0, value), 20)
              );
            }}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            min="0"
            max="20"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 mb-2 font-semibold"
            htmlFor="pictureUrl"
          >
            Picture URL
          </label>
          <input
            type="url"
            id="pictureUrl"
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            placeholder="https://example.com/picture.jpg"
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
              className="mr-2"
            />
            <span className="text-gray-700">Is Active</span>
          </label>
        </div>
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="requiresConfirmation"
              checked={requiresConfirmation}
              onChange={() => setRequiresConfirmation(!requiresConfirmation)}
              className="mr-2"
            />
            <span className="text-gray-700">Requires Confirmation</span>
          </label>
        </div>
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="requiresAnswerCheck"
              checked={requiresAnswerCheck}
              onChange={() => setRequiresAnswerCheck(!requiresAnswerCheck)}
              className="mr-2"
            />
            <span className="text-gray-700">Requires Answer Check</span>
          </label>
        </div>

        <Button
          onClick={handleCreateQuest}
          className="w-full bg-slate-800 text-white hover:bg-black transition duration-200 ease-in-out px-4 py-3 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Quest"}
        </Button>
      </div>
    </div>
  );
};

export default CreateQuestPage;
