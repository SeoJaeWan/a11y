import { useState } from 'react';

/** A time slot dropdown with a sold-out slot in the middle. */
export function Page(): React.JSX.Element {
  const [slot, setSlot] = useState('10');
  return (
    <main>
      <label>
        시간{' '}
        <select
          value={slot}
          onChange={(event) => {
            setSlot(event.target.value);
          }}
        >
          <option value="10">10시</option>
          <option value="11" disabled>
            11시 (마감)
          </option>
          <option value="12">12시</option>
        </select>
      </label>
      <p role="status">{slot}시 예약</p>
    </main>
  );
}
