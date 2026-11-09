import { SiteLayout } from '../../layout/site-layout';

/** Sold-out product: the add-to-cart button stays disabled. */
export function Page(): React.JSX.Element {
  return (
    <SiteLayout title="겨울 패딩">
      <p>89,000원 · 품절</p>
      <button type="button" disabled>
        장바구니 담기
      </button>
    </SiteLayout>
  );
}
