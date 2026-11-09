import { useState } from 'react';

/** A search field that searches when Enter is pressed. */
export function Page(): React.JSX.Element {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  return (
    <main>
      <input
        type="search"
        aria-label="상품 검색"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') setResult(`"${query}" 검색 결과`);
        }}
      />
      <p role="status">{result}</p>
    </main>
  );
}
