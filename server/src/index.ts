import { ApolloServer, gql } from "apollo-server";
import * as fs from "fs";
import { Query, Resolvers } from "./generated/graphql";

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

const readJsonFile = async (relativeFileName: string): Promise<any> => {
  const jsonDataFile = __dirname.concat(relativeFileName);
  const fileContent = await fs.promises.readFile(jsonDataFile, "utf8");
  const jsonData = JSON.parse(fileContent);
  return jsonData;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: any) => {
    try {
      const queryData: LoadingDataContext = await readJsonFile(
        "/../data/Query.json"
      );
      return { Query: queryData };
    } catch (err) {
      console.log("***ERROR OCURRED***");
      console.log(err);
      throw new Error("internal error happened!!");
    }
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
