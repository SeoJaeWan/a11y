import { useEffect, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const PAYMENT_FRAME = `<!doctype html>
<button type="button" onclick="parent.postMessage('paid', '*')">결제하기</button>`;

/** Payment step whose pay button lives in an iframe, as with an embedded payment form. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  useEffect(() => {
    /**
     * Shows the result when the payment frame reports it.
     * @param event Message from the frame.
     */
    function onMessage(event: MessageEvent): void {
      if (event.data === 'paid') setMessage('결제했습니다');
    }
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);
  return (
    <SiteLayout title="결제">
      <iframe title="결제 창" srcDoc={PAYMENT_FRAME} />
      <p role="status">{message}</p>
    </SiteLayout>
  );
}
