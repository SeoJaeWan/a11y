import { useState } from 'react';

/** A Space-only `div` button that sends `POST /api/cart`. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');

  /** Adds the item to the cart on the server. */
  function addToCart(): void {
    void fetch('/api/cart', { method: 'POST', body: JSON.stringify({ item: 'earphones' }) }).then(
      () => {
        setMessage('장바구니에 담았습니다');
      },
    );
  }

  return (
    <main>
      <div
        role="button"
        tabIndex={0}
        onClick={addToCart}
        onKeyDown={(event) => {
          if (event.key === ' ') {
            event.preventDefault();
            addToCart();
          }
        }}
      >
        장바구니 담기
      </div>
      <p role="status">{message}</p>
    </main>
  );
}
