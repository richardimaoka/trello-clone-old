import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import { TrelloBoard } from "./TrelloBoard";
import { draggedCard } from "./Cache";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {
      // Type policy map
      Query: {
        fields: {
          // Field policy map for the Query type
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
          // fullName: {
          //   read(
          //     full_name = {
          //       first_name: "UNKNOWN FIRST_NAME",
          //       last_name: "UNKNOWN LAST_NAME",
          //     }
          //   ) {
          //     console.log("fullName read is called", { ...full_name });
          //     return { ...full_name };
          //   },
          // },
          // lists: {
          //   read(currentValue) {
          //     console.log("list read is called", currentValue);
          //     return currentValue;
          //   },
          // },
        },
      },
    },
  }),
});

export const App = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <TrelloBoard />
    </ApolloProvider>
  );
};
