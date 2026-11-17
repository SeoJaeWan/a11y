import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const PLACES = ['제주 제주시', '제주 서귀포', '부산 해운대'];

/** Place search built as an ARIA combobox: focus stays in the input and arrows move through the list. */
export function Page(): React.JSX.Element {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [place, setPlace] = useState('');
  const matches = query === '' ? [] : PLACES.filter((item) => item.startsWith(query));
  const isListShown = isOpen && matches.length > 0;

  /**
   * Picks a place, closes the list, and shows the hotels there.
   * @param picked Place the user chose.
   */
  function pick(picked: string): void {
    setPlace(picked);
    setQuery(picked);
    setIsOpen(false);
    setActive(-1);
  }

  /**
   * Moves through the suggestions with the up and down arrows and picks with Enter.
   * @param event Key pressed in the input.
   */
  function handleKeyDown(event: React.KeyboardEvent): void {
    if (!isListShown) return;
    if (event.key === 'Enter' && active >= 0) {
      // Without this the same Enter also presses whatever takes focus next.
      event.preventDefault();
      pick(matches[active] ?? '');
      return;
    }
    const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
    if (step === undefined) return;
    event.preventDefault();
    setActive((Math.max(active, step > 0 ? -1 : 0) + step + matches.length) % matches.length);
  }

  return (
    <SiteLayout title="여행지 찾기">
      <input
        role="combobox"
        placeholder="여행지 검색"
        aria-autocomplete="list"
        aria-expanded={isListShown}
        aria-controls="places"
        aria-activedescendant={active >= 0 ? `place-${String(active)}` : undefined}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
          setActive(-1);
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setIsOpen(false);
        }}
      />
      {isListShown && (
        <ul id="places" role="listbox" aria-label="여행지">
          {matches.map((item, index) => (
            <li
              key={item}
              id={`place-${String(index)}`}
              role="option"
              aria-selected={index === active}
              // Keeps focus in the input, so the list does not close before the click lands.
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              onClick={() => {
                pick(item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {place !== '' && (
        <section>
          <h2>{place} 숙소</h2>
          <a href="/cases/journey/hotel">바다 호텔</a>
        </section>
      )}
    </SiteLayout>
  );
}
