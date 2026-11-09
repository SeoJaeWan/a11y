/** A volume slider. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <label>
        음량 <input type="range" min={0} max={10} step={1} defaultValue={5} />
      </label>
    </main>
  );
}
