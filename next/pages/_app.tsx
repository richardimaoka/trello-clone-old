import type { AppProps } from "next/app";
import React from "react";
import {
  FirebaseContext,
  app,
  auth,
  googleAuthProvider,
} from "../components/FirebaseContext";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <FirebaseContext.Provider value={{ app, auth, googleAuthProvider }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default App;
