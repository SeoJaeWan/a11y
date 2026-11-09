import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const REQUEST = '창가 자리 부탁드립니다';

/** Booking request note edited by double-click, with Space as the only key way in. */
export function Page(): React.JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  /** Switches the note to its edit box. */
  function startEditing(): void {
    setIsEditing(true);
  }
  return (
    <SiteLayout title="요청 사항">
      <p>두 번 눌러 고칠 수 있습니다.</p>
      {isEditing ? (
        <label>
          요청 사항
          <textarea defaultValue={REQUEST} />
        </label>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onDoubleClick={startEditing}
          onKeyDown={(event) => {
            if (event.key === ' ') {
              event.preventDefault();
              startEditing();
            }
          }}
        >
          {REQUEST}
        </div>
      )}
    </SiteLayout>
  );
}
