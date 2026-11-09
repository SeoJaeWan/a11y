import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/**
 * Booking page of a project that marks test ids with `data-qa`. An older `data-testid` with the
 * same value is left on the draft button.
 */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <SiteLayout title="예약 확인">
      <p>3월 12일 오후 2시, 2명</p>
      <button
        type="button"
        data-testid="confirm-booking"
        onClick={() => {
          setMessage('임시 저장했습니다');
        }}
      >
        임시 저장
      </button>
      <button
        type="button"
        data-qa="confirm-booking"
        onClick={() => {
          setMessage('예약이 확정되었습니다');
        }}
      >
        예약 확정
      </button>
      <p role="status">{message}</p>
    </SiteLayout>
  );
}
