import dynamic from 'next/dynamic';
import { ComponentType, Suspense } from 'react';

const QuestPage: ComponentType = dynamic(() => import('@/components/organisms/quest-page'), {
  ssr: false,
});

const Page = () => {
  return (
    <Suspense>
      <QuestPage />
    </Suspense>
  );
};

export default Page;
