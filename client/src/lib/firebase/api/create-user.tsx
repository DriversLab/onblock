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

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

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
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await setDoc(userRef, data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
