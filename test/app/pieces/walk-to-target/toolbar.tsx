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

const TOOLS = ['굵게', '기울임', '밑줄'];

/** A text style toolbar (APG toolbar, left and right arrows); the E2E presses the third tool. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>메모</h1>
      <div
        role="toolbar"
        aria-label="글자 모양"
        onKeyDown={(event) => {
          const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
          if (step !== undefined) moveFocus(event.currentTarget, 'button', step);
        }}
      >
        {TOOLS.map((tool, index) => (
          <button
            key={tool}
            type="button"
            tabIndex={index === 0 ? 0 : -1}
            onClick={() => {
              setMessage(`${tool} 적용`);
            }}
          >
            {tool}
          </button>
        ))}
      </div>
      <p role="status">{message}</p>
    </main>
  );
}
