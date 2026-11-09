import { useState } from 'react';

/** A project that names test ids `data-qa`; an older `data-testid` with the same value marks another button. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>메모</h1>
      <button
        type="button"
        data-testid="save-button"
        onClick={() => {
          setMessage('임시 저장했습니다');
        }}
      >
        임시 저장
      </button>
      <button
        type="button"
        data-qa="save-button"
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
