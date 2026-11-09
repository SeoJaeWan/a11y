import { useState } from 'react';

/** A site header (banner) with a named navigation holding the menu button. */
export function Page(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header>
        <nav aria-label="주 메뉴">
          <h1>알림 설정</h1>
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            전체 메뉴
          </button>
        </nav>
      </header>
      <main>{isOpen && <p role="status">전체 메뉴를 열었습니다</p>}</main>
    </>
  );
}
