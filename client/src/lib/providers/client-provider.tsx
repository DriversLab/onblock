"use client";

import { MiddlewareProvider } from "./middleware-providers";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";

const manifestUrl = "https://cold-maps-worry.loca.lt";


export const ClientProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
      <TonConnectUIProvider
        // ngrok link before slash
        manifestUrl={`${manifestUrl}/tonconnect-manifest.json`}
        uiPreferences={{ theme: THEME.DARK }}
      >
         <MiddlewareProvider>{children}</MiddlewareProvider>
      </TonConnectUIProvider>
  );
};
