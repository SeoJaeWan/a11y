import { useEffect, useRef, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Hosts that already have their closed shadow root; React may run the effect twice. */
const ATTACHED = new WeakSet<HTMLElement>();

/** Booking page with a third-party chat widget in a closed shadow root before the confirm button. */
export function Page(): React.JSX.Element {
  const hostRef = useRef<HTMLDivElement>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  useEffect(() => {
    const host = hostRef.current;
    if (!host || ATTACHED.has(host)) return;
    ATTACHED.add(host);
    const root = host.attachShadow({ mode: 'closed' });
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = '상담하기';
    root.append(button);
  }, []);
  return (
    <SiteLayout title="예약 확인">
      <p>3월 12일 오후 2시, 2명</p>
      <div ref={hostRef} />
      <button
        type="button"
        onClick={() => {
          setIsConfirmed(true);
        }}
      >
        예약 확정
      </button>
      <p role="status">{isConfirmed ? '예약이 확정되었습니다' : ''}</p>
    </SiteLayout>
  );
}
