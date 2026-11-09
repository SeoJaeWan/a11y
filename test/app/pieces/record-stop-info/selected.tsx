import { useState } from 'react';

/** A tab list with its first tab selected, before the save button the E2E presses. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>알림 설정</h1>
      <div role="tablist" aria-label="알림 종류">
        <button type="button" role="tab" aria-selected="true" aria-controls="panel">
          앱
        </button>
        <button type="button" role="tab" aria-selected="false" tabIndex={-1}>
          이메일
        </button>
      </div>
      <div id="panel" role="tabpanel">
        앱 알림을 받습니다.
      </div>
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
