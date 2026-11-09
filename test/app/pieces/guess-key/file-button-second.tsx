import { useRef, useState } from 'react';

/** A hidden file input whose group holds a clear button first and the opening button second. */
export function Page(): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  return (
    <main>
      <div>
        <button
          type="button"
          onClick={() => {
            setFileName('');
          }}
        >
          사진 지우기
        </button>
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
