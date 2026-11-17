import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Two-column task board where a card moves only by drag and drop, then the board is saved. */
export function Page(): React.JSX.Element {
  const [isDone, setIsDone] = useState(false);
  const [message, setMessage] = useState('');
  const card = (
    <li
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData('text/plain', 'report');
      }}
    >
      보고서 쓰기
    </li>
  );
  return (
    <SiteLayout title="할 일 보드">
      <ul aria-label="할 일" style={{ minHeight: 60, border: '1px solid' }}>
        {!isDone && card}
      </ul>
      <ul
        aria-label="완료"
        style={{ minHeight: 60, border: '1px solid' }}
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDone(true);
        }}
      >
        {isDone && card}
      </ul>
      <button
        type="button"
        onClick={() => {
          setMessage(`완료 ${isDone ? '1' : '0'}건을 저장했습니다`);
        }}
      >
        저장
      </button>
      <p role="status">{message}</p>
    </SiteLayout>
  );
}
