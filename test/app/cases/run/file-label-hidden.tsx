import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Upload button made of a `label` that wraps a `hidden` file input. */
export function Page(): React.JSX.Element {
  const [fileName, setFileName] = useState('');
  return (
    <SiteLayout title="리뷰 사진">
      <label style={{ display: 'inline-block', padding: '6px 12px', border: '1px solid #888' }}>
        사진 올리기
        <input
          type="file"
          hidden
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? '');
          }}
        />
      </label>
      <p role="status">{fileName ? `${fileName} 올림` : ''}</p>
    </SiteLayout>
  );
}
