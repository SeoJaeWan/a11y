import { useState } from 'react';

const PRODUCTS = Array.from({ length: 60 }, (item, index) => `상품 ${String(index + 1)}`);

/** Sixty product links, then a "more" control that is only a clickable `div`. */
export function Page(): React.JSX.Element {
  const [isMore, setIsMore] = useState(false);
  return (
    <main>
      <ul aria-label="상품">
        {PRODUCTS.map((product) => (
          <li key={product}>
            <a href={`#${product}`}>{product}</a>
          </li>
        ))}
      </ul>
      <div
        onClick={() => {
          setIsMore(true);
        }}
      >
        더 보기
      </div>
      <p role="status">{isMore ? '상품을 더 불러왔습니다' : ''}</p>
    </main>
  );
}
