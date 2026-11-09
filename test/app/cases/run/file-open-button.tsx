import { useRef, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Profile photo: a hidden file input opened by a button next to it, beside a delete button. */
export function Page(): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('기본 사진');
  return (
    <SiteLayout title="내 정보">
      <section aria-labelledby="photo-heading">
        <h2 id="photo-heading">프로필 사진</h2>
        <input
          ref={inputRef}
          type="file"
          hidden
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? '기본 사진');
          }}
        />
        <button
          type="button"
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          사진 변경
        </button>
        <button
          type="button"
          onClick={() => {
            setFileName('기본 사진');
          }}
        >
          사진 삭제
        </button>
        <p role="status">현재 사진: {fileName}</p>
      </section>
    </SiteLayout>
  );
}
