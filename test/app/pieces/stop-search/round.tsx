import { useState } from 'react';

/** Account settings whose save "button" is a `div` with a click handler only. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  return (
    <main>
      <h1>회원 정보</h1>
      <button type="button">수정</button>
      <button type="button">비밀번호 변경</button>
      <button type="button">알림 설정</button>
      <button type="button">로그아웃</button>
      <div
        className="button"
        onClick={() => {
          setMessage('저장했습니다');
        }}
      >
        저장
      </div>
      <p role="status">{message}</p>
    </main>
  );
}
