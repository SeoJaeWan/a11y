import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const BOOKING_URL = '/cases/flow/page-load?booking=0312';

/** Booking list whose link loads the booking detail as a new page. */
export function Page(): React.JSX.Element {
  const booking = new URLSearchParams(window.location.search).get('booking');
  return booking ? (
    <BookingDetail />
  ) : (
    <SiteLayout title="내 예약">
      <ul>
        <li>
          <a href={BOOKING_URL}>3월 12일 예약</a>
        </li>
      </ul>
    </SiteLayout>
  );
}

/** Detail page reached by a full page load. */
function BookingDetail(): React.JSX.Element {
  const [isChanging, setIsChanging] = useState(false);
  return (
    <SiteLayout title="3월 12일 예약">
      <p>오후 2시, 2명</p>
      <button
        type="button"
        onClick={() => {
          setIsChanging(true);
        }}
      >
        예약 변경
      </button>
      <p role="status">{isChanging ? '변경할 날짜를 고르세요' : ''}</p>
    </SiteLayout>
  );
}
