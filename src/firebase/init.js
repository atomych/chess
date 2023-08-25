import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC7EGhMuaduFURR9N6nsvrvw1WOcPEbp1o",
  authDomain: "chess-8beeb.firebaseapp.com",
  projectId: "chess-8beeb",
  storageBucket: "chess-8beeb.appspot.com",
  messagingSenderId: "719894571032",
  appId: "1:719894571032:web:e3864e7274b1df82cafb6d",
};

const app = initializeApp(firebaseConfig);

export { app, firebaseConfig };
