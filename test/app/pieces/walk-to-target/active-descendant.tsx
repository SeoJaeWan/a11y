import { useState } from 'react';

const OPTIONS = ['추천순', '낮은 가격순', '높은 가격순'];

/** A sort list that keeps focus and moves `aria-activedescendant`; the E2E picks the third option. */
export function Page(): React.JSX.Element {
  const [active, setActive] = useState(-1);
  const [selected, setSelected] = useState(-1);
  return (
    <main>
      <h1>검색 결과</h1>
      <ul
        role="listbox"
        aria-label="정렬"
        tabIndex={0}
        aria-activedescendant={active >= 0 ? `sort-${String(active)}` : undefined}
        onFocus={() => {
          if (active < 0) setActive(0);
        }}
        onKeyDown={(event) => {
          const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
          if (step !== undefined) {
            event.preventDefault();
            setActive(Math.min(Math.max(active + step, 0), OPTIONS.length - 1));
          }
          if (event.key === 'Enter') setSelected(active);
        }}
      >
        {OPTIONS.map((option, index) => (
          <li
            key={option}
            id={`sort-${String(index)}`}
            role="option"
            aria-selected={index === selected}
            onClick={() => {
              setActive(index);
              setSelected(index);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
      <p role="status">{selected >= 0 ? `${OPTIONS[selected] ?? ''}으로 정렬` : ''}</p>
    </main>
  );
}
