import { useState } from 'react';

/** A save button with the default test id attribute, run with `workers: 1`. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>메모</h1>
      <button
        type="button"
        data-testid="save-button"
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
