import { useRef, useState } from 'react';

/**
 * A file menu with an "export" item whose submenu opens on hover, or on ArrowRight.
 * Menu items move with the arrow keys and run on Enter, as in the APG menu pattern.
 */
export function Page(): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [result, setResult] = useState('');
  const newRef = useRef<HTMLLIElement>(null);
  const exportRef = useRef<HTMLLIElement>(null);
  const pdfRef = useRef<HTMLLIElement>(null);

  /**
   * Runs a submenu item and closes both menus.
   * @param format Export format.
   */
  function exportAs(format: string): void {
    setResult(`${format}로 내보냈습니다`);
    setIsSubmenuOpen(false);
    setIsMenuOpen(false);
  }

  /**
   * Opens the submenu.
   * @param shouldFocus Move focus to its first item once it is drawn (keyboard opening).
   */
  function openSubmenu(shouldFocus: boolean): void {
    setIsSubmenuOpen(true);
    if (shouldFocus) {
      requestAnimationFrame(() => {
        pdfRef.current?.focus();
      });
    }
  }

  return (
    <main>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        onClick={() => {
          setIsMenuOpen(true);
          requestAnimationFrame(() => {
            newRef.current?.focus();
          });
        }}
      >
        파일
      </button>
      {isMenuOpen && (
        <ul
          role="menu"
          aria-label="파일"
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' && document.activeElement === newRef.current) {
              event.preventDefault();
              exportRef.current?.focus();
            } else if (event.key === 'ArrowUp' && document.activeElement === exportRef.current) {
              event.preventDefault();
              newRef.current?.focus();
            }
          }}
        >
          <li ref={newRef} role="menuitem" tabIndex={-1}>
            새로 만들기
          </li>
          <li
            ref={exportRef}
            role="menuitem"
            tabIndex={-1}
            aria-haspopup="menu"
            aria-expanded={isSubmenuOpen}
            onMouseEnter={() => {
              openSubmenu(false);
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') {
                event.preventDefault();
                openSubmenu(true);
              }
            }}
          >
            내보내기
            {isSubmenuOpen && (
              <ul role="menu" aria-label="내보내기">
                {['PDF', '이미지'].map((format) => (
                  <li
                    key={format}
                    ref={format === 'PDF' ? pdfRef : undefined}
                    role="menuitem"
                    tabIndex={-1}
                    onClick={(event) => {
                      event.stopPropagation();
                      exportAs(format);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.stopPropagation();
                        exportAs(format);
                      }
                    }}
                  >
                    {format}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      )}
      <p role="status">{result}</p>
    </main>
  );
}
