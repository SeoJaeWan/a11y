import { useState } from 'react';

/** An account button whose menu opens on hover, and on click. */
export function Page(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main>
      <div
        onMouseLeave={() => {
          setIsOpen(false);
        }}
      >
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onMouseEnter={() => {
            setIsOpen(true);
          }}
          onClick={() => {
            setIsOpen((isShown) => !isShown);
          }}
        >
          계정
        </button>
        {isOpen && (
          <ul role="menu" aria-label="계정">
            <li role="menuitem" tabIndex={-1}>
              내 정보
            </li>
            <li role="menuitem" tabIndex={-1}>
              로그아웃
            </li>
          </ul>
        )}
      </div>
    </main>
  );
}
