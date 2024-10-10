import { CircleUser, UserRoundPlus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";

export const TabBar = () => {
    const router = useRouter();
    const currentPath = usePathname();
  
    const navigation = (url: string): void => router.push(url);
  
    return (
      <div
      className={
        "absolute bottom-0 w-full h-12 flex justify-between items-center"
      }
    >
      <button
        className={clsx(
          "w-full h-full flex justify-center items-center flex-row p-2",
          currentPath === "/protected" ? "bg-gray-800" : "bg-gray-600"
        )}
        onClick={() => navigation("/protected")}
      >
        <UserRoundPlus size={20} />
        <span className={"ml-1 text-lg"}>Main</span>
      </button>
      <button
        className={clsx(
          "w-full h-full flex justify-center items-center flex-row p-2",
          currentPath === "/protected/profile"
            ? "bg-gray-800"
            : "bg-gray-600"
        )}
        onClick={() => navigation("/protected/profile")}
      >
        <CircleUser size={20} />
        <span className={"ml-1 text-lg"}>Profile</span>
      </button>
    </div>
    )
  }
