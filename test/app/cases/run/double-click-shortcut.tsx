import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Booking row that opens on a double click and names its key with `aria-keyshortcuts`. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <SiteLayout title="내 예약">
      <ul aria-label="예약 목록">
        <li
          tabIndex={0}
          aria-keyshortcuts="Enter"
          onDoubleClick={() => {
            setMessage('예약 상세를 열었습니다');
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') setMessage('예약 상세를 열었습니다');
          }}
        >
          11월 20일 서울 호텔
        </li>
      </ul>
      <p role="status">{message}</p>
    </SiteLayout>
  );
}
