import type { AppProps } from "next/app";
import React from "react";
import { FirebaseContext, app, auth } from "../components/FirebaseContext";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <FirebaseContext.Provider value={{ app, auth }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default App;
