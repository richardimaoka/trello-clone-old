import { ApolloClient, InMemoryCache } from "@apollo/client";
import { controlVariable } from "./cache";

export const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
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
};
