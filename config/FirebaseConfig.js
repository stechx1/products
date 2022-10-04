import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1oGMRylQUMYlUvK90Z1Tmfwq0S3UluTU",
  authDomain: "products-c26e6.firebaseapp.com",
  projectId: "products-c26e6",
  storageBucket: "products-c26e6.appspot.com",
  messagingSenderId: "549221687475",
  appId: "1:549221687475:web:12c9106fd41f519af6d0c6"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
