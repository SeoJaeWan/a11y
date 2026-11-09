import { useState } from 'react';

/** A two-step checkout: a real "next" button, then a pay control that is only a clickable `div`. */
export function Page(): React.JSX.Element {
  const [isPayment, setIsPayment] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  if (!isPayment) {
    return (
      <main>
        <h1>주문 확인</h1>
        <button
          type="button"
          onClick={() => {
            setIsPayment(true);
          }}
        >
          다음
        </button>
      </main>
    );
  }
  return (
    <main>
      <h1>결제</h1>
      <div
        onClick={() => {
          setIsPaid(true);
        }}
      >
        결제하기
      </div>
      <p role="status">{isPaid ? '결제했습니다' : ''}</p>
    </main>
  );
}
