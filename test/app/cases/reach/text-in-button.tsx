import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Room page whose cart button holds an icon and a text span. */
export function Page(): React.JSX.Element {
  const [isAdded, setIsAdded] = useState(false);
  return (
    <SiteLayout title="바다 호텔">
      <p>디럭스 더블, 1박 32,000원</p>
      <button
        type="button"
        onClick={() => {
          setIsAdded(true);
        }}
      >
        <svg width="16" height="16" aria-hidden="true">
          <circle cx="8" cy="8" r="6" />
        </svg>
        <span>장바구니 담기</span>
      </button>
      <p role="status">{isAdded ? '장바구니에 담았습니다' : ''}</p>
    </SiteLayout>
  );
}
