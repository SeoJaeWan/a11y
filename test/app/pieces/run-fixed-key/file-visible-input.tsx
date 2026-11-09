import { useState } from 'react';

/** A plain file input for a profile photo. */
export function Page(): React.JSX.Element {
  const [fileName, setFileName] = useState('');
  return (
    <main>
      <label>
        프로필 사진{' '}
        <input
          type="file"
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? '');
          }}
        />
      </label>
      <p role="status">{fileName === '' ? '' : `사진: ${fileName}`}</p>
    </main>
  );
}
