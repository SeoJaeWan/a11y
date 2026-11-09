import { useState } from 'react';

/** A seat map drawn on a canvas pinned to the top-left corner; seats are picked by click. */
export function Page(): React.JSX.Element {
  const [seat, setSeat] = useState('');
  return (
    <main>
      <canvas
        width={200}
        height={100}
        style={{ position: 'fixed', left: 0, top: 0, background: '#ddd' }}
        onClick={(event) => {
          setSeat(event.nativeEvent.offsetX < 100 ? 'A1' : 'A2');
        }}
      />
      <p role="status" style={{ marginTop: 120 }}>
        {seat === '' ? '' : `${seat} 좌석 선택`}
      </p>
    </main>
  );
}
