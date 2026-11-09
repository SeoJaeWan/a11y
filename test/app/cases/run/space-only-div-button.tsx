import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Seat choice made from a `div role="button"` whose key handler only knows Space. */
export function Page(): React.JSX.Element {
  const [isChosen, setIsChosen] = useState(false);
  /** Marks the window seat as chosen. */
  function choose(): void {
    setIsChosen(true);
  }
  return (
    <SiteLayout title="좌석 선택">
      <p>창가 좌석이 1석 남았습니다.</p>
      <div
        role="button"
        tabIndex={0}
        onClick={choose}
        onKeyDown={(event) => {
          if (event.key === ' ') {
            event.preventDefault();
            choose();
          }
        }}
      >
        창가 좌석 선택
      </div>
      <p role="status">{isChosen ? '창가 좌석을 선택했습니다' : ''}</p>
    </SiteLayout>
  );
}
