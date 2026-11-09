import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Booking payment with a plain button that applies a coupon. */
export function Page(): React.JSX.Element {
  const [isApplied, setIsApplied] = useState(false);
  return (
    <SiteLayout title="결제">
      <p>결제 금액 48,000원</p>
      <button
        type="button"
        onClick={() => {
          setIsApplied(true);
        }}
      >
        쿠폰 적용
      </button>
      <p role="status">{isApplied ? '쿠폰이 적용되었습니다' : ''}</p>
    </SiteLayout>
  );
}
