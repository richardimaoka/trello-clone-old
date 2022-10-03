import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AddToCartButton } from "./AddToCartButton";
import "./App.css";
import { cartItemsVar } from "./cache";
import { Cart } from "./Cart";

const client = new ApolloClient({
  uri: "https://flyby-gateway.herokuapp.com/",
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
      <h2>My first Apollo app 🚀</h2>
      <br />
      <AddToCartButton productId={20} />
      <Cart />
    </ApolloProvider>
  );
};

export default App;
