import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Coupon page whose download control is a `div` with only a click handler. */
export function Page(): React.JSX.Element {
  const [isReceived, setIsReceived] = useState(false);
  return (
    <SiteLayout title="쿠폰함">
      <p>첫 예약 10% 할인 쿠폰</p>
      <div
        className="button"
        onClick={() => {
          setIsReceived(true);
        }}
      >
        쿠폰 받기
      </div>
      <p role="status">{isReceived ? '쿠폰을 받았습니다' : ''}</p>
    </SiteLayout>
  );
}
