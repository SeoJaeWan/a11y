import { useState } from 'react';

const CITIES = ['서울', '부산', '부천', '대구'];

/** A city combobox whose suggestions follow `aria-activedescendant`. */
export function Page(): React.JSX.Element {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const matches = value === '' ? [] : CITIES.filter((city) => city.startsWith(value));
  const isShown = isOpen && matches.length > 0;

  /**
   * Puts a suggestion in the field and closes the list.
   * @param city Chosen suggestion.
   */
  function choose(city: string): void {
    setValue(city);
    setIsOpen(false);
    setActive(-1);
  }

  return (
    <main>
      <label htmlFor="city">도착 도시</label>
      <input
        id="city"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isShown}
        aria-controls="city-list"
        aria-activedescendant={isShown && active >= 0 ? `city-${String(active)}` : undefined}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setIsOpen(true);
          setActive(-1);
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActive((index) => Math.min(index + 1, matches.length - 1));
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActive((index) => Math.max(index - 1, 0));
          } else if (event.key === 'Enter') {
            const city = matches[active];
            if (city !== undefined) {
              event.preventDefault();
              choose(city);
            }
          }
        }}
      />
      <ul id="city-list" role="listbox" aria-label="도시 제안" hidden={!isShown}>
        {matches.map((city, index) => (
          <li
            key={city}
            id={`city-${String(index)}`}
            role="option"
            aria-selected={index === active}
            onClick={() => {
              choose(city);
            }}
          >
            {city}
          </li>
        ))}
      </ul>
    </main>
  );
}
