import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Search result card that opens on click and holds two links. */
export function Page(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SiteLayout title="검색 결과">
      <article
        style={{ border: '1px solid', padding: 16 }}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <h2>바다 호텔</h2>
        <p>해변까지 걸어서 3분, 오션뷰 객실과 조식이 포함된 호텔입니다.</p>
        <p>1박 32,000원부터</p>
        <a href="/">리뷰 보기</a> <a href="/">지도 보기</a>
      </article>
      {isOpen && <p role="status">바다 호텔 상세를 열었습니다</p>}
    </SiteLayout>
  );
}
