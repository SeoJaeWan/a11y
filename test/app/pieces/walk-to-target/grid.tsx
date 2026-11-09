import { useRef, useState } from 'react';

const ROWS = [
  ['A1', 'A2', 'A3'],
  ['B1', 'B2', 'B3'],
];
const MOVES: Record<string, [number, number] | undefined> = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
};

/** A seat map grid (APG grid, four arrows); the E2E picks a seat in the second row. */
export function Page(): React.JSX.Element {
  const [message, setMessage] = useState('');
  const [active, setActive] = useState({ row: 0, column: 0 });
  const tableRef = useRef<HTMLTableElement>(null);
  return (
    <main>
      <h1>좌석 배치</h1>
      <table
        ref={tableRef}
        role="grid"
        aria-label="좌석 배치"
        onKeyDown={(event) => {
          const move = MOVES[event.key];
          if (!move) return;
          event.preventDefault();
          const row = Math.min(Math.max(active.row + move[0], 0), ROWS.length - 1);
          const column = Math.min(Math.max(active.column + move[1], 0), 2);
          setActive({ row, column });
          tableRef.current?.rows[row]?.cells[column]?.focus();
        }}
      >
        <tbody>
          {ROWS.map((seats, row) => (
            <tr key={seats.join()}>
              {seats.map((seat, column) => (
                <td
                  key={seat}
                  role="gridcell"
                  tabIndex={row === active.row && column === active.column ? 0 : -1}
                  onClick={() => {
                    setMessage(`${seat} 좌석 선택`);
                  }}
                >
                  {seat}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p role="status">{message}</p>
    </main>
  );
}
