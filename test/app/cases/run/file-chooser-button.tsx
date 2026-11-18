import { useRef, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Upload button that opens a hidden file input from script; the test presses the button. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <SiteLayout title="프로필 사진">
      <button
        type="button"
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        올리기
      </button>
      <input
        ref={inputRef}
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
