import { useState } from 'react';

/** A search form: the E2E fills the field, then presses Enter on the same field. */
export function Page(): React.JSX.Element {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  return (
    <main>
      <h1>상품 검색</h1>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          setResult(`${query} 검색 결과`);
        }}
      >
        <label>
          검색어{' '}
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
        </label>
        <button type="submit">검색</button>
      </form>
      <p role="status">{result}</p>
    </main>
  );
}
