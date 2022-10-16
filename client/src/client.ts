import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  controlVariable,
  draggedCardId,
  draggedListId,
  overlaidCardId,
} from "./cache";

export const createApolloClient = () => {
  return new ApolloClient({
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
                return controlVariable();
              },
            },
          },
        },
      },
    }),
  });
};
