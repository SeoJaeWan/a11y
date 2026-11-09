import { useEffect, useRef, useState } from 'react';

/** Notification settings with a widget button in a closed shadow root before the save button. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host || host.dataset.ready === 'true') return;
    host.dataset.ready = 'true';
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = '알림 끄기';
    host.attachShadow({ mode: 'closed' }).append(button);
  }, []);
  return (
    <main>
      <h1>알림 설정</h1>
      <div ref={hostRef} />
      <button
        type="button"
        onClick={() => {
          setMessage('저장했습니다');
        }}
      >
        저장
      </button>
      <p role="status">{message}</p>
    </main>
  );
}
