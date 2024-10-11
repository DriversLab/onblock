import { CircleUser, UserRoundPlus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";

export const TabBar = () => {
  const router = useRouter();
  const currentPath = usePathname();

  const navigation = (url: string): void => router.push(url);

  return (
    <div className="sticky bottom-0 w-full flex justify-center items-center">
      <div className="absolute bottom-0 mb-10 mx-full w-[80%] h-12 flex justify-between items-center rounded-xl bg-[rgba(31,30,47,1)] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
        <button
          className={clsx(
            "w-full h-full flex justify-center items-center flex-row p-2 rounded-xl text-sm font-medium",
            currentPath !== "/protected/profile"  ? "bg-zinc-500" : ""
          )}
          onClick={() => navigation("/protected")}
        >
          <UserRoundPlus size={20} className={"stroke-1"} />
          <span className="ml-2 text-lg">Main</span>
        </button>
        <button
          className={clsx(
            "w-full h-full flex justify-center items-center flex-row p-2 rounded-xl text-sm font-medium",
            currentPath === "/protected/profile" ? "bg-zinc-500" : ""
          )}
          onClick={() => navigation("/protected/profile")}
        >
          <CircleUser size={20} className={"stroke-1"} />
          <span className="ml-2 text-lg">Profile</span>
        </button>
      </div>
    </div>
  );
};
