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
import { UserData } from "@/types/user";

export const createUser = async (user: UserData) => {
  try {
    const userRef = doc(db, "users", uuid4());

    const userDoc = await getDocs(
      query(collection(db, "users"), where("id", "==", user.id))
    );
    if (!userDoc.empty) {
      return null;
    }

    const data = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      is_premium: user.is_premium,
      language_code: user.language_code,
      photo_url: user.photo_url ? user.photo_url : "",
      quests: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    console.log("Data", data);
    await setDoc(userRef, data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (userId: number | null | undefined) => {
  try {
    if(!userId) {
      return null;
    }

    const userQuery = query(
      collection(db, "users"),
      where("id", "==", userId)
    );

    const userDoc = await getDocs(userQuery);

    if (!userDoc.empty) {
      const userData = userDoc.docs[0].data();
      return {
        id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        quests: userData.quests,
        photo_url: userData.photo_url,
        language_code: userData.language_code,
        is_premium: userData.is_premium,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
      };
    }
  
    return null;
  } catch (e) {
    console.log(e);
  }
}
