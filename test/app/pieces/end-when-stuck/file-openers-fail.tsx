import { useState } from 'react';

/** A drop-only area: its group holds a hidden file input and a help button that does not open it. */
export function Page(): React.JSX.Element {
  const [fileName, setFileName] = useState('');
  const [isHelpShown, setIsHelpShown] = useState(false);
  return (
    <main>
      <div
        style={{ border: '2px dashed', padding: 16 }}
        onDragOver={(event) => {
          event.preventDefault();
        }}
      >
        파일을 여기에 끌어 놓으세요
        <button
          type="button"
          onClick={() => {
            setIsHelpShown(true);
          }}
        >
          도움말
        </button>
        <input
          type="file"
          hidden
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? '');
          }}
        />
      </div>
      {isHelpShown && <p>PDF와 이미지 파일을 올릴 수 있습니다.</p>}
      <p role="status">{fileName === '' ? '' : `첨부: ${fileName}`}</p>
    </main>
  );
}
