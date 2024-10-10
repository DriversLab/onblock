"use client";

import { MiddlewareProvider } from "./middleware-providers";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";

const manifestUrl = "https://fair-donkeys-lose.loca.lt";


export const ClientProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <MiddlewareProvider>
      <TonConnectUIProvider
        manifestUrl={`${manifestUrl}/tonconnect-manifest.json`}
        uiPreferences={{ theme: THEME.DARK }}
      >
       
        {children}
         
      </TonConnectUIProvider>
      </MiddlewareProvider> 
  );
};
