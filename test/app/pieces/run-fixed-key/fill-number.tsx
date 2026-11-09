/** A quantity field. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <label>
        수량 <input type="number" min={1} />
      </label>
    </main>
  );
}
