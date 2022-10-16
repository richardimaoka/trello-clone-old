import { makeVar } from "@apollo/client";
import { CardAdding, ControlType } from "./generated/graphql";

//card dragged
export const draggedCardId = makeVar<string>("");
export const draggedListId = makeVar<string>("");
export const overlaidCardId = makeVar<string>("");

//card-add initiated
export const cardAdding = makeVar<CardAdding | null>(null);

//new style control variable
export const controlVariable = makeVar<ControlType | null>(null);
