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

const ITEMS = ['저장', '내보내기', '인쇄'];

/** A document menu bar (APG menubar, left and right arrows); the E2E picks the third item. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>회의록</h1>
      <div
        role="menubar"
        aria-label="문서"
        onKeyDown={(event) => {
          const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
          if (step !== undefined) moveFocus(event.currentTarget, '[role="menuitem"]', step);
        }}
      >
        {ITEMS.map((item, index) => (
          <button
            key={item}
            type="button"
            role="menuitem"
            tabIndex={index === 0 ? 0 : -1}
            onClick={() => {
              setMessage(`${item} 시작`);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <p role="status">{message}</p>
    </main>
  );
}
