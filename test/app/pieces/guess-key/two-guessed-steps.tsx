import { useState } from 'react';

type DivButtonProps = { label: string; onPress: () => void };

/**
 * A `div` button that handles Space but not Enter.
 * @param props Button text and what it does.
 */
function DivButton({ label, onPress }: DivButtonProps): React.JSX.Element {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onPress}
      onKeyDown={(event) => {
        if (event.key === ' ') {
          event.preventDefault();
          onPress();
        }
      }}
    >
      {label}
    </div>
  );
}

/** Two `div` buttons in a row, both Space only: take a coupon, then apply it. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <DivButton
        label="쿠폰 받기"
        onPress={() => {
          setMessage('쿠폰을 받았습니다');
        }}
      />
      <DivButton
        label="쿠폰 적용"
        onPress={() => {
          setMessage('쿠폰을 적용했습니다');
        }}
      />
      <p role="status">{message}</p>
    </main>
  );
}
