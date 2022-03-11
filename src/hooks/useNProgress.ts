import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useEffect } from 'react';

const nprogressConfig = { easing: 'ease', speed: 500, showSpinner: false };

NProgress.configure(nprogressConfig);

export const useNProgress = (): void => {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });
};
