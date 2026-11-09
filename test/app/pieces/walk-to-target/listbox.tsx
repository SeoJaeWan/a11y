import { useState } from 'react';

const OPTIONS = ['일반석', '프리미엄', '비즈니스'];

/** A seat class list whose options take focus (APG listbox, up and down arrows); the E2E picks the third. */
export function Page(): React.JSX.Element {
  const [selected, setSelected] = useState(0);
  return (
    <main>
      <h1>좌석 선택</h1>
      <ul
        role="listbox"
        aria-label="좌석 등급"
        onKeyDown={(event) => {
          const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
          if (step === undefined) return;
          event.preventDefault();
          const next = (selected + step + OPTIONS.length) % OPTIONS.length;
          setSelected(next);
          event.currentTarget.querySelectorAll<HTMLElement>('[role="option"]')[next]?.focus();
        }}
      >
        {OPTIONS.map((option, index) => (
          <li
            key={option}
            role="option"
            aria-selected={index === selected}
            tabIndex={index === selected ? 0 : -1}
            onClick={() => {
              setSelected(index);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
      <p role="status">{`${OPTIONS[selected] ?? ''} 선택됨`}</p>
    </main>
  );
}
