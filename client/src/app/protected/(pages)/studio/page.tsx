import dynamic from 'next/dynamic';
import { ComponentType, Suspense } from 'react';

const StudioPage: ComponentType = dynamic(() => import('@/components/organisms/studio-page'), {
  ssr: false,
});

const Page = () => {
  return (
    <Suspense>
      <StudioPage />
    </Suspense>
  );
};

export default Page;
