import { useState } from 'react';

/** A terms checkbox that enables the sign-up button. */
export function Page(): React.JSX.Element {
  const [isAgreed, setIsAgreed] = useState(false);
  return (
    <main>
      <label>
        <input
          type="checkbox"
          checked={isAgreed}
          onChange={(event) => {
            setIsAgreed(event.target.checked);
          }}
        />{' '}
        약관에 동의합니다
      </label>
      <button type="button" disabled={!isAgreed}>
        가입하기
      </button>
    </main>
  );
}
