"use client";

import React from "react";
import { MiddlewareProvider } from "./middleware-providers";

export const ClientProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <MiddlewareProvider>{children}</MiddlewareProvider>
    </>
  );
};
