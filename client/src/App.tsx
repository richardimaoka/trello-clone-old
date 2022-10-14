import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import {
  cardAdding,
  draggedCardId,
  draggedListId,
  editScreenCardId,
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
          cardAdding: {
            read(_currentCacheValue, _options) {
              return cardAdding();
            },
          },
          overlaidCardId: {
            read(_currentCacheValue, _options) {
              return overlaidCardId();
            },
          },
          editScreenCardId: {
            read(_currentCacheValue, _options) {
              return editScreenCardId();
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
