import { ApolloServer, gql } from "apollo-server";
import * as fs from "fs";
import { Query, Resolvers } from "./generated/graphql";

const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat("/../schema.gql"), "utf8")}
`;

interface LoadingDataContext {
  Query: Query;
}

const resolvers: Resolvers<LoadingDataContext> = {
  Query: {
    hello: async (_parent, _args, context, _info) => {
      return context.Query.hello;
    },
    search: async (_parent, _args, context, _info) => {
      return context.Query.search;
    },
  },
  Employee: {
    name: async (parent, _args, _content, _info) => {
      return parent.name;
    },
    jobTitle: async (parent, _args, _content, _info) => {
      return parent.jobTitle;
    },
    department: async (parent, _args, _content, _info) => {
      return parent.department;
    },
  },
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
