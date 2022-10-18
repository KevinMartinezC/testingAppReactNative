import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";



const firebaseConfig = {

  apiKey: "AIzaSyB5HmDHt99-Qt-x7CHUEU1UrcZncqMahyA",

  authDomain: "myfoodapp-7f515.firebaseapp.com",

  projectId: "myfoodapp-7f515",

  storageBucket: "myfoodapp-7f515.appspot.com",

  messagingSenderId: "1083374279689",

  appId: "1:1083374279689:web:c9d4873687cc913a6aacd8"

};

export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase);