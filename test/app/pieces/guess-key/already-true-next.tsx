import { useState } from 'react';

/** A Space-only `div` delete button; the E2E then checks that no error alert is shown. */
export function Page(): React.JSX.Element {
  const [isDeleted, setIsDeleted] = useState(false);
  return (
    <main>
      {!isDeleted && <p>오래된 주소</p>}
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          setIsDeleted(true);
        }}
        onKeyDown={(event) => {
          if (event.key === ' ') {
            event.preventDefault();
            setIsDeleted(true);
          }
        }}
      >
        주소 삭제
      </div>
    </main>
  );
}
