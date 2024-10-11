"use client";

import { MiddlewareProvider } from "./middleware-providers";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";

const manifestUrl = "https://hungry-pianos-shave.loca.lt";


export const ClientProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <MiddlewareProvider>
      <TonConnectUIProvider
        // ngrok link before slash
        manifestUrl={`${manifestUrl}/tonconnect-manifest.json`}
        uiPreferences={{ theme: THEME.DARK }}
      >
        {children}
      </TonConnectUIProvider>
      </MiddlewareProvider> 
  );
};
