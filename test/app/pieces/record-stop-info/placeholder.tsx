/** A keyword field whose only name is its placeholder. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <h1>알림 설정</h1>
      <input placeholder="알림 받을 키워드" />
    </main>
  );
}
