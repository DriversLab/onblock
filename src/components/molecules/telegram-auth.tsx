/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {createUser} from "@/lib/firebase/api";
import WebApp from '@twa-dev/sdk'
import {Loading} from "@/components/atoms";

interface Props {
    session: any
}

export default function TelegramAuth({}: Props) {
    const router = useRouter()

    useEffect(() => {
        const user = WebApp.initDataUnsafe.user;
        if (user) {
           void createUser(user as any);
            void navigateToProtectedPage();
        }
    }, []);

    const navigateToProtectedPage = () => router.push('/protected');


    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800">
           <Loading />
        </div>
    )
}
