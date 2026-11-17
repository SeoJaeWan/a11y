import { useEffect, useRef, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const GUESTS = ['홍길동', '김영희'];
const MENU_ITEMS = ['상세 보기', '예약 취소'];

type RowMenuProps = {
  /** Called when the user picks "예약 취소". */
  onCancel: () => void;
};

/**
 * Row menu that follows the ARIA menu button pattern: focus moves to the first item on open.
 * @param props What to do when an item is picked.
 */
function RowMenu({ onCancel }: RowMenuProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) itemRefs.current[0]?.focus();
  }, [isOpen]);

  /**
   * Runs a menu item and closes the menu.
   * @param item Label of the picked item.
   */
  function pick(item: string): void {
    setIsOpen(false);
    if (item === '예약 취소') onCancel();
  }

  /**
   * Moves focus with the up and down arrows and picks with Enter.
   * @param event Key pressed on a menu item.
   * @param index Position of that item.
   */
  function handleKeyDown(event: React.KeyboardEvent, index: number): void {
    if (event.key === 'Enter') {
      // Without this the same Enter also presses whatever takes focus next.
      event.preventDefault();
      pick(MENU_ITEMS[index] ?? '');
      return;
    }
    const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
    if (step === undefined) return;
    event.preventDefault();
    itemRefs.current[(index + step + MENU_ITEMS.length) % MENU_ITEMS.length]?.focus();
  }

  return (
    <>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen((isShown) => !isShown);
        }}
      >
        더보기
      </button>
      {isOpen && (
        <ul role="menu">
          {MENU_ITEMS.map((item, index) => (
            <li
              key={item}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              role="menuitem"
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
    </>
  );
}

/** Booking list for signed-in staff; a row menu cancels a booking after a confirm dialog. */
export function Page(): React.JSX.Element {
  const [user] = useState(() => window.localStorage.getItem('journey-user'));
  const [asking, setAsking] = useState('');
  const [canceled, setCanceled] = useState<string[]>([]);

  if (!user) {
    return (
      <SiteLayout title="예약 관리">
        <p>로그인이 필요합니다</p>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout title="예약 관리">
      <table>
        <thead>
          <tr>
            <th>예약자</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {GUESTS.map((guest) => (
            <tr key={guest}>
              <td>{guest}</td>
              <td>{canceled.includes(guest) ? '취소됨' : '예약됨'}</td>
              <td>
                <RowMenu
                  onCancel={() => {
                    setAsking(guest);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {asking !== '' && (
        <div role="dialog" aria-modal="true" aria-labelledby="cancel-title">
          <h2 id="cancel-title">{asking} 님의 예약을 취소할까요?</h2>
          <button
            type="button"
            autoFocus
            onClick={() => {
              setCanceled([...canceled, asking]);
              setAsking('');
            }}
          >
            취소 확정
          </button>
        </div>
      )}
    </SiteLayout>
  );
}
