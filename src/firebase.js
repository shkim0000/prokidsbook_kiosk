// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// ✅ 본인의 Firebase 콘솔에서 이 설정 복사
const firebaseConfig = {
    apiKey: "AIzaSyAPt7nInZj0bc0B5alJWn8FtullIWMIOXE",
    authDomain: "kobook.firebaseapp.com",
    projectId: "kobook",
    storageBucket: "kobook.appspot.com",
    messagingSenderId: "20941344395",
    appId: "1:20941344395:web:11376c9d3601f011040e8e",
    measurementId: "G-2KWMP5C4JJ"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { messaging, getToken, onMessage,auth,db };
