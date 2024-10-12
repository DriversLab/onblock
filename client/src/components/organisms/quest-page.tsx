"use client";

import { useSearchParams } from "next/navigation";

const QuestPage = () => {
    const params = useSearchParams();
    console.log("Params", params);

    return (
        <div className="container min-h-screen pb-26">
            Quest Page
        </div>
    )
}

export default QuestPage;
