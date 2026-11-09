import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { SiteLayout } from '../../layout/site-layout';

/** Booking page whose coupon dialog traps Tab inside it but leaves the page clickable. */
export function Page(): React.JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  return (
    <SiteLayout title="예약 확인">
      <p>3월 12일 오후 2시, 2명</p>
      <button
        type="button"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        쿠폰 받기
      </button>
      <button
        type="button"
        onClick={() => {
          setIsConfirmed(true);
        }}
      >
        예약 확정
      </button>
      <p role="status">{isConfirmed ? '예약이 확정되었습니다' : ''}</p>
      {isDialogOpen &&
        createPortal(
          <CouponDialog
            onClose={() => {
              setIsDialogOpen(false);
            }}
          />,
          document.body,
        )}
    </SiteLayout>
  );
}

type CouponDialogProps = {
  onClose: () => void;
};

/**
 * Coupon notice that moves focus in and keeps Tab and Shift+Tab inside, with no backdrop.
 * @param props What to do when the dialog closes.
 */
function CouponDialog({ onClose }: CouponDialogProps): React.JSX.Element {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dialogRef.current?.querySelector('button')?.focus();
  }, []);

  /**
   * Wraps Tab from the last button to the first and Shift+Tab from the first to the last.
   * @param event Key pressed inside the dialog.
   */
  function handleKeyDown(event: React.KeyboardEvent): void {
    if (event.key !== 'Tab') return;
    const buttons = [...(dialogRef.current?.querySelectorAll('button') ?? [])];
    const first = buttons[0];
    const last = buttons.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="coupon-dialog-title"
      style={{ position: 'fixed', top: 16, right: 16, background: 'white', border: '1px solid' }}
      onKeyDown={handleKeyDown}
    >
      <h2 id="coupon-dialog-title">쿠폰이 발급되었습니다</h2>
      <button type="button">쿠폰함 보기</button>
      <button type="button" onClick={onClose}>
        닫기
      </button>
    </div>
  );
}
