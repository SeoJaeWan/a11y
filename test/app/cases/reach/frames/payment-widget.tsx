/** Payment widget shown inside the checkout iframe. It tells the parent page when paid. */
export function Page(): React.JSX.Element {
  return (
    <div>
      <h2>카드 결제</h2>
      <p>결제 금액 32,000원</p>
      <a href="/">결제 약관</a>
      <button
        type="button"
        onClick={() => {
          window.parent.postMessage('paid', '*');
        }}
      >
        결제하기
      </button>
    </div>
  );
}
