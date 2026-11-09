import { useState } from 'react';

/** A cart quantity button; the E2E puts its test in a `describe` block. */
export function Page(): React.JSX.Element {
  const [quantity, setQuantity] = useState(1);
  return (
    <main>
      <button
        type="button"
        onClick={() => {
          setQuantity((count) => count + 1);
        }}
      >
        수량 늘리기
      </button>
      <p role="status">수량 {quantity}</p>
    </main>
  );
}
