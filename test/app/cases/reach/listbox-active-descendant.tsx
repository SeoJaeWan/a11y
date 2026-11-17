import { useEffect, useRef, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const ORDERS = ['추천순', '낮은 가격순', '높은 가격순'];

/** Sort dropdown whose list keeps focus and points at the current option with `aria-activedescendant`. */
export function Page(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [order, setOrder] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (isOpen) listRef.current?.focus();
  }, [isOpen]);

  /**
   * Picks a sort order, closes the list, and returns focus to the button.
   * @param picked Sort order the user chose.
   */
  function pick(picked: string): void {
    setOrder(picked);
    setIsOpen(false);
    buttonRef.current?.focus();
  }

  /**
   * Moves the current option with the up and down arrows and picks it with Enter.
   * @param event Key pressed on the list.
   */
  function handleKeyDown(event: React.KeyboardEvent): void {
    if (event.key === 'Enter') {
      // Without this the same Enter also presses whatever takes focus next.
      event.preventDefault();
      pick(ORDERS[active] ?? '');
      return;
    }
    const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
    if (step === undefined) return;
    event.preventDefault();
    setActive((active + step + ORDERS.length) % ORDERS.length);
  }

  return (
    <SiteLayout title="검색 결과">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => {
          setActive(0);
          setIsOpen((isShown) => !isShown);
        }}
      >
        정렬
      </button>
      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          aria-label="정렬"
          tabIndex={-1}
          aria-activedescendant={`order-${String(active)}`}
          onKeyDown={handleKeyDown}
        >
          {ORDERS.map((item, index) => (
            <li
              key={item}
              id={`order-${String(index)}`}
              role="option"
              aria-selected={index === active}
              onClick={() => {
                pick(item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      <p role="status">{order ? `${order}으로 정렬했습니다` : ''}</p>
    </SiteLayout>
  );
}
