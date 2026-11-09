import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Theme setting with a native color input. */
export function Page(): React.JSX.Element {
  const [color, setColor] = useState('#336699');
  return (
    <SiteLayout title="화면 설정">
      <label>
        테마 색
        <input
          type="color"
          value={color}
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
      </label>
      <p role="status">선택한 색: {color}</p>
    </SiteLayout>
  );
}
