import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AddToCartButton } from "./AddToCartButton";
import "./App.css";
import { cartItemsVar, draggedCard } from "./cache";
import { Cart } from "./Cart";
import { TrelloBoard } from "./TrelloBoard";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          cartItems: {
            read(currentValue) {
              console.log(
                "cartItems read called: currentValue =",
                currentValue,
                "cartItemVar =",
                cartItemsVar()
              );
              return cartItemsVar();
            },
          },
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
      // Type policy map
      Product: {
        fields: {
          // Field policy map for the Product type
          isInCart: {
            // Field policy for the isInCart field
            read(_, { variables }) {
              // The read function for the isInCart field
              return null; //localStorage.getItem("CART").includes(variables.productId);
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
      <AddToCartButton productId={20} />
      <Cart />
      <TrelloBoard />
    </ApolloProvider>
  );
};

export default App;
