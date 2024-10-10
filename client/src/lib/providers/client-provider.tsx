"use client";

import { MiddlewareProvider } from "./middleware-providers";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";

<<<<<<< HEAD
const manifestUrl = "https://thick-rooms-wish.loca.lt";
=======
const manifestUrl = "https://fair-donkeys-lose.loca.lt";

>>>>>>> 34e8a46 (feat: update auth, restaruct rabbar and start ui part of profile)

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
<<<<<<< HEAD
        <MiddlewareProvider>
        {children}
        </MiddlewareProvider> 
=======
        {children}
>>>>>>> 34e8a46 (feat: update auth, restaruct rabbar and start ui part of profile)
      </TonConnectUIProvider>
      </MiddlewareProvider> 
  );
};
