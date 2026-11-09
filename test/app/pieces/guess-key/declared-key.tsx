import { useState } from 'react';

/** A photo album item renamed on double-click; it declares F2 and handles it. */
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
              if (event.key === 'F2') setIsRenaming(true);
            }}
          >
            여행 사진
          </li>
        )}
      </ul>
    </main>
  );
}
