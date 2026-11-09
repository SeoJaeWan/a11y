import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Booking list whose row opens its detail on double-click only. */
export function Page(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SiteLayout title="예약 목록">
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>시간</th>
            <th>인원</th>
          </tr>
        </thead>
        <tbody>
          <tr
            tabIndex={0}
            onDoubleClick={() => {
              setIsOpen(true);
            }}
          >
            <td>3월 12일</td>
            <td>오후 2시</td>
            <td>2명</td>
          </tr>
        </tbody>
      </table>
      {isOpen && (
        <section>
          <h2>예약 상세</h2>
          <p>3월 12일 오후 2시, 2명, 창가 자리</p>
        </section>
      )}
    </SiteLayout>
  );
}
