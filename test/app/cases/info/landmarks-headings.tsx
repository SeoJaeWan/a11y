import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Booking detail with a help sidebar, named sections, and a coupon form. */
export function Page(): React.JSX.Element {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  return (
    <SiteLayout title="예약 상세">
      <aside aria-label="도움말">
        <h2>자주 묻는 질문</h2>
        <a href="/">환불 규정</a>
      </aside>
      <section aria-labelledby="booking-heading">
        <h2 id="booking-heading">예약 정보</h2>
        <p>3월 12일 오후 2시, 2명</p>
        <button type="button">일정 변경</button>
      </section>
      <section aria-labelledby="payment-heading">
        <h2 id="payment-heading">결제</h2>
        <p>합계 120,000원</p>
        <form
          aria-label="쿠폰 등록"
          onSubmit={(event) => {
            event.preventDefault();
            setMessage(`${code} 쿠폰을 적용했습니다`);
          }}
        >
          <h3>쿠폰</h3>
          <label htmlFor="coupon-code">쿠폰 번호</label>
          <input
            id="coupon-code"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
            }}
          />
          <button type="submit">쿠폰 적용</button>
        </form>
        <p role="status">{message}</p>
      </section>
    </SiteLayout>
  );
}
