"use client";

import { TabBar } from "@/components/molecules";


export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main>
      {children}
      <TabBar />
    </main>
  );
}
