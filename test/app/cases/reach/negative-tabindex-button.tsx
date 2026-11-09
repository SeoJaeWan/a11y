import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Room page whose cart button was taken out of the Tab order with `tabindex="-1"`. */
export function Page(): React.JSX.Element {
  const [isAdded, setIsAdded] = useState(false);
  return (
    <SiteLayout title="바다 호텔">
      <p>디럭스 더블, 1박 32,000원</p>
      <button
        type="button"
        tabIndex={-1}
        onClick={() => {
          setIsAdded(true);
        }}
      >
        장바구니 담기
      </button>
      <p role="status">{isAdded ? '장바구니에 담았습니다' : ''}</p>
    </SiteLayout>
  );
}
