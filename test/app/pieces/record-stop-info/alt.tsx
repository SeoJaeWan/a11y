import { useState } from 'react';

const ICON =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="16" height="16"%3E%3Ccircle cx="8" cy="8" r="6"/%3E%3C/svg%3E';

/** An image button (`input type="image"`) named by its `alt` text. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>알림 설정</h1>
      <input
        type="image"
        src={ICON}
        alt="알림 테스트 보내기"
        onClick={() => {
          setMessage('테스트 알림을 보냈습니다');
        }}
      />
      <p role="status">{message}</p>
    </main>
  );
}
