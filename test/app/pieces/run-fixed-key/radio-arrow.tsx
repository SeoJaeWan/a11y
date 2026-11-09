import { useState } from 'react';

const OPTIONS = [
  { value: 'normal', label: '일반 배송', fee: '무료' },
  { value: 'fast', label: '빠른 배송', fee: '3,000원' },
  { value: 'same-day', label: '당일 배송', fee: '5,000원' },
];

/** Delivery radios with the first one selected; the E2E picks the last one. */
export function Page(): React.JSX.Element {
  const [delivery, setDelivery] = useState('normal');
  const fee = OPTIONS.find((option) => option.value === delivery)?.fee ?? '';
  return (
    <main>
      <fieldset>
        <legend>배송 방법</legend>
        {OPTIONS.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name="delivery"
              value={option.value}
              checked={delivery === option.value}
              onChange={() => {
                setDelivery(option.value);
              }}
            />{' '}
            {option.label}
          </label>
        ))}
      </fieldset>
      <p role="status">배송비 {fee}</p>
    </main>
  );
}
