import { makeVar } from "@apollo/client";

export const cartItemsVar = makeVar<number[]>([]);
export const draggedCard = makeVar<string>("");
