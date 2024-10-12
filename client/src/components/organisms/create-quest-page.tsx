"use client";

import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createQuest } from "@/lib/firebase/api";
import { QuestsData } from "@/types/quest";
import Image from "next/image";
import { TabBar } from "../molecules";
import { useContract } from "../../lib/hooks/use-contract";

const CreateQuestPage = () => {
  const [questName, setQuestName] = useState("");
  const [tag, setTag] = useState<string>("");
  const [totalStages, setTotalStages] = useState<number | "">("");
  const [requiresConfirmation, setRequiresConfirmation] = useState(false);
  const [requiresAnswerCheck, setRequiresAnswerCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [pictureUrl, setPictureUrl] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [isPaid, setIsPaid] = useState(false); // To track if payment is completed

  const { receiveFunds } = useContract();
  const router = useRouter();

  const handleReceiveFunds = async () => {
    if (userId === null) return;

    try {
      await receiveFunds();
      setIsPaid(true);
      alert("Payment received! You can now create the quest.");
    } catch (error) {
      console.error("Error receiving funds: ", error);
      alert("Payment failed, please try again.");
    }
  };

  useEffect(() => {
    const user = WebApp.initDataUnsafe?.user;
    if (user) {
      setUserId(user.id);
    } else {
      console.log("No Telegram Web App user detected");
    }
  }, []);

  // Prevent quest creation if payment is not done
  const handleCreateQuest = async () => {
    if (!isPaid) {
      alert("You must pay before creating the quest.");
      return;
    }

    if (!userId) {
      return null;
    }

    setIsLoading(true);

    const newQuest: QuestsData = {
      id: new Date().getTime().toString(),
      name: questName,
      totalStages: Number(totalStages) || 0,
      stagesCompleted: 0,
      requiresConfirmation,
      requiresAnswerCheck,
      isActive,
      tag,
      pictureUrl,
      authorId: userId.toString(),
    };

    try {
      const result = await createQuest(newQuest);
      if (result) {
        router.back();
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
          className="absolute top-[-2px] w-2 h-2 bg-green-700 rounded-full"
          style={{
            left: `${(i / (totalStages - 1)) * 100}%`,
            transform: `translateX(-50%)`,
          }}
        ></span>
      );
    }

    return (
      <div className="relative mb-4 mt-1">
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
    <>
      <div className="container mx-auto py-10 px-4 rounded-lg shadow-lg md-10 pb-28">
        <div className="bg-gray-900 p-4 rounded-lg border border-l-sky-50 text-black mb-8 group">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl text-gray-200 font-extrabold mb-1">
                {questName || "Name"}
              </h2>
              <p className="text-xs text-slate-200 "># {userId || "Id: id"}</p>
              <p className="text-xs text-slate-200">
                Stages: {totalStages || "total stages"}
              </p>
              <p className="text-xs text-slate-200 flex items-center">
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
            <div className="w-24 h-24 mr-8 rounded-full bg-purple-100 flex justify-center items-center">
              {pictureUrl.length > 0 ? (
                <Image
                  src={pictureUrl}
                  alt="Quest"
                  width={24}
                  height={24}
                  objectFit={"contain"}
                  quality={100}
                  priority
                  className="w-full h-full rounded-full"
                />
              ) : (
                <span className="text-black">Picture</span>
              )}
            </div>
          </div>
          {renderProgressBar()}
          <p className="text-sm text-slate-200">Tags: {tag || "tag"}</p>
        </div>

        <div className="bg-gradient-to-b from-slate-800 to-slate-950 p-8 rounded-lg shadow-md text-black">
          <div className="mb-6">
            <label
              className="block text-white mb-2 font-semibold"
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
              className="block text-white mb-2 font-semibold"
              htmlFor="tag"
            >
              Tag
            </label>
            <input
              type="text"
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full px-4 py-3 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-white mb-2 font-semibold"
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
              className="block text-white mb-2 font-semibold"
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
              <span className="text-white">Is Active</span>
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
              <span className="text-white">Requires Confirmation</span>
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
              <span className="text-white">Requires Answer Check</span>
            </label>
          </div>

          <Button
            onClick={async () => {
              if (!isPaid) {
                await handleReceiveFunds();
              }

              if (isPaid) {
                await handleCreateQuest();
              }
            }}
            className="w-full bg-slate-700 text-white hover:bg-slate-900 transition duration-200 ease-in-out px-4 py-3 rounded-md"
            disabled={isLoading}
          >
            {isLoading
              ? "Processing..."
              : isPaid
              ? "Create Quest"
              : "Pay & Create Quest"}
          </Button>
        </div>
      </div>
      <TabBar />
    </>
  );
};

export default CreateQuestPage;
