/** Notification settings with a same-origin preview iframe that holds a button. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <h1>알림 설정</h1>
      <iframe title="알림 미리보기" src="/pieces/record-stop-info/preview-frame" />
    </main>
  );
}
