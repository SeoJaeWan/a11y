/** A checkout page with a coupon button and a same-origin payment widget iframe. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <h1>결제</h1>
      <button type="button">쿠폰 적용</button>
      <iframe title="결제 위젯" src="/pieces/walk-to-target/payment-widget" />
    </main>
  );
}
