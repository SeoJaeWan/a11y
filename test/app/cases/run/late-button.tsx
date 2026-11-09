import { useEffect, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Coupon box: the coupon and its button show up after the list loads. */
export function Page(): React.JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReceived, setIsReceived] = useState(false);
  useEffect(() => {
    // Stands in for loading the coupon list from a server.
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <SiteLayout title="쿠폰함">
      {isLoaded ? (
        <div>
          <p>첫 예약 10% 할인</p>
          <button
            type="button"
            onClick={() => {
              setIsReceived(true);
            }}
          >
            쿠폰 받기
          </button>
        </div>
      ) : (
        <p>불러오는 중</p>
      )}
      <p role="status">{isReceived ? '쿠폰을 받았습니다' : ''}</p>
    </SiteLayout>
  );
}
