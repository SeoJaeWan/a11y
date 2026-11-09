import { useEffect, useRef, useState } from 'react';

/** A "select all" checkbox that starts indeterminate because one of two channels is on. */
export function Page(): React.JSX.Element {
  const [channels, setChannels] = useState({ email: true, sms: false });
  const allRef = useRef<HTMLInputElement>(null);
  const isAll = channels.email && channels.sms;
  const isSome = channels.email || channels.sms;
  useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = isSome && !isAll;
  }, [isAll, isSome]);
  return (
    <main>
      <h1>알림 설정</h1>
      <label>
        <input
          ref={allRef}
          type="checkbox"
          checked={isAll}
          onChange={(event) => {
            setChannels({ email: event.target.checked, sms: event.target.checked });
          }}
        />{' '}
        전체 선택
      </label>
      <label>
        <input
          type="checkbox"
          checked={channels.email}
          onChange={(event) => {
            setChannels({ ...channels, email: event.target.checked });
          }}
        />{' '}
        이메일
      </label>
      <label>
        <input
          type="checkbox"
          checked={channels.sms}
          onChange={(event) => {
            setChannels({ ...channels, sms: event.target.checked });
          }}
        />{' '}
        문자
      </label>
    </main>
  );
}
