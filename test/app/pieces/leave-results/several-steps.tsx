import { useState } from 'react';

/** A short sign-up form: name, terms checkbox, and a submit button. */
export function Page(): React.JSX.Element {
  const [name, setName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  return (
    <main>
      <label>
        이름{' '}
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </label>
      <label>
        <input type="checkbox" /> 약관에 동의합니다
      </label>
      <button
        type="button"
        onClick={() => {
          setIsJoined(true);
        }}
      >
        가입하기
      </button>
      <p role="status">{isJoined ? `${name}님 환영합니다` : ''}</p>
    </main>
  );
}
