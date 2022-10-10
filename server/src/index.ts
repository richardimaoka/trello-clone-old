import { ApolloServer, gql } from "apollo-server";
import * as fs from "fs";
import { CardInput, Query, Resolvers } from "./generated/graphql";

const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat("/../schema.gql"), "utf8")}
`;

interface LoadingDataContext {
  Query: Query;
}

//const resolvers: Resolvers<LoadingDataContext> = {
const resolvers = {
  Query: {
    lists: async (_parent: any, _args: any, context: any, _info: any) => {
      return context.Query.lists;
    },
  },
  Mutation: {
    addCardToList: async (
      _parent: any,
      { listId, card }: any,
      _context: any
    ) => {
      console.log("addCardToList");
      const lists = _context.Query.lists;
      const listToUpdate = lists.find((elem: any) => elem.id === listId);
      if (listToUpdate) {
        card["id"] = "abcede";
        const newCard = Object.assign({}, card); // to fix toString() [Object: null prototype] problem
        listToUpdate.cards.push(newCard);
        console.log(typeof newCard);
        console.log(listToUpdate);
      }
    },
  },
  // List: {
  //   id: async (parent, _args, _content, _info) => {
  //     return parent.id;
  //   },
  //   title: async (parent, _args, _content, _info) => {
  //     return parent.title;
  //   },
  //   maxNumCards: async (parent, _args, _content, _info) => {
  //     return parent.maxNumCards;
  //   },
  //   cards: async (parent, _args, _content, _info) => {
  //     return parent.cards;
  //   },
  // },
  // Card: {
  //   title: async (parent, _args, _content, _info) => {
  //     return parent.title;
  //   },
  //   description: async (parent, _args, _content, _info) => {
  //     return parent.description;
  //   },
  //   labels: async (parent, _args, _content, _info) => {
  //     return parent.labels;
  //   },
  // },
};

const readJsonFileSync = (relativeFileName: string): Promise<any> => {
  const jsonDataFile = __dirname.concat(relativeFileName);
  const fileContent = fs.readFileSync(jsonDataFile, "utf8");
  const jsonData = JSON.parse(fileContent);
  return jsonData;
};

//throws on error
const queryDataSync = readJsonFileSync("/../data/Query.json");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { Query: queryDataSync },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
