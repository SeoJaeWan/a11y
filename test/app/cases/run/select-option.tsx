import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const PRICE_PER_PERSON = 30000;

/** Booking form: picking the party size updates the price on each `change`. */
export function Page(): React.JSX.Element {
  const [people, setPeople] = useState(1);
  return (
    <SiteLayout title="예약 인원">
      <label>
        인원
        <select
          value={String(people)}
          onChange={(event) => {
            setPeople(Number(event.target.value));
          }}
        >
          {[1, 2, 3, 4, 5].map((count) => (
            <option key={count} value={String(count)}>
              {count}명
            </option>
          ))}
        </select>
      </label>
      <p role="status">
        {people}명 · {(people * PRICE_PER_PERSON).toLocaleString('ko-KR')}원
      </p>
    </SiteLayout>
  );
}
