/** A memo field built with `contenteditable`. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <div contentEditable role="textbox" aria-multiline="true" aria-label="메모" />
    </main>
  );
}
