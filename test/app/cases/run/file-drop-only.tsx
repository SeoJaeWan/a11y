import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Drop-only upload area, like react-dropzone with `noClick` and `noKeyboard`. */
export function Page(): React.JSX.Element {
  const [fileName, setFileName] = useState('');
  return (
    <SiteLayout title="첨부 파일">
      <div
        role="presentation"
        style={{ padding: '24px', border: '2px dashed #888' }}
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={(event) => {
          event.preventDefault();
          setFileName(event.dataTransfer.files[0]?.name ?? '');
        }}
      >
        <input
          type="file"
          tabIndex={-1}
          style={{ display: 'none' }}
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? '');
          }}
        />
        <p>파일을 여기로 끌어 놓으세요</p>
      </div>
      <p role="status">{fileName ? `${fileName} 올림` : ''}</p>
    </SiteLayout>
  );
}
