import dynamic from 'next/dynamic';
import { ComponentType, Suspense } from 'react';

const ProfilePage: ComponentType = dynamic(() => import('@/components/organisms/profile-page'), {
  ssr: false,
});

const Page = () => {
  return (
    <Suspense>
      <ProfilePage />
    </Suspense>
  );
};

export default Page;
