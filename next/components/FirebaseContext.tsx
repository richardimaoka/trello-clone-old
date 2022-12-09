// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";

import React from "react";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyD5pWosrlor2g9iptaB4wS3EdSosx0RuMM",
  authDomain: "richard-experiment.firebaseapp.com",
  projectId: "richard-experiment",
  storageBucket: "richard-experiment.appspot.com",
  messagingSenderId: "361941620193",
  appId: "1:361941620193:web:7018f959549fac47ddaea0",
  measurementId: "G-L7TJQEF3KQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

connectAuthEmulator(auth, "http://localhost:9099");
console.log("connected to the auth emulator");

export interface FireabaseSettings {
  app: FirebaseApp;
  auth: Auth;
}

export const FirebaseContext = React.createContext<FireabaseSettings>({
  app,
  auth,
});
