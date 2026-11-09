import { useState } from 'react';

/** An icon button whose only name is its `title` tooltip. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>알림 설정</h1>
      <button
        type="button"
        title="새로 고침"
        onClick={() => {
          setMessage('새로 고쳤습니다');
        }}
      >
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="6" stroke="currentColor" fill="none" />
        </svg>
      </button>
      <p role="status">{message}</p>
    </main>
  );
}
