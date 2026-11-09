import { useState } from 'react';

/** A read-only device ID field before the copy button the E2E presses. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>알림 설정</h1>
      <label>
        기기 ID <input readOnly value="A1B2-C3D4" />
      </label>
      <button
        type="button"
        onClick={() => {
          setMessage('복사했습니다');
        }}
      >
        복사
      </button>
      <p role="status">{message}</p>
    </main>
  );
}
