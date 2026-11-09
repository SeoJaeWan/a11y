import { useRef, useState } from 'react';

const TABS = [
  { label: '소개', panel: '노이즈 캔슬링 무선 이어폰' },
  { label: '리뷰', panel: '리뷰 128건' },
  { label: '문의', panel: '상품 문의 3건' },
];

/** Tabs built from `div`s with arrow keys but no roles; the E2E opens the third tab. */
export function Page(): React.JSX.Element {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  return (
    <main>
      <h1>무선 이어폰</h1>
      <div
        className="tabs"
        onKeyDown={(event) => {
          const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
          if (step === undefined) return;
          const next = (selected + step + TABS.length) % TABS.length;
          setSelected(next);
          tabRefs.current[next]?.focus();
        }}
      >
        {TABS.map((tab, index) => (
          <div
            key={tab.label}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            className={index === selected ? 'tab selected' : 'tab'}
            tabIndex={index === selected ? 0 : -1}
            onClick={() => {
              setSelected(index);
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="panel">{TABS[selected]?.panel}</div>
    </main>
  );
}
