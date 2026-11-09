import { useState } from 'react';

const PRODUCTS = [...Array(60).keys()].map((index) => `상품 ${String(index + 1)}`);

/** A long product list: the "더 보기" button comes after 60 product links. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>전체 상품</h1>
      <ul>
        {PRODUCTS.map((product, index) => (
          <li key={product}>
            <a href={`#product-${String(index + 1)}`}>{product}</a>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => {
          setMessage('상품을 더 불러왔습니다');
        }}
      >
        더 보기
      </button>
      <p role="status">{message}</p>
    </main>
  );
}
