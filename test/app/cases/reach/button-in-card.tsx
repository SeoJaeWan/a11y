import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Search result card that takes focus and opens the detail; the save button sits inside it. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <SiteLayout title="검색 결과">
      <article
        tabIndex={0}
        style={{ border: '1px solid', padding: 16 }}
        onClick={() => {
          setMessage('바다 호텔 상세를 열었습니다');
        }}
        onKeyDown={(event) => {
          if (event.target === event.currentTarget && event.key === 'Enter') {
            setMessage('바다 호텔 상세를 열었습니다');
          }
        }}
      >
        <h2>바다 호텔</h2>
        <p>1박 32,000원부터</p>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setMessage('바다 호텔을 찜했습니다');
          }}
        >
          찜하기
        </button>
      </article>
      <p role="status">{message}</p>
    </SiteLayout>
  );
}
