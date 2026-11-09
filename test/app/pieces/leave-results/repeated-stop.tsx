import { useState } from 'react';

/** An icon-only search button with no name, then a save button. */
export function Page(): React.JSX.Element {
  const [isSaved, setIsSaved] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <main>
      <button
        type="button"
        data-testid="search-button"
        onClick={() => {
          setIsSearchOpen(true);
        }}
      >
        <svg aria-hidden="true" width="16" height="16">
          <circle cx="7" cy="7" r="5" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => {
          setIsSaved(true);
        }}
      >
        저장
      </button>
      <p role="status">{isSaved ? '저장했습니다' : ''}</p>
      {isSearchOpen && <input type="search" aria-label="검색어" />}
    </main>
  );
}
