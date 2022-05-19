import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJ9FP-bKgkK2RyQoVyb9_Am_XgKq3Iqt0",
  authDomain: "password-manager-5bffb.firebaseapp.com",
  databaseURL:
    "https://password-manager-5bffb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "password-manager-5bffb",
  storageBucket: "password-manager-5bffb.appspot.com",
  messagingSenderId: "246731465442",
  appId: "1:246731465442:web:ee17188bee8888e29434bb",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
