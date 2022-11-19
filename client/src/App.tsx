import { ApolloProvider } from "@apollo/client";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import "./App.css";
import { createApolloClient } from "./client";
import { TrelloBoard } from "./TrelloBoard";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5pWosrlor2g9iptaB4wS3EdSosx0RuMM",
  authDomain: "richard-experiment.firebaseapp.com",
  projectId: "richard-experiment",
  storageBucket: "richard-experiment.appspot.com",
  messagingSenderId: "361941620193",
  appId: "1:361941620193:web:7018f959549fac47ddaea0",
  measurementId: "G-L7TJQEF3KQ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const apolloClient = createApolloClient();

const App = () => {
  connectAuthEmulator(auth, "http://localhost:9099");
  return (
    <ApolloProvider client={apolloClient}>
      <TrelloBoard />
    </ApolloProvider>
  );
};

export default App;
