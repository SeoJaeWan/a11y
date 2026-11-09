import { useEffect, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Sign-up form: the join button turns on a moment after the id is checked. */
export function Page(): React.JSX.Element {
  const [userId, setUserId] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  useEffect(() => {
    if (!userId) return;
    // Stands in for a server check of the id.
    const timer = setTimeout(() => {
      setIsAvailable(true);
    }, 600);
    return () => {
      clearTimeout(timer);
    };
  }, [userId]);
  return (
    <SiteLayout title="회원 가입">
      <label>
        아이디
        <input
          value={userId}
          onChange={(event) => {
            setIsAvailable(false);
            setUserId(event.target.value);
          }}
        />
      </label>
      <p>{isAvailable ? '사용할 수 있는 아이디입니다' : ''}</p>
      <button
        type="button"
        disabled={!isAvailable}
        onClick={() => {
          setIsJoined(true);
        }}
      >
        가입하기
      </button>
      <p role="status">{isJoined ? `${userId} 님, 가입을 환영합니다` : ''}</p>
    </SiteLayout>
  );
}
