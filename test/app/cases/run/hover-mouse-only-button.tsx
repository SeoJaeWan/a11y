import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Account button whose panel opens only while the mouse is over it; focus does not open it. */
export function Page(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  return (
    <SiteLayout title="내 예약">
      <div
        onMouseEnter={() => {
          setIsOpen(true);
        }}
        onMouseLeave={() => {
          setIsOpen(false);
        }}
      >
        <button type="button">계정</button>
        {isOpen && (
          <div className="panel">
            <button
              type="button"
              onClick={() => {
                setMessage('로그아웃했습니다');
              }}
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
      <p role="status">{message}</p>
    </SiteLayout>
  );
}
