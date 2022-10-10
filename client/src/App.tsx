import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import { cardAdding, cartItemsVar, draggedCard } from "./cache";
import { TrelloBoard } from "./TrelloBoard";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          draggedCard: {
            read(_currentCacheValue, _options) {
              return draggedCard();
            },
          },
          cardAdding: {
            read(_currentCacheValue, _options) {
              return cardAdding();
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
