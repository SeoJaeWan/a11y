import { useState } from 'react';

/** A photo viewer with icon-only previous and next buttons that have no name. */
export function Page(): React.JSX.Element {
  const [isSaved, setIsSaved] = useState(false);
  return (
    <main>
      <button type="button">
        <svg aria-hidden="true" width="16" height="16">
          <path d="M12 2 4 8l8 6" />
        </svg>
      </button>
      <button type="button">
        <svg aria-hidden="true" width="16" height="16">
          <path d="m4 2 8 6-8 6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => {
          setIsSaved(true);
        }}
      >
        사진 저장
      </button>
      <p role="status">{isSaved ? '사진을 저장했습니다' : ''}</p>
    </main>
  );
}
