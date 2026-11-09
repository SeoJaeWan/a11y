import { useState } from 'react';

/** Frame content of the iframe case, not a case of its own. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <button
        type="button"
        onClick={() => {
          setMessage('미리보기를 보냈습니다');
        }}
      >
        미리보기 보내기
      </button>
      <p role="status">{message}</p>
    </main>
  );
}
