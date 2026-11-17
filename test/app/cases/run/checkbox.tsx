import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

/** Sign-up form whose terms checkbox enables the sign-up button. */
export function Page(): React.JSX.Element {
  const [isAgreed, setIsAgreed] = useState(false);
  return (
    <SiteLayout title="회원 가입">
      <label>
        <input
          type="checkbox"
          checked={isAgreed}
          onChange={(event) => {
            setIsAgreed(event.target.checked);
          }}
        />{' '}
        약관에 동의합니다
      </label>
      <button type="button" disabled={!isAgreed}>
        가입하기
      </button>
    </SiteLayout>
  );
}
