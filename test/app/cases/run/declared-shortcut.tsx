import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const NAME = '가족 모임';

/** Saved booking renamed by double-click, declaring and handling F2 for keyboard users. */
export function Page(): React.JSX.Element {
  const [isRenaming, setIsRenaming] = useState(false);
  /** Switches the name to its edit box. */
  function startRenaming(): void {
    setIsRenaming(true);
  }
  return (
    <SiteLayout title="저장한 예약">
      <p>이름을 두 번 누르거나 F2를 눌러 바꿀 수 있습니다.</p>
      {isRenaming ? (
        <label>
          예약 이름
          <input defaultValue={NAME} />
        </label>
      ) : (
        <button
          type="button"
          aria-keyshortcuts="F2"
          onDoubleClick={startRenaming}
          onKeyDown={(event) => {
            if (event.key === 'F2') startRenaming();
          }}
        >
          {NAME}
        </button>
      )}
    </SiteLayout>
  );
}
