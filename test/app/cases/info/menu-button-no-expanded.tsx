import { useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const SORT_OPTIONS = ['추천 순', '가격 낮은 순', '평점 높은 순'];

/** Room list with a sort button that opens a menu but never says whether it is open. */
export function Page(): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sort, setSort] = useState('추천 순');
  return (
    <SiteLayout title="객실 목록">
      <div className="sort-menu">
        <button
          type="button"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          정렬
        </button>
        {isMenuOpen && (
          <ul>
            {SORT_OPTIONS.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => {
                    setSort(option);
                    setIsMenuOpen(false);
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p role="status">{sort}으로 정렬했습니다</p>
    </SiteLayout>
  );
}
