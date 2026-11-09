import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Guest form whose fields are reordered with CSS, so the Tab order differs from what is shown. */
export function Page(): React.JSX.Element {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  return (
    <SiteLayout title="예약자 정보">
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={(event) => {
          event.preventDefault();
          setMessage(`${name}님 예약을 접수했습니다`);
        }}
      >
        <label style={{ order: 2 }}>
          연락처
          <input
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </label>
        <label style={{ order: 1 }}>
          이름
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </label>
        <button type="submit" style={{ order: 3 }}>
          예약하기
        </button>
      </form>
      <p role="status">{message}</p>
    </SiteLayout>
  );
}
