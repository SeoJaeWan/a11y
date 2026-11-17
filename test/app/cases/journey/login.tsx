import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Sign-in page: keeps the signed-in user in local storage, which the admin page reads. */
export function Page(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  return (
    <SiteLayout title="로그인">
      <label>
        이메일
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </label>
      <label>
        비밀번호
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </label>
      <button
        type="button"
        onClick={() => {
          window.localStorage.setItem('journey-user', email);
          setMessage('로그인했습니다');
        }}
      >
        로그인
      </button>
      <p role="status">{message}</p>
    </SiteLayout>
  );
}
