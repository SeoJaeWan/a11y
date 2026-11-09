import { useEffect, useState } from 'react';

/** An order page whose order button shows up after the price loads. */
export function Page(): React.JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <main>
      <p data-testid="total">{isLoaded ? '32,000원' : '불러오는 중'}</p>
      {isLoaded && (
        <button
          type="button"
          onClick={() => {
            setIsOrdered(true);
          }}
        >
          주문하기
        </button>
      )}
      <p role="status">{isOrdered ? '32,000원 결제를 요청했습니다' : ''}</p>
    </main>
  );
}
