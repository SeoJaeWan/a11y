import { useEffect, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** The same app on a second port, so the payment widget runs on another origin. */
const WIDGET_ORIGIN = 'http://localhost:5175';

/** Checkout page that embeds a payment widget from another origin in an iframe. */
export function Page(): React.JSX.Element {
  const [isPaid, setIsPaid] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  useEffect(() => {
    /**
     * Marks the order as paid when the widget reports a finished payment.
     * @param event Message from the widget frame.
     */
    function handleMessage(event: MessageEvent): void {
      if (event.origin === WIDGET_ORIGIN && event.data === 'paid') setIsPaid(true);
    }
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  return (
    <SiteLayout title="결제">
      <p>바다 호텔 1박, 32,000원</p>
      <iframe
        title="결제 위젯"
        src={`${WIDGET_ORIGIN}/cases/reach/frames/payment-widget`}
        width={360}
        height={200}
      />
      <p role="status">{isPaid ? '결제가 완료되었습니다' : ''}</p>
      {isPaid && (
        <button
          type="button"
          onClick={() => {
            setIsHistoryOpen(true);
          }}
        >
          주문 내역 보기
        </button>
      )}
      {isHistoryOpen && <h2>주문 내역</h2>}
    </SiteLayout>
  );
}
