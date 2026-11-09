import { useState } from 'react';

/** An unnamed `section` and `form` inside main around the button. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>알림 설정</h1>
      <section>
        <form>
          <button
            type="button"
            onClick={() => {
              setMessage('저장했습니다');
            }}
          >
            저장
          </button>
        </form>
      </section>
      <p role="status">{message}</p>
    </main>
  );
}
