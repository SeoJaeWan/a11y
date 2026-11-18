import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const STARS = [1, 2, 3, 4, 5];

/** Review form: stars set by double-click or the key they name, an editor, a photo, then submit. */
export function Page(): React.JSX.Element {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  return (
    <SiteLayout title="후기 쓰기">
      <div>
        {STARS.map((star) => (
          <button
            key={star}
            type="button"
            aria-keyshortcuts="Enter"
            onDoubleClick={() => {
              setRating(star);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') setRating(star);
            }}
          >
            별점 {star}점
          </button>
        ))}
      </div>
      <div
        className="editor"
        role="textbox"
        aria-label="후기 내용"
        aria-multiline="true"
        contentEditable
        suppressContentEditableWarning
        style={{ border: '1px solid', minHeight: 60 }}
        onInput={(event) => {
          setText(event.currentTarget.textContent);
        }}
      />
      <label>
        사진 첨부
        <input
          type="file"
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? '');
          }}
        />
      </label>
      <button
        type="button"
        onClick={() => {
          const isComplete = rating > 0 && text !== '' && fileName !== '';
          setMessage(
            isComplete
              ? `별점 ${String(rating)}점, ${fileName}: 후기가 등록되었습니다`
              : '별점, 내용, 사진을 모두 넣어 주세요',
          );
        }}
      >
        등록
      </button>
      <p role="status">{message}</p>
    </SiteLayout>
  );
}
