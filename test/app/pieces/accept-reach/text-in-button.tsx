import { useState } from 'react';

/** A save button whose label sits in a span; the E2E points at the text. */
export function Page(): React.JSX.Element {
  const [isSaved, setIsSaved] = useState(false);
  return (
    <main>
      <button
        type="button"
        onClick={() => {
          setIsSaved(true);
        }}
      >
        <span>저장</span>
      </button>
      <p role="status">{isSaved ? '저장했습니다' : ''}</p>
    </main>
  );
}
