import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import { cartItemsVar, draggedCard } from "./cache";
import { TrelloBoard } from "./TrelloBoard";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          draggedCard: {
            // Field policy for the draggedCard field
            read(currentCacheValue, { args, variables }) {
              console.log(
                "draggedCard read is called, currentCacheValue =",
                currentCacheValue,
                "draggedCard =",
                draggedCard()
              );
              // The read function for the draggedCard field
              return draggedCard();
              // return localStorage.getItem('CART').includes(
              //   variables.productId
              // );
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
