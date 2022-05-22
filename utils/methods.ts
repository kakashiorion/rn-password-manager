import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../utils/firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { myLogos } from "../styles/global";
import * as ImagePicker from "expo-image-picker";

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

export function addAccountPasswordToDB(
  email: string,
  accountName: string,
  accountUserName: string,
  accountPassword: string,
  accountNotes: string
) {
  const myDocument = doc(db, `PMCollection/${email}/passwords`, accountName);
  const data = {
    accountName: accountName,
    accountUserName: accountUserName,
    accountPassword: accountPassword,
    accountNotes: accountNotes,
  };
  return setDoc(myDocument, data, { merge: true });
}

export function deleteAccountFromDB(email: string, accountName: string) {
  const myDocument = doc(db, `PMCollection/${email}/passwords`, accountName);
  deleteDoc(myDocument);
}

export async function getAllAccountPasswordsFromDB(email: string) {
  const myCollection = collection(db, `PMCollection/${email}/passwords`);
  return (await getDocs(myCollection)).docs;
}

export async function getSingleAccountPasswordFromDB(
  email: string,
  accountName: string
) {
  const myDocument = doc(db, `PMCollection/${email}/passwords`, accountName);
  return (await getDoc(myDocument)).data();
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

export function findIcon(t: string) {
  for (const item in myLogos) {
    if (t.toLowerCase().includes(item)) {
      return myLogos[item as keyof typeof myLogos];
    }
  }
}

export async function openImagePickerAsync() {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync();
  return pickerResult;
}
