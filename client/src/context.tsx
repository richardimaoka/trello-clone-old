import React from "react";
import { ControlType } from "./generated/graphql";

export const ControlContext = React.createContext<ControlType | null>(null);
