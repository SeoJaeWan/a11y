import { useEffect, useRef, useState } from 'react';

/** An address dialog that takes focus on its container when it opens. */
export function Page(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) dialogRef.current?.focus();
  }, [isOpen]);
  return (
    <main>
      <h1>내 정보</h1>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        주소 변경
      </button>
      {isOpen && (
        <div ref={dialogRef} role="dialog" aria-labelledby="address-title" tabIndex={-1}>
          <h2 id="address-title">주소 변경</h2>
          <label>
            새 주소 <input />
          </label>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setMessage('주소를 바꿨습니다');
            }}
          >
            저장
          </button>
        </div>
      )}
      <p role="status">{message}</p>
    </main>
  );
}
