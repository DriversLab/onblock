import dynamic from 'next/dynamic';
import { ComponentType, Suspense } from 'react';

const CreateQuestPage: ComponentType = dynamic(() => import('@/components/organisms/create-quest-page'), {
  ssr: false,
});

const Page = () => {
  return (
    <Suspense>
      <CreateQuestPage />
    </Suspense>
  );
};

export default Page;
