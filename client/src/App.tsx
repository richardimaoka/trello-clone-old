import { ApolloProvider } from "@apollo/client";
import "./App.css";
import { createApolloClient } from "./client";
import { TrelloBoard } from "./TrelloBoard";

const client = createApolloClient();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <TrelloBoard />
    </ApolloProvider>
  );
};

export default App;
