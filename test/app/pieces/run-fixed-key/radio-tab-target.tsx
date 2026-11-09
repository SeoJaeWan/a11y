/** Payment radios with nothing selected; the E2E picks the first one. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <fieldset>
        <legend>결제 수단</legend>
        <label>
          <input type="radio" name="payment" value="card" /> 카드
        </label>
        <label>
          <input type="radio" name="payment" value="bank" /> 계좌이체
        </label>
        <label>
          <input type="radio" name="payment" value="phone" /> 휴대폰
        </label>
      </fieldset>
    </main>
  );
}
