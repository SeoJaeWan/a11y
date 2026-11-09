import { useState } from 'react';

/** Notification settings built from plain `div`s, with no landmark around the save button. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <div>
      <h1>알림 설정</h1>
      <button
        type="button"
        onClick={() => {
          setMessage('저장했습니다');
        }}
      >
        저장
      </button>
      <p role="status">{message}</p>
    </div>
  );
}
