/** nprogress */
import NProgress from 'nprogress';

/** react */
import { useEffect } from 'react';

export default function LoadingIndicator() {
  useEffect(function () {
    NProgress.configure({
      showSpinner: false,
    });
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);
  return <></>;
}
