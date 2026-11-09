import { useState } from 'react';

/** Frame content of the same-origin iframe case, not a case of its own. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <button
        type="button"
        onClick={() => {
          setMessage('결제를 요청했습니다');
        }}
      >
        결제하기
      </button>
      <p role="status">{message}</p>
    </main>
  );
}
