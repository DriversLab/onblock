"use server";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { v4 as uuid4 } from "uuid";
import { db } from "@/lib/firebase/firebase";
import { QuestsData } from "@/types/quest";
// import { UserData } from "@/types/user";

// export const getUserQuests = async (quest: QuestsData, user: UserData) => {
//     try{
//         const
//     }
// };

export const createQuest = async (quest: QuestsData) => {
  try {
    const questRef = doc(db, "quests", uuid4());

    const questDoc = await getDocs(
      query(collection(db, "quests"), where("id", "==", quest.id))
    );
    if (!questDoc.empty) {
      return null;
    }

    const data = {
      id: quest.id,
      name: quest.name,
      stagesCompleted: quest.stagesCompleted || 0,
      totalStages: quest.totalStages || 0,
      requiresConfirmation: quest.requiresConfirmation || false,
      requiresAnswerCheck: quest.requiresAnswerCheck || false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    console.log("Quest Data", data);
    await setDoc(questRef, data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getQuest = async (questId: string | null | undefined) => {
  try {
    if (!questId) {
      return null;
    }

    const questQuery = query(
      collection(db, "quests"),
      where("id", "==", questId)
    );

    const questDoc = await getDocs(questQuery);

    if (!questDoc.empty) {
      const questData = questDoc.docs[0].data();
      return {
        id: questData.id,
        name: questData.name,
        stagesCompleted: questData.stagesCompleted,
        totalStages: questData.totalStages,
        requiresConfirmation: questData.requiresConfirmation,
        requiresAnswerCheck: questData.requiresAnswerCheck,
        created_at: questData.created_at,
        updated_at: questData.updated_at,
      };
    }

    return null;
  } catch (e) {
    console.log(e);
  }
};
