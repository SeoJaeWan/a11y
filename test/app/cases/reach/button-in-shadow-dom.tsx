import { useEffect, useRef, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Subscribe button rendered inside a shadow root, as a web component does. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host || host.shadowRoot) return;
    const root = host.attachShadow({ mode: 'open' });
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = '소식 받기';
    button.addEventListener('click', () => {
      setMessage('소식 받기를 신청했습니다');
    });
    root.append(button);
  }, []);
  return (
    <SiteLayout title="소식">
      <div ref={hostRef} />
      <p role="status">{message}</p>
    </SiteLayout>
  );
}
