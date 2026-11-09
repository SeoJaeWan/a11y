import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Store map with an icon-only pin button placed at a fixed spot on the map. */
export function Page(): React.JSX.Element {
  const [store, setStore] = useState('');
  return (
    <SiteLayout title="매장 찾기">
      <p role="status">{store ? `${store}: 서울 강남구 테헤란로 1` : ''}</p>
      <div
        style={{
          position: 'absolute',
          top: '200px',
          left: '40px',
          width: '480px',
          height: '320px',
          background: '#dde8d0',
        }}
      >
        <button
          type="button"
          aria-label="강남점"
          style={{
            position: 'absolute',
            top: '40px',
            left: '240px',
            width: '40px',
            height: '40px',
            padding: 0,
            border: 'none',
            borderRadius: '50%',
            background: '#d33',
          }}
          onClick={() => {
            setStore('강남점');
          }}
        >
          <svg width="16" height="16" aria-hidden="true">
            <circle cx="8" cy="8" r="6" fill="white" />
          </svg>
        </button>
      </div>
    </SiteLayout>
  );
}
