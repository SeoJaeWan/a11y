import { useEffect, useRef, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Coupon box built as a web component with an open shadow root. */
export function Page(): React.JSX.Element {
  const hostRef = useRef<HTMLDivElement>(null);
  const [isApplied, setIsApplied] = useState(false);
  useEffect(() => {
    const host = hostRef.current;
    if (!host || host.shadowRoot) return;
    const root = host.attachShadow({ mode: 'open' });
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = '쿠폰 적용';
    button.addEventListener('click', () => {
      setIsApplied(true);
    });
    root.append(button);
  }, []);
  return (
    <SiteLayout title="결제">
      <p>바다 호텔 1박, 32,000원</p>
      <div ref={hostRef} />
      <p role="status">{isApplied ? '쿠폰을 적용했습니다' : ''}</p>
    </SiteLayout>
  );
}
