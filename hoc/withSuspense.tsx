import React, { ComponentType, ReactElement, Suspense } from 'react';
import { Preloader } from '@/components/common/Preloader/Preloader';

function withSuspense<P extends object>(Component: ComponentType<P>): ComponentType<P> {
  return function WithSuspenseComponent(props: P): ReactElement {
    return (
      <Suspense fallback={<Preloader />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

export default withSuspense;
