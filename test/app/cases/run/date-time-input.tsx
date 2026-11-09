import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/**
 * Formats a `datetime-local` value like `2026-03-12T14:30` as `3월 12일 14:30 방문 예정`.
 * @param value Input value, empty while the input is incomplete.
 */
function formatVisit(value: string): string {
  const match = /^\d{4}-(\d{2})-(\d{2})T(\d{2}:\d{2})$/.exec(value);
  if (!match) return '';
  const [, month = '', day = '', time = ''] = match;
  return `${String(Number(month))}월 ${String(Number(day))}일 ${time} 방문 예정`;
}

/** Visit date and time picked with a native `datetime-local` input. */
export function Page(): React.JSX.Element {
  const [visit, setVisit] = useState('');
  return (
    <SiteLayout title="방문 예약">
      <label>
        방문 일시
        <input
          type="datetime-local"
          value={visit}
          onChange={(event) => {
            setVisit(event.target.value);
          }}
        />
      </label>
      <p role="status">{formatVisit(visit)}</p>
    </SiteLayout>
  );
}
