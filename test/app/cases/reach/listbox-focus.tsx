import { useEffect, useRef, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const GRADES = ['스탠다드', '디럭스', '스위트'];

/** Room grade dropdown built as an ARIA listbox whose options take focus one at a time. */
export function Page(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [grade, setGrade] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) optionRefs.current[0]?.focus();
  }, [isOpen]);

  /**
   * Picks a grade, closes the list, and returns focus to the button.
   * @param picked Grade the user chose.
   */
  function pick(picked: string): void {
    setGrade(picked);
    setIsOpen(false);
    buttonRef.current?.focus();
  }

  /**
   * Moves focus with the up and down arrows and picks with Enter.
   * @param event Key pressed on an option.
   * @param index Position of that option.
   */
  function handleKeyDown(event: React.KeyboardEvent, index: number): void {
    if (event.key === 'Enter') {
      // Without this the same Enter also presses whatever takes focus next.
      event.preventDefault();
      pick(GRADES[index] ?? '');
      return;
    }
    const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
    if (step === undefined) return;
    event.preventDefault();
    optionRefs.current[(index + step + GRADES.length) % GRADES.length]?.focus();
  }

  return (
    <SiteLayout title="객실 선택">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen((isShown) => !isShown);
        }}
      >
        객실 등급
      </button>
      {isOpen && (
        <ul role="listbox" aria-label="객실 등급">
          {GRADES.map((item, index) => (
            <li
              key={item}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              role="option"
              aria-selected={item === grade}
              tabIndex={-1}
              onClick={() => {
                pick(item);
              }}
              onKeyDown={(event) => {
                handleKeyDown(event, index);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      <p role="status">{grade ? `${grade} 객실을 골랐습니다` : ''}</p>
    </SiteLayout>
  );
}
