import { useRef, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Review editor built on `contenteditable`, already holding the old review. */
export function Page(): React.JSX.Element {
  const editorRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState('');
  return (
    <SiteLayout title="후기 수정">
      <p id="review-label">후기</p>
      <div
        ref={editorRef}
        role="textbox"
        aria-multiline="true"
        aria-labelledby="review-label"
        contentEditable
        suppressContentEditableWarning
        style={{ border: '1px solid #888', minHeight: '4em', padding: '8px' }}
      >
        음식이 늦게 나왔어요
      </div>
      <button
        type="button"
        onClick={() => {
          setSaved(editorRef.current?.textContent ?? '');
        }}
      >
        저장
      </button>
      <p role="status">{saved ? `저장한 후기: ${saved}` : ''}</p>
    </SiteLayout>
  );
}
