/** An email field named by a `label for`. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <h1>알림 설정</h1>
      <label htmlFor="email">알림 받을 이메일</label>
      <input id="email" type="email" />
    </main>
  );
}
