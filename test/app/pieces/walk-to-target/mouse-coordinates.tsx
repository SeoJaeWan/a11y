import { useState } from 'react';

/** Two buttons placed by coordinates: the save button sits at the top-left corner of the page. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main style={{ minHeight: 200 }}>
      <button
        type="button"
        style={{ position: 'absolute', left: 0, top: 60, width: 120, height: 40 }}
        onClick={() => {
          setMessage('취소했습니다');
        }}
      >
        취소
      </button>
      <button
        type="button"
        style={{ position: 'absolute', left: 0, top: 0, width: 120, height: 40 }}
        onClick={() => {
          setMessage('저장했습니다');
        }}
      >
        저장
      </button>
      <p role="status" style={{ position: 'absolute', left: 0, top: 120 }}>
        {message}
      </p>
    </main>
  );
}
