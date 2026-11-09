import { useEffect, useRef, useState } from 'react';

/** A cookie dialog that takes focus on load and keeps Tab inside it; the search button stays clickable. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dialogRef.current?.querySelector('button')?.focus();
  }, []);
  return (
    <>
      <main>
        <h1>상품 찾기</h1>
        <button
          type="button"
          onClick={() => {
            setMessage('검색 결과 12건');
          }}
        >
          검색
        </button>
        <p role="status">{message}</p>
      </main>
      <div
        ref={dialogRef}
        role="dialog"
        aria-labelledby="cookie-title"
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return;
          const buttons = [...event.currentTarget.querySelectorAll('button')];
          const first = buttons[0];
          const last = buttons.at(-1);
          if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          }
        }}
      >
        <h2 id="cookie-title">쿠키 사용 동의</h2>
        <button type="button">설정</button>
        <button type="button">모두 허용</button>
      </div>
    </>
  );
}
