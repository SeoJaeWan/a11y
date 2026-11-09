import { useState } from 'react';

const CITIES = ['서울', '서산', '서귀포', '부산'];

/** A city search whose suggestions are plain clickable `div`s with no roles or relations. */
export function Page(): React.JSX.Element {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const matches = value === '' ? [] : CITIES.filter((city) => city.startsWith(value));
  return (
    <main>
      <h1>여행지 검색</h1>
      <label htmlFor="city">도시</label>
      <input
        id="city"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setIsOpen(true);
        }}
      />
      {isOpen && (
        <div className="suggestions">
          {matches.map((city) => (
            <div
              key={city}
              onClick={() => {
                setValue(city);
                setIsOpen(false);
              }}
            >
              {city}
            </div>
          ))}
        </div>
      )}
      <button type="button">검색</button>
    </main>
  );
}
