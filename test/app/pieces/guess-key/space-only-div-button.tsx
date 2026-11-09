import { useState } from 'react';

/** A coupon button built from a `div` that handles Space but not Enter. */
export function Page(): React.JSX.Element {
  const [isTaken, setIsTaken] = useState(false);
  return (
    <main>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          setIsTaken(true);
        }}
        onKeyDown={(event) => {
          if (event.key === ' ') {
            event.preventDefault();
            setIsTaken(true);
          }
        }}
      >
        쿠폰 받기
      </div>
      <p role="status">{isTaken ? '쿠폰을 받았습니다' : ''}</p>
    </main>
  );
}
