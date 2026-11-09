import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const OPTIONS = ['일반 배송', '빠른 배송', '새벽 배송'];

/** Delivery options as native radio buttons, the first one checked. */
export function Page(): React.JSX.Element {
  const [delivery, setDelivery] = useState('일반 배송');
  return (
    <SiteLayout title="주문서">
      <fieldset>
        <legend>배송 방법</legend>
        {OPTIONS.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="delivery"
              checked={delivery === option}
              onChange={() => {
                setDelivery(option);
              }}
            />
            {option}
          </label>
        ))}
      </fieldset>
      <p role="status">{delivery}으로 받습니다</p>
    </SiteLayout>
  );
}
