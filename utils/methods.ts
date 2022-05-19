import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../utils/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const getLocalData = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  if (value !== null) {
    return value;
  }
};

export function createUserWithEmail(email: string, username: string) {
  const myDocument = doc(db, "PMCollection", email);
  const data = {
    username: username,
    code: "",
  };
  setDoc(myDocument, data, { merge: true });
}

export function generateCode(email: string) {
  const myDocument = doc(db, "PMCollection", email);
  const val = Math.floor(100000 + Math.random() * 900000);
  const data = {
    code: val,
  };
  setDoc(myDocument, data, { merge: true });
  return val;
}

export async function getUserData(email: string) {
  const myDocument = doc(db, "PMCollection", email);
  return await getDoc(myDocument);
}
