import { useState } from 'react';

/**
 * Moves the roving focus to the next or previous item of a widget.
 * @param widget Element that holds the items.
 * @param selector Items to move between.
 * @param step 1 for the next item, -1 for the previous one.
 */
function moveFocus(widget: HTMLElement, selector: string, step: number): void {
  const items = [...widget.querySelectorAll<HTMLElement>(selector)];
  const current = items.findIndex((item) => item.tabIndex === 0);
  const next = items[(current + step + items.length) % items.length];
  if (!next) return;
  for (const item of items) item.tabIndex = item === next ? 0 : -1;
  next.focus();
}

const ITEMS = ['복사', '이동', '삭제'];

/** A file action menu that stays open (APG menu, up and down arrows); the E2E picks the third item. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>사진.png</h1>
      <ul
        role="menu"
        aria-label="파일 작업"
        onKeyDown={(event) => {
          const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
          if (step === undefined) return;
          event.preventDefault();
          moveFocus(event.currentTarget, '[role="menuitem"]', step);
        }}
      >
        {ITEMS.map((item, index) => (
          <li
            key={item}
            role="menuitem"
            tabIndex={index === 0 ? 0 : -1}
            onClick={() => {
              setMessage(`${item} 완료`);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') setMessage(`${item} 완료`);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      <p role="status">{message}</p>
    </main>
  );
}
