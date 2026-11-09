import { useState } from 'react';

/** A photo album item that declares F2 but only renames on Enter or double-click. */
export function Page(): React.JSX.Element {
  const [isRenaming, setIsRenaming] = useState(false);
  return (
    <main>
      <ul aria-label="앨범">
        {isRenaming ? (
          <li>
            <input aria-label="새 이름" defaultValue="여행 사진" />
          </li>
        ) : (
          <li
            tabIndex={0}
            aria-keyshortcuts="F2"
            onDoubleClick={() => {
              setIsRenaming(true);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') setIsRenaming(true);
            }}
          >
            여행 사진
          </li>
        )}
      </ul>
    </main>
  );
}
