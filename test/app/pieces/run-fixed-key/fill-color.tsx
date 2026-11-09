/** A theme color picker. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <label>
        테마 색 <input type="color" defaultValue="#336699" />
      </label>
    </main>
  );
}
