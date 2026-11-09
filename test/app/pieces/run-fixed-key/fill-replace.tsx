/** A name field that already holds a value. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <label>
        이름 <input type="text" defaultValue="홍길동" />
      </label>
    </main>
  );
}
