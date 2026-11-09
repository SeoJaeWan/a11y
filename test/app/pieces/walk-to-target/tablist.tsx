import { useRef, useState } from 'react';

const TABS = [
  { label: '소개', panel: '노이즈 캔슬링 무선 이어폰' },
  { label: '리뷰', panel: '리뷰 128건' },
  { label: '문의', panel: '상품 문의 3건' },
];

/** Product tabs (APG tabs, selection follows focus); the E2E opens the third tab. */
export function Page(): React.JSX.Element {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <main>
      <h1>무선 이어폰</h1>
      <div
        role="tablist"
        aria-label="상품 정보"
        onKeyDown={(event) => {
          const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
          if (step === undefined) return;
          const next = (selected + step + TABS.length) % TABS.length;
          setSelected(next);
          tabRefs.current[next]?.focus();
        }}
      >
        {TABS.map((tab, index) => (
          <button
            key={tab.label}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`tab-${String(index)}`}
            aria-selected={index === selected}
            aria-controls="tab-panel"
            tabIndex={index === selected ? 0 : -1}
            onClick={() => {
              setSelected(index);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="tab-panel" aria-labelledby={`tab-${String(selected)}`}>
        {TABS[selected]?.panel}
      </div>
    </main>
  );
}
