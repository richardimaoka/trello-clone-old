import { ApolloServer, gql } from "apollo-server";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { Card } from "./../../client/src/generated/graphql";
import { nonNullArray } from "./nonNullArray";
import {
  List,
  MutationResolvers,
  Query,
  QueryResolvers,
} from "./generated/graphql";

const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat("/../schema.gql"), "utf8")}
`;

interface LoadingDataContext {
  Query: Query;
}

const queryResolvers: QueryResolvers<LoadingDataContext> = {
  lists: async (_parent, _args, context, _info) => {
    return context.Query.lists;
  },
  card: async (_parent, args, context, _info) => {
    if (!context.Query.lists) throw new Error("there is no list at all");

    const cards = context.Query.lists
      .map((list) => (list?.cards ? nonNullArray(list.cards) : []))
      .flat();

    const card = cards.find((c) => c.id === args.id);
    if (!card) throw new Error(`no such card with id = ${args.id}`);
    return card;
  },
};

const mutationResolvers: MutationResolvers<LoadingDataContext> = {
  addCardToList: async (_parent, args, _context) => {
    // console.log("addCardToList");
    const lists = _context.Query.lists;
    if (!lists) throw new Error("empty lists in Query");

    const listToUpdate = lists.find(
      (elem: List | null) => elem && elem.id === args.listId
    );
    if (!listToUpdate)
      throw new Error(`listId = ${args.listId} does not exist`);

    const card = Object.assign({ id: uuidv4() }, args.card) as Card;
    if (!listToUpdate.cards) listToUpdate.cards = [card];
    else listToUpdate.cards.push(card);

    console.log(
      `card { title: ${card.title} } is added to list { title: ${listToUpdate.title} }`
    );

    return 10;
  },

  swapCardsWithinList: async (_parent, args, _context) => {
    // console.log("swapCardsWithinList");
    const lists = _context.Query.lists;
    if (!lists) throw new Error("empty lists in Query");

    const listToUpdate = lists.find((elem: any) => elem.id === args.listId);
    if (!listToUpdate)
      throw new Error(`listId = ${args.listId} does not exist`);

    const cardsToUpdate = listToUpdate.cards;
    if (!cardsToUpdate) throw new Error(`listId = ${args.listId} has no card`);

    const card1Index = cardsToUpdate.findIndex(
      (elem) => elem?.id === args.card1Id
    );
    if (card1Index === -1)
      throw new Error(
        `card1Id = ${args.card1Id} does not exist in listId = ${args.listId}`
      );

    const card2Index = cardsToUpdate.findIndex(
      (elem) => elem?.id === args.card2Id
    );
    if (card2Index === -1)
      throw new Error(
        `card2Id = ${args.card2Id} does not exist in listId = ${args.listId}`
      );

    const card1 = cardsToUpdate[card1Index];
    const card2 = cardsToUpdate[card2Index];
    cardsToUpdate[card1Index] = card2;
    cardsToUpdate[card2Index] = card1;

    return 1;
  },

  swapCardsBetweenLists: async (_parent, args, _context) => {
    // console.log("swapCardsBetweenLists");
    const lists = _context.Query.lists;
    if (!lists) throw new Error("empty lists in Query");

    const list1 = lists.find((elem: any) => elem.id === args.list1Id);
    if (!list1) throw new Error(`listId = ${args.list1Id} does not exist`);

    const list2 = lists.find((elem: any) => elem.id === args.list2Id);
    if (!list2) throw new Error(`list2Id = ${args.list2Id} does not exist`);

    const cards1 = list1.cards;
    if (!cards1) throw new Error(`list1Id = ${args.list1Id} has no card`);

    const cards2 = list2.cards;
    if (!cards2) throw new Error(`list2Id = ${args.list2Id} has no card`);

    const card1Index = cards1.findIndex((elem) => elem?.id === args.card1Id);
    if (card1Index === -1)
      throw new Error(
        `card1Id = ${args.card1Id} does not exist in list1Id = ${args.list1Id}`
      );

    const card2Index = cards2.findIndex((elem) => elem?.id === args.card2Id);
    if (card2Index === -1)
      throw new Error(
        `card2Id = ${args.card2Id} does not exist in list2Id = ${args.list2Id}`
      );

    const card1 = cards1[card1Index];
    const card2 = cards2[card2Index];
    cards1[card1Index] = card2;
    cards2[card2Index] = card1;

    return 1;
  },

  swapLists: async (_parent, args, _context) => {
    // console.log("swapLists");
    const lists = _context.Query.lists;
    if (!lists) throw new Error("empty lists in Query");

    const list1Index = lists.findIndex((elem) => elem?.id === args.list1Id);
    if (list1Index === -1)
      throw new Error(`list1Id = ${args.list1Id} does not exist in lists`);

    const list2Index = lists.findIndex((elem) => elem?.id === args.list2Id);
    if (list2Index === -1)
      throw new Error(`list2Id = ${args.list2Id} does not exist in lists`);

    const list1 = lists[list1Index];
    const list2 = lists[list2Index];
    lists[list1Index] = list2;
    lists[list2Index] = list1;

    return 1;
  },
};

// const typeResolvers = {
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
// };

//const resolvers: Resolvers<LoadingDataContext> = {
const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
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
