import { useState } from 'react';

const FRUITS = ['사과', '바나나', '포도'];

/** Fruit cards with the same "담기" button; the E2E uses non-strict `page.click(selector)`. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>과일</h1>
      <ul>
        {FRUITS.map((fruit, index) => (
          <li key={fruit}>
            <article aria-labelledby={`fruit-${String(index)}`}>
              <h2 id={`fruit-${String(index)}`}>{fruit}</h2>
              <button
                type="button"
                className="add-to-cart"
                onClick={() => {
                  setMessage(`장바구니: ${fruit}`);
                }}
              >
                담기
              </button>
            </article>
          </li>
        ))}
      </ul>
      <p role="status">{message}</p>
    </main>
  );
}
