/** A required nickname field. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <h1>알림 설정</h1>
      <label>
        알림에 쓸 이름 <input required />
      </label>
    </main>
  );
}
