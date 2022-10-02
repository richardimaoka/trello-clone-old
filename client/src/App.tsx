import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import { TrelloBoard } from "./TrelloBoard";

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
            read(_, { variables }) {
              // The read function for the draggedCard field
              return 1;
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

export const App = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <TrelloBoard />
    </ApolloProvider>
  );
};
