import { SiteLayout } from '../../layout/site-layout';

/** Hotel page reached from the search; its button goes on to the booking page. */
export function Page(): React.JSX.Element {
  return (
    <SiteLayout title="바다 호텔">
      <p>해변까지 걸어서 3분, 1박 32,000원부터</p>
      <button
        type="button"
        onClick={() => {
          window.location.assign('/cases/journey/booking-start');
        }}
      >
        예약하기
      </button>
    </SiteLayout>
  );
}
