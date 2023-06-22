import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../utils/firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { myLogos } from "../styles/global";
import * as ImagePicker from "expo-image-picker";
import { createContext } from "react";

//Firebase functions
export async function createUserWithEmail(email: string, username: string,code:string) {
  const myDocument = doc(db, "PMCollection", email);
  const data = {
    code: code,
    username:username,
  };
  await setDoc(myDocument, data, { merge: true });
}

export async function addAccountPasswordToDB(
  email: string,
  accountTime :string,
  accountName: string,
  accountUserName: string,
  accountPassword: string,
  accountNotes: string
) {
  const myDoc = doc(db, `PMCollection/${email}/accounts`,accountTime);
  const data = {
    accountName: accountName,
    accountUserName: accountUserName,
    accountPassword: accountPassword,
    accountNotes: accountNotes,
    accountTime: accountTime,
  };
  await setDoc(myDoc,data,{merge:true})
}

export async function updateAccountPasswordToDB(
  email: string,
  accountTime: string,
  accountName: string,
  accountUserName: string,
  accountPassword: string,
  accountNotes: string
) {
  const myDoc = doc(db, `PMCollection/${email}/accounts`,accountTime);
  const data = {
    accountName: accountName,
    accountUserName: accountUserName,
    accountPassword: accountPassword,
    accountNotes: accountNotes,
    accountTime: accountTime
  };
  await setDoc(myDoc,data,{ merge: true })
}

export async function deleteAccountFromDB(email: string, docId: string) {
  const myDocument = doc(db, `PMCollection/${email}/accounts`, docId);
  await deleteDoc(myDocument);
}

export async function getAllAccountPasswordsFromDB(email: string) {
  const myCollection = collection(db, `PMCollection/${email}/accounts`);
  return (await getDocs(myCollection)).docs;
}

export async function getSingleAccountPasswordFromDB(
  email: string,
  docId: string
) {
  const myDocument = doc(db, `PMCollection/${email}/accounts`, docId);
  return (await getDoc(myDocument)).data();
}

export async function updateCode(email: string,code:string) {
  const myDocument = doc(db, "PMCollection", email);
  const data = {
    code: code,
  };
  await setDoc(myDocument, data, { merge: true });
}

export async function getUserData(email: string) {
  const myDocument = doc(db, "PMCollection", email);
  return await getDoc(myDocument);
}

export async function updateUserName(email: string,username:string) {
  const myDocument = doc(db, "PMCollection", email);
  const data={
    username:username,
  }
  await setDoc(myDocument,data,{merge:true});
}

//Local functions
export function findIcon(t: string) {
  for (const item in myLogos) {
    if (t.toLowerCase().includes(item)) {
      return myLogos[item as keyof typeof myLogos];
    }
  }
}

export const getLocalData = async (key: string) => {
  return await AsyncStorage.getItem(key);
  
};

//Image functions
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


export const emptyUser = {
  username: "",
  email: "",
  pin: "",
}

export const UserContext = createContext(emptyUser);
