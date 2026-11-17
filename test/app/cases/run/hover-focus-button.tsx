import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Account button whose panel opens when the mouse is over it and also when focus is inside. */
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
        onFocus={() => {
          setIsOpen(true);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
        }}
      >
        <button type="button" aria-expanded={isOpen}>
          계정
        </button>
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
