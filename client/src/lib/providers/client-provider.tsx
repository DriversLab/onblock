"use client";

import { MiddlewareProvider } from "./middleware-providers";

export const ClientProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    // <TonConnectUIProvider
    //   manifestUrl={
    //     // "https://magenta-useful-catshark-496.mypinata.cloud/ipfs/QmWvUAvYpmTNfPSA9ZTRjLeSfMWmy3auv4wGt8SCRqzfbk"
    //     "https://magenta-useful-catshark-496.mypinata.cloud/ipfs/QmT4v7aWPWbWXCj7vX9f41MXQMVjFgD4uDoP2WhAxCznvh"
    //   }
    // >
      <MiddlewareProvider>{children}</MiddlewareProvider>
    // </TonConnectUIProvider>
  );
};
