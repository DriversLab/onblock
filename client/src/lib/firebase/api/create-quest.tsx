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

export const getAllQuests = async (): Promise<QuestsData[] | null> => {
  try {
    const questsSnapshot = await getDocs(collection(db, "quests"));

    if (!questsSnapshot.empty) {
      return questsSnapshot.docs.map((doc) => doc.data() as QuestsData);
    }

    return null;
  } catch (error) {
    console.error("Error fetching all quests: ", error);
    return null;
  }
};
export const getUserQuests = async (
  userId: string
): Promise<QuestsData[] | null> => {
  try {
    console.log("UserId", userId);
    const questsQuery = query(
      collection(db, "quests"),
      where("authorId", "==", userId)
    );
    const questsSnapshot = await getDocs(questsQuery);

    if (!questsSnapshot.empty) {
      return questsSnapshot.docs.map((doc) => doc.data() as QuestsData);
    }

    return null;
  } catch (error) {
    console.error("Error fetching user quests: ", error);
    return null;
  }
};

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
      pictureUrl: quest.pictureUrl,
      stagesCompleted: quest.stagesCompleted || 0,
      totalStages: quest.totalStages || 0,
      requiresConfirmation: quest.requiresConfirmation || false,
      requiresAnswerCheck: quest.requiresAnswerCheck || false,
      authorId: quest.authorId,
      tag: quest.tag,
      isActive: quest.isActive,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

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
        isActive: questData.isActive,
        tag: questData.tag,
        pictureUrl: questData.pictureUrl,
      };
    }

    return null;
  } catch (e) {
    console.log(e);
  }
};
