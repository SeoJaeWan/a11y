/** A quantity field named by a nearby text through `aria-labelledby`. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <h1>알림 설정</h1>
      <span id="count-label">하루 최대 알림 수</span>
      <input aria-labelledby="count-label" />
    </main>
  );
}
