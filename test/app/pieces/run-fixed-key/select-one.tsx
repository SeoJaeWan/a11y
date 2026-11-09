import { useState } from 'react';

/** A guest count dropdown. */
export function Page(): React.JSX.Element {
  const [guests, setGuests] = useState('1');
  return (
    <main>
      <label>
        인원{' '}
        <select
          value={guests}
          onChange={(event) => {
            setGuests(event.target.value);
          }}
        >
          <option value="1">1명</option>
          <option value="2">2명</option>
          <option value="3">3명</option>
          <option value="4">4명</option>
          <option value="5">5명</option>
        </select>
      </label>
      <p role="status">{guests}명 예약</p>
    </main>
  );
}
