import { useState } from 'react';

/** A `div role="heading" aria-level="3"` before the button. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <div role="heading" aria-level={3}>
        알림 설정
      </div>
      <button
        type="button"
        onClick={() => {
          setMessage('저장했습니다');
        }}
      >
        저장
      </button>
      <p role="status">{message}</p>
    </main>
  );
}
