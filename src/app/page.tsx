import TelegramAuth from '@/components/molecules/telegram-auth';
import { getSession } from '@/utils/session';

export default async function Home() {
  const session = await getSession();
  
  return (
    <main className="flex w-full h-screen items-center justify-center">
    <TelegramAuth session={session}/>
  </main>
  );
}
