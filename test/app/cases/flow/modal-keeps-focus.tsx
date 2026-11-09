import { useState } from 'react';
import { createPortal } from 'react-dom';

import { SiteLayout } from '../../layout/site-layout';

/** Booking with a cancel dialog that opens without moving focus, so focus stays on the page. */
export function Page(): React.JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  return (
    <SiteLayout title="예약 확인">
      <p>3월 12일 오후 2시, 2명</p>
      <button
        type="button"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        예약 취소
      </button>
      <a href="/">예약 목록</a>
      <p role="status">{isCanceled ? '예약이 취소되었습니다' : ''}</p>
      {isDialogOpen &&
        createPortal(
          <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="cancel-title">
            <h2 id="cancel-title">예약을 취소할까요?</h2>
            <button
              type="button"
              aria-label="닫기"
              onClick={() => {
                setIsDialogOpen(false);
              }}
            >
              ×
            </button>
            <p>취소하면 되돌릴 수 없습니다.</p>
            <button
              type="button"
              onClick={() => {
                setIsCanceled(true);
                setIsDialogOpen(false);
              }}
            >
              취소 확정
            </button>
          </div>,
          document.body,
        )}
    </SiteLayout>
  );
}
