import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const VISUALLY_HIDDEN: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
};

/** Expense form: the file input is hidden on screen and its label is styled as a button. */
export function Page(): React.JSX.Element {
  const [fileName, setFileName] = useState('');
  return (
    <SiteLayout title="경비 청구">
      <input
        id="receipt"
        type="file"
        style={VISUALLY_HIDDEN}
        onChange={(event) => {
          setFileName(event.target.files?.[0]?.name ?? '');
        }}
      />
      <label
        htmlFor="receipt"
        style={{ display: 'inline-block', padding: '6px 12px', border: '1px solid #888' }}
      >
        영수증 첨부
      </label>
      <p role="status">{fileName ? `${fileName} 첨부됨` : ''}</p>
    </SiteLayout>
  );
}
