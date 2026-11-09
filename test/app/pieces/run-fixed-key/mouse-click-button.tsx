import { useState } from 'react';

/** A save button pinned to the top-left corner; the E2E clicks it by coordinates. */
export function Page(): React.JSX.Element {
  const [isSaved, setIsSaved] = useState(false);
  return (
    <main>
      <button
        type="button"
        style={{ position: 'fixed', left: 0, top: 0, width: 120, height: 40 }}
        onClick={() => {
          setIsSaved(true);
        }}
      >
        저장
      </button>
      <p role="status" style={{ marginTop: 60 }}>
        {isSaved ? '저장했습니다' : ''}
      </p>
    </main>
  );
}
