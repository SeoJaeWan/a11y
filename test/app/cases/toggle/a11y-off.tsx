import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Memo page with a save button, run without the accessibility run turned on. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <SiteLayout title="메모">
      <button
        type="button"
        onClick={() => {
          setMessage('저장했습니다');
        }}
      >
        저장
      </button>
      <p role="status">{message}</p>
    </SiteLayout>
  );
}
