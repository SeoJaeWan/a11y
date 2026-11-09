import { useRef, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Upload area built like react-dropzone: a focusable `div` wraps a hidden file input. */
export function Page(): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  return (
    <SiteLayout title="사진 올리기">
      <div
        role="presentation"
        tabIndex={0}
        style={{ padding: '24px', border: '2px dashed #888' }}
        onClick={() => {
          inputRef.current?.click();
        }}
        onKeyDown={(event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          tabIndex={-1}
          style={{ display: 'none' }}
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? '');
          }}
        />
        <p>파일을 여기로 끌어 놓거나 눌러서 고르세요</p>
      </div>
      <p role="status">{fileName ? `${fileName} 올림` : ''}</p>
    </SiteLayout>
  );
}
