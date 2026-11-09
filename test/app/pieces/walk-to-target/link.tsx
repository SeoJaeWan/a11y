/** A booking guide with a link that jumps to the refund rules. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <h1>예약 안내</h1>
      <button type="button">예약하기</button>
      <a href="#refund">환불 규정</a>
      <section aria-labelledby="refund">
        <h2 id="refund">환불 규정</h2>
        <p>이용 3일 전까지 전액 환불합니다.</p>
      </section>
    </main>
  );
}
