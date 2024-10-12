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

    console.log(questsSnapshot.docs);
    if (!questsSnapshot.empty) {
      return questsSnapshot.docs.map((doc) => doc.data() as QuestsData);
    }

    return [];
  } catch (error) {
    console.error("Error fetching user quests: ", error);
    return [];
  }
};

export const getQuestData = async (
  questId: string
) => {
  try {
    const questQuery = query(
      collection(db, "quests"),
      where("id", "==", questId)
    );
    const questDoc = await getDocs(questQuery);

  
    if (!questDoc.empty) {
      const questDetail = questDoc.docs[0].data();

      return {
        id: questDetail.id,
        name: questDetail.name,
        pictureUrl: questDetail.pictureUrl,
        stagesCompleted: questDetail.stagesCompleted || 0,
        totalStages: questDetail.totalStages || 0,
        requiresConfirmation: questDetail.requiresConfirmation || false,
        requiresAnswerCheck: questDetail.requiresAnswerCheck || false,
        authorId: questDetail.authorId,
        tag: questDetail.tag,
        isActive: questDetail.isActive,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }


  } catch (e) {
    console.log("Error fetching user quest details: ", e);
  }
}


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
        pictureUrl: questData.pictureUrl,
      };
    }

    return null;
  } catch (e) {
    console.log(e);
  }
};
