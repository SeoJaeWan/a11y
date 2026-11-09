import { useState } from 'react';

/** A sort button that opens its menu on `mousedown`, as some dropdown libraries do. */
export function Page(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main>
      <button
        type="button"
        aria-expanded={isOpen}
        onMouseDown={() => {
          setIsOpen((isShown) => !isShown);
        }}
      >
        정렬
      </button>
      {isOpen && (
        <ul aria-label="정렬 기준">
          <li>최신순</li>
          <li>가격순</li>
        </ul>
      )}
    </main>
  );
}
