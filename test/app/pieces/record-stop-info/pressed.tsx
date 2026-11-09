import { useState } from 'react';

/** A toggle button (`aria-pressed`) for mute that starts off. */
export function Page(): React.JSX.Element {
  const [isMuted, setIsMuted] = useState(false);
  return (
    <main>
      <h1>알림 설정</h1>
      <button
        type="button"
        aria-pressed={isMuted}
        onClick={() => {
          setIsMuted(!isMuted);
        }}
      >
        알림 끄기
      </button>
    </main>
  );
}
