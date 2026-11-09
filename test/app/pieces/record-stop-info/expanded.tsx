import { useState } from 'react';

/** A disclosure button (`aria-expanded`) that shows advanced options. */
export function Page(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main>
      <h1>알림 설정</h1>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="advanced"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        고급 설정
      </button>
      <div id="advanced" hidden={!isOpen}>
        <p>방해 금지 시간을 정할 수 있습니다.</p>
      </div>
    </main>
  );
}
