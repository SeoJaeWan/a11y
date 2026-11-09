import { useEffect, useRef, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const SEAT_SIZE = 40;
const ROWS = ['A', 'B', 'C'];
const COLUMNS = 8;

/** Seat map drawn on a canvas: a seat is picked by clicking its spot. */
export function Page(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [seat, setSeat] = useState('');
  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;
    context.fillStyle = '#88a';
    for (let row = 0; row < ROWS.length; row += 1) {
      for (let column = 0; column < COLUMNS; column += 1) {
        context.fillRect(column * SEAT_SIZE + 4, row * SEAT_SIZE + 4, 32, 32);
      }
    }
  }, []);
  return (
    <SiteLayout title="좌석 선택">
      <p role="status">{seat ? `선택한 좌석: ${seat}` : ''}</p>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="좌석 배치도"
        width={COLUMNS * SEAT_SIZE}
        height={ROWS.length * SEAT_SIZE}
        style={{ position: 'absolute', top: '200px', left: '40px' }}
        onClick={(event) => {
          const box = event.currentTarget.getBoundingClientRect();
          const row = ROWS[Math.floor((event.clientY - box.top) / SEAT_SIZE)];
          const column = Math.floor((event.clientX - box.left) / SEAT_SIZE) + 1;
          if (row) setSeat(`${row}${String(column)}`);
        }}
      />
    </SiteLayout>
  );
}
