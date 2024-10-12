"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { MiddlewareProvider } from "./middleware-providers";

export const ClientProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <TonConnectUIProvider manifestUrl={"https://orange-far-snipe-675.mypinata.cloud/ipfs/QmSmH6zf245Y4TCS7Hk7FiGSYDKn5RkkH3EbmS9WiKcgsb"}>
        <MiddlewareProvider>
          {children}
        </MiddlewareProvider> 
    </TonConnectUIProvider>
  );
};
