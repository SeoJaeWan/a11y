import { useState } from 'react';

/** Several headings before the button: the nearest one is the second `h2`. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>알림 설정</h1>
      <h2>이메일 알림</h2>
      <p>주 1회 요약을 보냅니다.</p>
      <h2>문자 알림</h2>
      <button
        type="button"
        onClick={() => {
          setMessage('문자 알림을 켰습니다');
        }}
      >
        켜기
      </button>
      <p role="status">{message}</p>
    </main>
  );
}
