import { useEffect, useRef, useState } from 'react';

/** An event banner whose coupon button lives in an open shadow root. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host || host.shadowRoot) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = '쿠폰 받기';
    button.addEventListener('click', () => {
      setMessage('쿠폰을 받았습니다');
    });
    host.attachShadow({ mode: 'open' }).append(button);
  }, []);
  return (
    <main>
      <h1>이벤트</h1>
      <button type="button">이벤트 안내</button>
      <div ref={hostRef} />
      <p role="status">{message}</p>
    </main>
  );
}
