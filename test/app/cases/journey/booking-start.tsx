import { SiteLayout } from '../../layout/site-layout';

/** First page of a booking, where the search journey ends. */
export function Page(): React.JSX.Element {
  return (
    <SiteLayout title="예약">
      <p>바다 호텔 예약을 시작합니다.</p>
    </SiteLayout>
  );
}
