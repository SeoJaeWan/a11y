/** A newsletter checkbox that starts checked; the E2E unchecks it. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <h1>알림 설정</h1>
      <label>
        <input type="checkbox" defaultChecked /> 뉴스레터 받기
      </label>
    </main>
  );
}
