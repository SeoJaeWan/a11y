import { useState } from 'react';

/** A label that wraps a file input with the `hidden` attribute: nothing on the page opens it. */
export function Page(): React.JSX.Element {
  const [fileName, setFileName] = useState('');
  return (
    <main>
      <label style={{ border: '1px solid', padding: 4 }}>
        첨부 파일
        <input
          type="file"
          hidden
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? '');
          }}
        />
      </label>
      <p role="status">{fileName === '' ? '' : `첨부: ${fileName}`}</p>
    </main>
  );
}
