import { useState } from 'react';

/** A phone field that starts with a wrong value marked `aria-invalid`. */
export function Page(): React.JSX.Element {
  const [phone, setPhone] = useState('010-12');
  const isInvalid = !/^010-\d{4}-\d{4}$/.test(phone);
  return (
    <main>
      <h1>알림 설정</h1>
      <label htmlFor="phone">휴대폰 번호</label>
      <input
        id="phone"
        value={phone}
        aria-invalid={isInvalid}
        aria-describedby="phone-error"
        onChange={(event) => {
          setPhone(event.target.value);
        }}
      />
      <p id="phone-error">{isInvalid ? '번호 형식이 맞지 않습니다' : ''}</p>
    </main>
  );
}
