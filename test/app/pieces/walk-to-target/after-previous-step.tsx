import { useState } from 'react';

/** An address form: the E2E fills the name, then presses the save button right after it. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>배송지</h1>
      <label>
        받는 분 <input />
      </label>
      <button
        type="button"
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
