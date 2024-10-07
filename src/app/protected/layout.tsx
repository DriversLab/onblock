"use client";

import {ContactRound, UserRoundPlus} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {clsx} from "clsx";

export default function ProtectedLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const currentPath = usePathname();

    const navigation = (url: string): void => router.push(url);

    return (
        <main>
            {children}
            <div className={"absolute bottom-0 w-full h-20 flex justify-between items-center"}>
                <button
                    className={clsx("w-full h-full flex justify-center items-center flex-col",
                        currentPath === "/protected" ? "bg-gray-600" : "bg-gray-800"
                        )}
                    onClick={() => navigation("/protected")}
                >
                    <UserRoundPlus />
                    <span className={"mt-2"}>Main</span>
                </button>
                <button
                    className={clsx("w-full h-full flex justify-center items-center flex-col",
                        currentPath === "/protected/contacts" ? "bg-gray-600" : "bg-gray-800"
                        )}
                    onClick={() => navigation("/protected/contacts")}
                >
                    <ContactRound />
                    <span className={"mt-2"}>Contacts</span>
                </button>
            </div>
        </main>
    );
}
