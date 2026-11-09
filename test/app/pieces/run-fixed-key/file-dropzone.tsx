import { useRef, useState } from 'react';

/** A dropzone in the react-dropzone style: a focusable box that wraps a hidden file input. */
export function Page(): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  return (
    <main>
      <div
        role="button"
        tabIndex={0}
        style={{ border: '2px dashed', padding: 16 }}
        onClick={() => {
          inputRef.current?.click();
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        파일을 끌어 놓거나 눌러서 선택하세요
        <input
          ref={inputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? '');
          }}
        />
      </div>
      <p role="status">{fileName === '' ? '' : `첨부: ${fileName}`}</p>
    </main>
  );
}
