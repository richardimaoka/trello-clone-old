import { makeVar } from "@apollo/client";
import { ControlType } from "./generated/graphql";

//card dragged
export const draggedCardId = makeVar<string>("");
export const draggedListId = makeVar<string>("");
export const overlaidCardId = makeVar<string>("");

//new style control variable
export const controlVariable = makeVar<ControlType | null>(null);
