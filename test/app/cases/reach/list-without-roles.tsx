import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const ORDERS = ['추천순', '낮은 가격순', '높은 가격순'];

/** Sort dropdown whose items are plain clickable `div`s with no roles and no Tab stop. */
export function Page(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState('');
  return (
    <SiteLayout title="검색 결과">
      <button
        type="button"
        onClick={() => {
          setIsOpen((isShown) => !isShown);
        }}
      >
        정렬
      </button>
      {isOpen && (
        <div className="dropdown">
          {ORDERS.map((item) => (
            <div
              key={item}
              className="dropdown-item"
              onClick={() => {
                setOrder(item);
                setIsOpen(false);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
      <p role="status">{order ? `${order}으로 정렬했습니다` : ''}</p>
    </SiteLayout>
  );
}
