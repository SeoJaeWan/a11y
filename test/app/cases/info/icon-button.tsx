import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Room detail with share and favorite buttons that show only an icon. */
export function Page(): React.JSX.Element {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <SiteLayout title="바다 전망 객실">
      <p>1박 120,000원 · 최대 2명</p>
      <div className="room-actions">
        <button type="button" data-testid="share-button">
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M14 3l4 4-4 4M18 7H8a5 5 0 0 0-5 5v5" fill="none" stroke="currentColor" />
          </svg>
        </button>
        <button
          type="button"
          data-testid="favorite-button"
          onClick={() => {
            setIsFavorite(true);
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M10 17s-7-4.5-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 17 8c0 4.5-7 9-7 9z"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
            />
          </svg>
        </button>
      </div>
      <p role="status">{isFavorite ? '관심 객실에 담았습니다' : ''}</p>
    </SiteLayout>
  );
}
