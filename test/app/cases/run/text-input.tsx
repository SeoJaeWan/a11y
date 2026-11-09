import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Booker name input that echoes the name as it is typed. */
export function Page(): React.JSX.Element {
  const [name, setName] = useState('');
  return (
    <SiteLayout title="예약자 정보">
      <label>
        예약자 이름
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </label>
      <p role="status">{name ? `${name} 님으로 예약합니다` : ''}</p>
    </SiteLayout>
  );
}
