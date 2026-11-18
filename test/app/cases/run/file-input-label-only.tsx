import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Upload control made of a focusable label and a hidden file input; the label handles no key. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <SiteLayout title="프로필 사진">
      <label htmlFor="photo" tabIndex={0} className="upload-button">
        올리기
      </label>
      <input
        id="photo"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(event) => {
          const file = event.target.files?.[0];
          setMessage(file ? `${file.name}을 올렸습니다` : '');
        }}
      />
      <p role="status">{message}</p>
    </SiteLayout>
  );
}
