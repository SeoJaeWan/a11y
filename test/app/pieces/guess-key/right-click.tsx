import { useState } from 'react';

/** A file item whose menu opens on right-click, or on Space. */
export function Page(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main>
      <ul aria-label="파일">
        <li
          tabIndex={0}
          onContextMenu={(event) => {
            event.preventDefault();
            setIsOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === ' ') {
              event.preventDefault();
              setIsOpen(true);
            }
          }}
        >
          보고서.pdf
        </li>
      </ul>
      {isOpen && (
        <ul role="menu" aria-label="파일 메뉴">
          <li role="menuitem" tabIndex={-1}>
            이름 바꾸기
          </li>
          <li role="menuitem" tabIndex={-1}>
            삭제
          </li>
        </ul>
      )}
    </main>
  );
}
