import { useState } from 'react';

const CITIES = ['서울', '서산', '서귀포', '부산'];

/** A city combobox whose suggestions are a listbox (`aria-controls`, `aria-activedescendant`). */
export function Page(): React.JSX.Element {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const matches = value === '' ? [] : CITIES.filter((city) => city.startsWith(value));
  const isExpanded = isOpen && matches.length > 0;
  return (
    <main>
      <h1>여행지 검색</h1>
      <label htmlFor="city">도시</label>
      <input
        id="city"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isExpanded}
        aria-controls="city-list"
        aria-activedescendant={isExpanded && active >= 0 ? `city-${String(active)}` : undefined}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setIsOpen(true);
          setActive(-1);
        }}
        onKeyDown={(event) => {
          const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
          if (step !== undefined && isExpanded) {
            event.preventDefault();
            setActive(Math.min(Math.max(active + step, 0), matches.length - 1));
          }
          if (event.key === 'Enter' && isExpanded && active >= 0) {
            setValue(matches[active] ?? value);
            setIsOpen(false);
          }
        }}
      />
      <ul id="city-list" role="listbox" aria-label="도시 제안" hidden={!isExpanded}>
        {matches.map((city, index) => (
          <li
            key={city}
            id={`city-${String(index)}`}
            role="option"
            aria-selected={index === active}
            onClick={() => {
              setValue(city);
              setIsOpen(false);
            }}
          >
            {city}
          </li>
        ))}
      </ul>
      <button type="button">검색</button>
    </main>
  );
}
