import { useState } from 'react';

/** A post editor: the E2E presses "미리보기" first, then "저장" that comes before it. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>글쓰기</h1>
      <button
        type="button"
        onClick={() => {
          setMessage('저장했습니다');
        }}
      >
        저장
      </button>
      <button
        type="button"
        onClick={() => {
          setMessage('미리보기를 열었습니다');
        }}
      >
        미리보기
      </button>
      <p role="status">{message}</p>
    </main>
  );
}
