import { useState } from 'react';

const VISUALLY_HIDDEN: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
};

/** A file input hidden only from the screen; its label is styled as the button. */
export function Page(): React.JSX.Element {
  const [fileName, setFileName] = useState('');
  return (
    <main>
      <input
        id="photo"
        type="file"
        style={VISUALLY_HIDDEN}
        onChange={(event) => {
          setFileName(event.target.files?.[0]?.name ?? '');
        }}
      />
      <label htmlFor="photo" style={{ border: '1px solid', padding: 4 }}>
        사진 올리기
      </label>
      <p role="status">{fileName === '' ? '' : `사진: ${fileName}`}</p>
    </main>
  );
}
