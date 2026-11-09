import { useState } from 'react';

/** A product card that opens on click and holds two links. */
export function Page(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main>
      <div
        data-testid="product-card"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <h2>무선 이어폰</h2>
        <a href="/">리뷰 보기</a>
        <a href="/">판매자 정보</a>
      </div>
      {isOpen && <p role="status">상품 상세를 열었습니다</p>}
    </main>
  );
}
