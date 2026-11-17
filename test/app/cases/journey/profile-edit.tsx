import { useEffect, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const SAVED_NAME = '홍길동';
const SAVED_BIO = '예전 소개';
const CHECK_DELAY_MS = 400;

/** Profile form with saved values; the save button turns on a moment after something changes. */
export function Page(): React.JSX.Element {
  const [name, setName] = useState(SAVED_NAME);
  const [bio, setBio] = useState(SAVED_BIO);
  const [canSave, setCanSave] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const isChanged = name !== SAVED_NAME || bio !== SAVED_BIO;
    // The server check of the new values takes a moment, like a real name check.
    const timer = setTimeout(
      () => {
        setCanSave(isChanged);
      },
      isChanged ? CHECK_DELAY_MS : 0,
    );
    return () => {
      clearTimeout(timer);
    };
  }, [name, bio]);

  return (
    <SiteLayout title="프로필 수정">
      <label>
        이름
        <input
          value={name}
          onChange={(event) => {
            setCanSave(false);
            setName(event.target.value);
          }}
        />
      </label>
      <label>
        소개
        <textarea
          value={bio}
          onChange={(event) => {
            setCanSave(false);
            setBio(event.target.value);
          }}
        />
      </label>
      <button
        type="button"
        disabled={!canSave}
        onClick={() => {
          setMessage(`${name}, ${bio}: 저장되었습니다`);
        }}
      >
        저장
      </button>
      <p role="status">{message}</p>
    </SiteLayout>
  );
}
