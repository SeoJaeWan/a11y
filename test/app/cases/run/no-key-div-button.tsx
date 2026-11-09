import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Alert sign-up from a `div role="button"` that only listens to clicks. */
export function Page(): React.JSX.Element {
  const [isSubscribed, setIsSubscribed] = useState(false);
  return (
    <SiteLayout title="빈자리 알림">
      <p>원하는 날짜에 빈자리가 생기면 알려 드립니다.</p>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          setIsSubscribed(true);
        }}
      >
        알림 받기
      </div>
      <p role="status">{isSubscribed ? '빈자리 알림을 신청했습니다' : ''}</p>
    </SiteLayout>
  );
}
