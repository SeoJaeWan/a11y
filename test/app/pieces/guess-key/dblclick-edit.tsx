import { useState } from 'react';

/** A shopping list item that turns into a text field on double-click, or on Space. */
export function Page(): React.JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <main>
      <ul aria-label="장보기 목록">
        {isEditing ? (
          <li>
            <input aria-label="항목 이름" defaultValue="우유 사기" />
          </li>
        ) : (
          <li
            tabIndex={0}
            onDoubleClick={() => {
              setIsEditing(true);
            }}
            onKeyDown={(event) => {
              if (event.key === ' ') {
                event.preventDefault();
                setIsEditing(true);
              }
            }}
          >
            우유 사기
          </li>
        )}
      </ul>
    </main>
  );
}
