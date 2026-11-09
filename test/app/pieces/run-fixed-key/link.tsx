/** A link to the refund policy; the same page shows the policy when opened with `?doc=refund`. */
export function Page(): React.JSX.Element {
  const isPolicy = new URLSearchParams(window.location.search).get('doc') === 'refund';
  if (isPolicy) {
    return (
      <main>
        <h1>환불 규정</h1>
        <p>예약일 3일 전까지 전액 환불됩니다.</p>
      </main>
    );
  }
  return (
    <main>
      <a href="/pieces/run-fixed-key/link?doc=refund">환불 규정 보기</a>
    </main>
  );
}
