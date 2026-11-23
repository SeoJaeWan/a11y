import { useEffect, useRef, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

type MenuPosition = { x: number; y: number };

/** Booking row that names a key for its menu with `aria-keyshortcuts` and opens the menu on it. */
export function Page(): React.JSX.Element {
  const [position, setPosition] = useState<MenuPosition>();
  const [message, setMessage] = useState('');
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (position) menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
  }, [position]);

  /**
   * Shows the result of a menu item and closes the menu.
   * @param text Message for the chosen item.
   */
  function choose(text: string): void {
    setMessage(text);
    setPosition(undefined);
  }

  return (
    <SiteLayout title="내 예약">
      <ul aria-label="예약 목록">
        <li
          tabIndex={0}
          aria-keyshortcuts="Alt+M"
          onKeyDown={(event) => {
            if (!event.altKey || event.code !== 'KeyM') return;
            event.preventDefault();
            const box = event.currentTarget.getBoundingClientRect();
            setPosition({ x: box.left, y: box.bottom });
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            setPosition({ x: event.clientX, y: event.clientY });
          }}
        >
          11월 20일 서울 호텔
        </li>
      </ul>
      {position && (
        <ul
          ref={menuRef}
          role="menu"
          aria-label="예약 메뉴"
          style={{ position: 'fixed', left: position.x, top: position.y }}
          onKeyDown={(event) => {
            const items = [
              ...event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]'),
            ];
            const index = items.indexOf(document.activeElement as HTMLElement);
            if (event.key === 'ArrowDown') items[(index + 1) % items.length]?.focus();
            if (event.key === 'ArrowUp') items[(index - 1 + items.length) % items.length]?.focus();
            if (event.key === 'Escape') setPosition(undefined);
          }}
        >
          <li
            role="menuitem"
            tabIndex={-1}
            onClick={() => {
              choose('예약 변경 화면으로 이동합니다');
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') choose('예약 변경 화면으로 이동합니다');
            }}
          >
            예약 변경
          </li>
          <li
            role="menuitem"
            tabIndex={-1}
            onClick={() => {
              choose('예약을 취소했습니다');
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') choose('예약을 취소했습니다');
            }}
          >
            예약 취소
          </li>
        </ul>
      )}
      <p role="status">{message}</p>
    </SiteLayout>
  );
}
