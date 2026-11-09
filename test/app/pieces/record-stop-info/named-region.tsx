import { useState } from 'react';

/** A named section (region) inside main that holds the button. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>알림 설정</h1>
      <section aria-label="방해 금지">
        <button
          type="button"
          onClick={() => {
            setMessage('방해 금지를 켰습니다');
          }}
        >
          켜기
        </button>
      </section>
      <p role="status">{message}</p>
    </main>
  );
}
