"use client";
import { ReactNode } from "react";
import ReduxProvider from "../providers/ReduxProvider";

const LayoutClient = ({ children }: { children: ReactNode }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default LayoutClient;
