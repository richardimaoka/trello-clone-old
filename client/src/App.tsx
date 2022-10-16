import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import {
  controlVariable,
  draggedCardId,
  draggedListId,
  overlaidCardId,
} from "./cache";
import { TrelloBoard } from "./TrelloBoard";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          draggedCardId: {
            read(_currentCacheValue, _options) {
              return draggedCardId();
            },
          },
          draggedListId: {
            read(_currentCacheValue, _options) {
              return draggedListId();
            },
          },
          overlaidCardId: {
            read(_currentCacheValue, _options) {
              return overlaidCardId();
            },
          },
          controlVariable: {
            read(_currentCacheValue, _options) {
              console.log(controlVariable());
              return controlVariable();
            },
          },
        },
      },
    },
  }),
});

const Internal = () => <div>internal</div>;

const App = () => {
  return (
    <ApolloProvider client={client}>
      <TrelloBoard />
    </ApolloProvider>
  );
};

export default App;
