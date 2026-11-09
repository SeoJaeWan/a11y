import { useEffect, useRef, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Booking list that swaps in the detail view on a client-side route change and focuses its heading. */
export function Page(): React.JSX.Element {
  const [booking, setBooking] = useState(() =>
    new URLSearchParams(window.location.search).get('booking'),
  );
  return (
    <SiteLayout title="내 예약">
      {booking ? (
        <BookingDetail />
      ) : (
        <section>
          <h2>예약 목록</h2>
          <ul>
            <li>
              <a
                href="?booking=0312"
                onClick={(event) => {
                  event.preventDefault();
                  window.history.pushState(null, '', '?booking=0312');
                  setBooking('0312');
                }}
              >
                3월 12일 예약
              </a>
            </li>
          </ul>
        </section>
      )}
    </SiteLayout>
  );
}

/** Detail view drawn in place of the list; it moves focus to its heading like a route announcer. */
function BookingDetail(): React.JSX.Element {
  const [isChanging, setIsChanging] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);
  return (
    <article>
      <a href="?">목록으로</a>
      <h2 ref={headingRef} tabIndex={-1}>
        3월 12일 예약
      </h2>
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
    </article>
  );
}
