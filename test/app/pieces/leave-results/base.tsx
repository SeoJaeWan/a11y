import { useState } from 'react';

/** A save button and a status line: the smallest test record. */
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
        저장
      </button>
      <p role="status">{isSaved ? '저장했습니다' : ''}</p>
    </main>
  );
}
