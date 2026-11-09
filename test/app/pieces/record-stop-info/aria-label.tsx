import { useState } from 'react';

/** A promotion banner whose icon close button is named by `aria-label`. */
export function Page(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <main>
      <h1>알림 설정</h1>
      {isOpen && (
        <div className="banner">
          <p>앱 알림을 켜면 할인 소식을 받을 수 있습니다.</p>
          <button
            type="button"
            aria-label="닫기"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" />
            </svg>
          </button>
        </div>
      )}
    </main>
  );
}
