import { useState } from 'react';

/** A send button marked `aria-disabled` (still focusable) before the test button the E2E presses. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>알림 설정</h1>
      <button type="button" aria-disabled="true">
        지금 보내기
      </button>
      <button
        type="button"
        onClick={() => {
          setMessage('테스트 알림을 보냈습니다');
        }}
      >
        테스트 보내기
      </button>
      <p role="status">{message}</p>
    </main>
  );
}
