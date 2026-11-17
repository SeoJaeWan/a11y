import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Booking summary with a plain confirm button. */
export function Page(): React.JSX.Element {
  const [isConfirmed, setIsConfirmed] = useState(false);
  return (
    <SiteLayout title="예약 확인">
      <p>3월 12일 오후 2시, 2명</p>
      <button
        type="button"
        onClick={() => {
          setIsConfirmed(true);
        }}
      >
        예약 확정
      </button>
      <p role="status">{isConfirmed ? '예약이 확정되었습니다' : ''}</p>
    </SiteLayout>
  );
}
