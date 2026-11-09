import { useRef } from 'react';

/** A styled search field: clicking the wrapper focuses the input inside. */
export function Page(): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <main>
      <div
        data-testid="search-field"
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        <span aria-hidden="true">🔍</span>
        <input ref={inputRef} aria-label="검색어" />
      </div>
    </main>
  );
}
