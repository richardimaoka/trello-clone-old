import { makeVar } from "@apollo/client";
import { CardAdding } from "./generated/graphql";

export const cartItemsVar = makeVar<number[]>([]);
export const draggedCard = makeVar<string>("");
export const cardAdding = makeVar<CardAdding | null>(null);
