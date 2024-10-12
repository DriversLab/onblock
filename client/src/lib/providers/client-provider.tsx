"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { MiddlewareProvider } from "./middleware-providers";

export const ClientProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <TonConnectUIProvider
      manifestUrl={
        "https://magenta-useful-catshark-496.mypinata.cloud/ipfs/QmT4v7aWPWbWXCj7vX9f41MXQMVjFgD4uDoP2WhAxCznvh"
      }
    >
      <MiddlewareProvider>{children}</MiddlewareProvider>
    </TonConnectUIProvider>
  );
};
