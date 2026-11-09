/** Delivery options as native radios in a `radiogroup`; the E2E checks the third one. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <h1>주문서</h1>
      <div role="radiogroup" aria-label="배송 방법">
        <label>
          <input type="radio" name="delivery" defaultChecked /> 일반 배송
        </label>
        <label>
          <input type="radio" name="delivery" /> 빠른 배송
        </label>
        <label>
          <input type="radio" name="delivery" /> 새벽 배송
        </label>
      </div>
    </main>
  );
}
