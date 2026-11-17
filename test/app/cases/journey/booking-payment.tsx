import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const PAYMENTS = ['계좌 이체', '카드 결제'];

/** Booking form that ends in a payment dialog: date, people, payment, terms, then confirm. */
export function Page(): React.JSX.Element {
  const [checkIn, setCheckIn] = useState('');
  const [people, setPeople] = useState('1명');
  const [payment, setPayment] = useState('계좌 이체');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (isDone) {
    return (
      <SiteLayout title="예약">
        <h2>예약 완료</h2>
        <p role="status">{`${checkIn}, ${people}, ${payment}`}</p>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout title="예약">
      <label>
        체크인
        <input
          type="date"
          value={checkIn}
          onChange={(event) => {
            setCheckIn(event.target.value);
          }}
        />
      </label>
      <label>
        인원
        <select
          value={people}
          onChange={(event) => {
            setPeople(event.target.value);
          }}
        >
          {['1명', '2명', '3명', '4명'].map((count) => (
            <option key={count}>{count}</option>
          ))}
        </select>
      </label>
      <fieldset>
        <legend>결제 방법</legend>
        {PAYMENTS.map((item) => (
          <label key={item}>
            <input
              type="radio"
              name="payment"
              checked={payment === item}
              onChange={() => {
                setPayment(item);
              }}
            />
            {item}
          </label>
        ))}
      </fieldset>
      <label>
        <input
          type="checkbox"
          checked={isAgreed}
          onChange={(event) => {
            setIsAgreed(event.target.checked);
          }}
        />{' '}
        약관에 동의합니다
      </label>
      <button
        type="button"
        disabled={!isAgreed}
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        결제하기
      </button>
      {isDialogOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby="pay-title">
          <h2 id="pay-title">결제할까요?</h2>
          <button
            type="button"
            autoFocus
            onClick={() => {
              setIsDone(true);
            }}
          >
            확인
          </button>
        </div>
      )}
    </SiteLayout>
  );
}
