import { useState } from 'react';

/** A `div role="button"` with a click handler and no key handling. */
export function Page(): React.JSX.Element {
  const [isSubscribed, setIsSubscribed] = useState(false);
  return (
    <main>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          setIsSubscribed(true);
        }}
      >
        구독하기
      </div>
      <p role="status">{isSubscribed ? '구독했습니다' : ''}</p>
    </main>
  );
}
