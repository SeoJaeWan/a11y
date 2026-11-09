import { useState } from 'react';

/** A Space-only `div` button that reads stock with `GET /api/stock`. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');

  /** Reads the stock count from the server. */
  function checkStock(): void {
    void fetch('/api/stock')
      .then((response) => response.json() as Promise<{ count: number }>)
      .then(({ count }) => {
        setMessage(`재고 ${String(count)}개`);
      });
  }

  return (
    <main>
      <div
        role="button"
        tabIndex={0}
        onClick={checkStock}
        onKeyDown={(event) => {
          if (event.key === ' ') {
            event.preventDefault();
            checkStock();
          }
        }}
      >
        재고 확인
      </div>
      <p role="status">{message}</p>
    </main>
  );
}
