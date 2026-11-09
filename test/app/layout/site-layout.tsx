import type { ReactNode } from 'react';

type SiteLayoutProps = {
  title: string;
  children: ReactNode;
};

/**
 * Shared page frame: a header with a home link and main menu, then the case content in `main`.
 * Every case starts from the same Tab path through the header, like a real service.
 * @param props Page heading and case content.
 */
export function SiteLayout({ title, children }: SiteLayoutProps): React.JSX.Element {
  return (
    <>
      <header>
        <a href="/">홈</a>
        <nav aria-label="주 메뉴">
          <a href="/">예약</a>
          <a href="/">내 정보</a>
        </nav>
      </header>
      <main>
        <h1>{title}</h1>
        {children}
      </main>
    </>
  );
}
