import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Profile photo field: a plain, visible file input with a label. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <SiteLayout title="프로필 사진">
      <label>
        프로필 사진
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            setMessage(file ? `${file.name}을 올렸습니다` : '');
          }}
        />
      </label>
      <p role="status">{message}</p>
    </SiteLayout>
  );
}
