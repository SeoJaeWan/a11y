import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const CITIES = ['서울', '서귀포', '서산', '부산', '대구'];

/** Flight search whose suggestions are plain `div`s with click handlers and no roles. */
export function Page(): React.JSX.Element {
  const [text, setText] = useState('');
  const [city, setCity] = useState('');
  const matches = text ? CITIES.filter((item) => item.startsWith(text)) : [];
  const isOpen = matches.length > 0 && city !== text;
  return (
    <SiteLayout title="항공권 검색">
      <label>
        도착 도시
        <input
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setCity('');
          }}
        />
      </label>
      {isOpen && (
        <div style={{ border: '1px solid #888' }}>
          {matches.map((item) => (
            <div
              key={item}
              style={{ padding: '4px 8px', cursor: 'pointer' }}
              onClick={() => {
                setText(item);
                setCity(item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
      <button type="button">검색</button>
      <p role="status">{city ? `도착 도시: ${city}` : ''}</p>
    </SiteLayout>
  );
}
