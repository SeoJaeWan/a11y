import { useState } from 'react';

/** A two-column task board where cards move only by drag and drop. */
export function Page(): React.JSX.Element {
  const [isDone, setIsDone] = useState(false);
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
    <main>
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
    </main>
  );
}
