import { useRef, useState } from 'react';

/** A hidden file input opened by a button next to it, with no HTML link between them. */
export function Page(): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  return (
    <main>
      <div>
        <button
          type="button"
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          사진 선택
        </button>
        <input
          ref={inputRef}
          type="file"
          hidden
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? '');
          }}
        />
      </div>
      <p role="status">{fileName === '' ? '' : `사진: ${fileName}`}</p>
    </main>
  );
}
