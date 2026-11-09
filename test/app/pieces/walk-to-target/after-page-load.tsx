import { useState } from 'react';

/** Notice pages: the first links to the second with a full page load; the second has a like button. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  const isSecond = new URLSearchParams(window.location.search).get('page') === '2';
  if (!isSecond) {
    return (
      <main>
        <h1>공지 1</h1>
        <a href="?page=2">다음 글</a>
      </main>
    );
  }
  return (
    <main>
      <h1>공지 2</h1>
      <a href="?page=1">이전 글</a>
      <button
        type="button"
        onClick={() => {
          setMessage('좋아요를 눌렀습니다');
        }}
      >
        좋아요
      </button>
      <p role="status">{message}</p>
    </main>
  );
}
