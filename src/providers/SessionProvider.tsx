"use client";
import React, { FC, ReactNode } from "react";
import { Session } from "next-auth";
import { SessionProvider as NextAuthProvider } from "next-auth/react";

interface ISesionProviderProps {
  children: ReactNode;
  session: Session | null;
}

const SessionProvider: FC<ISesionProviderProps> = ({ children, session }) => {
  return (
    <>
      <NextAuthProvider session={session}>{children}</NextAuthProvider>
    </>
  );
};

export default SessionProvider;
