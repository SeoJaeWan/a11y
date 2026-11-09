import { useState } from 'react';

/** A cart button, then a coupon "button" that is only a `div` with a click handler. */
export function Page(): React.JSX.Element {
  const [isTaken, setIsTaken] = useState(false);
  return (
    <main>
      <button type="button">장바구니</button>
      <div
        onClick={() => {
          setIsTaken(true);
        }}
      >
        쿠폰 받기
      </div>
      <p role="status">{isTaken ? '쿠폰을 받았습니다' : ''}</p>
    </main>
  );
}
