import { makeVar } from "@apollo/client";
import { ControlType } from "./generated/graphql";

//new style control variable
export const controlVariable = makeVar<ControlType | null>(null);
