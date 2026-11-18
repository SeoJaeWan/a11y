import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Booking row that opens on a double click only: no key does the same, and none is named. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <SiteLayout title="내 예약">
      <ul aria-label="예약 목록">
        <li
          tabIndex={0}
          onDoubleClick={() => {
            setMessage('예약 상세를 열었습니다');
          }}
        >
          11월 20일 서울 호텔
        </li>
      </ul>
      <p role="status">{message}</p>
    </SiteLayout>
  );
}
