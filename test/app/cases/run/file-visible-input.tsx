import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Claim form with a plain, visible file input. */
export function Page(): React.JSX.Element {
  const [fileName, setFileName] = useState('');
  return (
    <SiteLayout title="증빙 서류 제출">
      <label>
        증빙 서류
        <input
          type="file"
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? '');
          }}
        />
      </label>
      <p role="status">{fileName ? `${fileName} 첨부됨` : ''}</p>
    </SiteLayout>
  );
}
