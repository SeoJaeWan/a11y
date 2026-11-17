import { useRef, useState } from 'react';

import { SiteLayout } from '../../layout/site-layout';

const TABS = [
  { id: 'detail', label: '상세 정보', content: '오션뷰 객실, 조식 포함' },
  { id: 'delivery', label: '배송 안내', content: '숙박권은 문자로 보내 드립니다' },
  { id: 'review', label: '리뷰', content: '평점 4.8, 리뷰 120개' },
];

/** Product tabs that follow the ARIA tabs pattern with manual activation. */
export function Page(): React.JSX.Element {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /**
   * Moves focus between tabs with the left and right arrow keys.
   * @param event Key pressed on a tab.
   * @param index Position of that tab.
   */
  function handleKeyDown(event: React.KeyboardEvent, index: number): void {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (step === undefined) return;
    event.preventDefault();
    tabRefs.current[(index + step + TABS.length) % TABS.length]?.focus();
  }

  return (
    <SiteLayout title="바다 호텔">
      <div role="tablist" aria-label="객실 정보">
        {TABS.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={index === selected}
            aria-controls={`panel-${tab.id}`}
            tabIndex={index === selected ? 0 : -1}
            onClick={() => {
              setSelected(index);
            }}
            onKeyDown={(event) => {
              handleKeyDown(event, index);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {TABS.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={index !== selected}
        >
          {tab.content}
        </div>
      ))}
    </SiteLayout>
  );
}
