/** A checkbox wrapped in its label; the E2E points at the label text. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <label>
        <input type="checkbox" /> 약관에 동의합니다
      </label>
    </main>
  );
}
