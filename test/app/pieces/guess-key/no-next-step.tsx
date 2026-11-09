import { useState } from 'react';

/** A `div` button that handles Space only; the E2E clicks it last and checks nothing after. */
export function Page(): React.JSX.Element {
  const [isMuted, setIsMuted] = useState(false);
  return (
    <main>
      <div
        role="button"
        tabIndex={0}
        aria-pressed={isMuted}
        onClick={() => {
          setIsMuted(true);
        }}
        onKeyDown={(event) => {
          if (event.key === ' ') {
            event.preventDefault();
            setIsMuted(true);
          }
        }}
      >
        알림 끄기
      </div>
    </main>
  );
}
