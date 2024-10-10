"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";



export const MiddlewareProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    const WebApp = (await import("@twa-dev/sdk")).default;
    WebApp.ready();
    const initData = WebApp.initData;
    if (initData) {
      try {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ initData }),
        });

        if (response.ok) {
          await response.json();
          router.refresh();
        } else {
          console.error("Authentication failed");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    }
  };

  return (
    <>
      {children}
    </>
  );
};
