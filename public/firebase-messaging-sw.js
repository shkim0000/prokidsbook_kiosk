// public/firebase-messaging-sw.js


importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyAPt7nInZj0bc0B5alJWn8FtullIWMIOXE",
    authDomain: "kobook.firebaseapp.com",
    projectId: "kobook",
    storageBucket: "kobook.appspot.com",
    messagingSenderId: "20941344395",
    appId: "1:20941344395:web:11376c9d3601f011040e8e",
    measurementId: "G-2KWMP5C4JJ"
});

const messaging = firebase.messaging();
