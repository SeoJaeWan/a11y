import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const CITIES = ['서울', '서귀포', '서산', '부산', '대구'];

/** Flight search with an ARIA combobox: suggestions in a listbox, moved by `aria-activedescendant`. */
export function Page(): React.JSX.Element {
  const [text, setText] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [city, setCity] = useState('');
  const matches = text ? CITIES.filter((item) => item.startsWith(text)) : [];
  const isOpen = matches.length > 0 && city !== text;

  /**
   * Takes a suggestion as the chosen city.
   * @param chosen City name picked from the list.
   */
  function choose(chosen: string): void {
    setText(chosen);
    setCity(chosen);
    setActiveIndex(-1);
  }

  return (
    <SiteLayout title="항공권 검색">
      <label htmlFor="city">도착 도시</label>
      <input
        id="city"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls="city-list"
        aria-activedescendant={
          isOpen && activeIndex >= 0 ? `city-${String(activeIndex)}` : undefined
        }
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          setCity('');
          setActiveIndex(-1);
        }}
        onKeyDown={(event) => {
          if (!isOpen) return;
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((index) => Math.min(index + 1, matches.length - 1));
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((index) => Math.max(index - 1, 0));
          } else if (event.key === 'Enter') {
            const active = matches[activeIndex];
            if (active) choose(active);
          }
        }}
      />
      <ul id="city-list" role="listbox" aria-label="도시 제안" hidden={!isOpen}>
        {matches.map((item, index) => (
          <li
            key={item}
            id={`city-${String(index)}`}
            role="option"
            aria-selected={index === activeIndex}
            onClick={() => {
              choose(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      <button type="button">검색</button>
      <p role="status">{city ? `도착 도시: ${city}` : ''}</p>
    </SiteLayout>
  );
}
