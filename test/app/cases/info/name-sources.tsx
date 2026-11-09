import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Booking search: a labelled input and an icon button named by `aria-label`. */
export function Page(): React.JSX.Element {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  return (
    <SiteLayout title="예약 찾기">
      <form
        className="search-bar"
        onSubmit={(event) => {
          event.preventDefault();
          setResult(`${query} 예약 1건`);
        }}
      >
        <label htmlFor="booking-number">예약 번호</label>
        <input
          id="booking-number"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        <button type="submit" aria-label="검색">
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" />
            <path d="M13 13l5 5" stroke="currentColor" />
          </svg>
        </button>
      </form>
      <p role="status">{result}</p>
    </SiteLayout>
  );
}
