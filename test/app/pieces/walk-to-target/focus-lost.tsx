import { useState } from 'react';

/** A two-part sign-up: "다음" replaces itself with the next part and does not move focus. */
export function Page(): React.JSX.Element {
  const [part, setPart] = useState(1);
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>회원 가입</h1>
      {part === 1 ? (
        <button
          type="button"
          onClick={() => {
            setPart(2);
          }}
        >
          다음
        </button>
      ) : (
        <>
          <p>약관을 확인했습니다.</p>
          <button
            type="button"
            onClick={() => {
              setMessage('가입했습니다');
            }}
          >
            가입하기
          </button>
        </>
      )}
      <p role="status">{message}</p>
    </main>
  );
}
