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

const FOLDERS = ['문서', '사진', '음악'];

/** A folder tree (APG tree, up and down arrows); the E2E opens the third folder. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>내 드라이브</h1>
      <ul
        role="tree"
        aria-label="폴더"
        onKeyDown={(event) => {
          const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
          if (step === undefined) return;
          event.preventDefault();
          moveFocus(event.currentTarget, '[role="treeitem"]', step);
        }}
      >
        {FOLDERS.map((folder, index) => (
          <li
            key={folder}
            role="treeitem"
            aria-selected={false}
            tabIndex={index === 0 ? 0 : -1}
            onClick={() => {
              setMessage(`${folder} 폴더 열림`);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') setMessage(`${folder} 폴더 열림`);
            }}
          >
            {folder}
          </li>
        ))}
      </ul>
      <p role="status">{message}</p>
    </main>
  );
}
