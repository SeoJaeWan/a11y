import { useState } from 'react';

/** A profile form: a help link, a cancel button, and the save button the E2E presses. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>프로필</h1>
      <a href="#help">도움말</a>
      <button
        type="button"
        onClick={() => {
          setMessage('취소했습니다');
        }}
      >
        취소
      </button>
      <button
        type="button"
        onClick={() => {
          setMessage('저장했습니다');
        }}
      >
        저장
      </button>
      <p role="status">{message}</p>
      <p id="help">이름과 연락처를 바꿀 수 있습니다.</p>
    </main>
  );
}
