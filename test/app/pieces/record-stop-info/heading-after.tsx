import { useState } from 'react';

/** A button followed by the only heading on the page. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <button
        type="button"
        onClick={() => {
          setMessage('저장했습니다');
        }}
      >
        저장
      </button>
      <p role="status">{message}</p>
      <h2>도움말</h2>
      <p>저장하면 바로 적용됩니다.</p>
    </main>
  );
}
