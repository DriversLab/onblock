/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Loading } from "../atoms";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

import { getQuestData } from "@/lib/firebase/api/create-quest";
import { QuestsData } from "@/types/quest";

const QuestPage = () => {
  const params = useSearchParams();
  const questId = params.get("questId");
  const router = useRouter();

  const [questInfo, setQuestInfo] = useState<QuestsData | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!questId) {
        return null;
      }
      const res = await getQuestData(questId!);

      console.log("Res", res);
      setQuestInfo(res as any);
      setIsLoading(false);
    };

    void fetchData();
  }, [questId]);

  const navigateBack = () => router.back();

  if (loading) {
    return (
      <div
        className={"container min-h-screen flex justify-center items-center"}
      >
        <Loading />
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen pb-26 pt-10 px-5">
      <div className="w-full flex flex-row justify-between items-center">
        <ArrowLeft onClick={navigateBack} className="cursor-pointer" />
      </div>
      <div className="mt-10 w-full flex justify-center items-center">
        <Image
          src={questInfo?.pictureUrl || ""}
          alt="Quest"
          width={100}
          height={100}
          objectFit={"contain"}
          quality={100}
          priority
          className="w-[100px] h-[100px] rounded-full"
        />
      </div>

      <div className="mt-10 flex flex-col items-center justify-center w-full">
        <div className="w-full flex justify-between items-center">
          <span>{questInfo?.name}</span>
        </div>
        <div className="mt-5 w-full flex justify-between items-center">
          <span>Author ID</span>
          <span>{questInfo?.authorId}</span>
        </div>
        <div className="mt-5 w-full flex justify-between items-center">
          <span>Tag</span>
          <span>{questInfo?.tag}</span>
        </div>
        <div className="mt-5 w-full flex justify-between items-center">
          <span>Is Quest Active</span>
          <span>{questInfo?.isActive ? "Yes" : "No"}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestPage;
