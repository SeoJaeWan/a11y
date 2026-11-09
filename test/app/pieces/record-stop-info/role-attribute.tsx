import { useState } from 'react';

/** Notification settings whose save button is a `div` with `role="button"` and key handling. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>알림 설정</h1>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          setMessage('저장했습니다');
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') setMessage('저장했습니다');
        }}
      >
        저장
      </div>
      <p role="status">{message}</p>
    </main>
  );
}
