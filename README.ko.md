# Journey A11y

[English](README.md) | 한국어

> 아직 npm에 배포하지 않았어요.

Journey A11y는 이미 갖고 있는 Playwright E2E 테스트를 고치지 않고, 동작 줄만 키보드로 바꿔 실행해서, 그 여정을 키보드로 끝까지 할 수 있는지 검사하는 Playwright 확장이에요.

접근성 검사 도구는 규칙을 요소 하나씩 확인해요. Journey A11y는 E2E 테스트가 이미 그려 둔 여정을 봐요. 마우스로는 통과하는 테스트가 키보드로 실행했을 때 어디서 막히는지를 알려 줘요.

## 검사하는 것

E2E 테스트의 `click()`, `fill()` 같은 동작 줄마다 세 가지를 봐요.

- **닿는가**: 테스트가 가리킨 요소에 Tab과 방향키로 갈 수 있는지
- **실행되는가**: 닿은 곳에서 Enter나 Space 같은 키로 동작하는지
- **결과가 같은가**: 키보드로 해도 테스트의 다음 줄과 `expect`가 그대로 통과하는지

닿지 못하면 그 줄에서 테스트가 실패하고, 이유를 알려 줘요.

```text
Error: 키보드로 닿을 수 없습니다: getByText('쿠폰 받기')
목표 <div class="button">은(는) 포커스를 받을 수 없는 요소입니다.

  > 5 |   await page.getByText('쿠폰 받기').click();
```

테스트마다 줄별로 키보드로 한 일이 "키보드 실행" 첨부로 남아요.

```text
5행 click 통과: Tab 4번, button "예약 취소"에서 Enter
6행 click 통과: Tab 1번, button "취소 확정"에서 Enter
```

드래그나 더블클릭처럼 키보드로 바꿔 실행하지 못하는 동작은 원래 방식으로 실행하고, "검사하지 못함"이라고 첨부와 터미널에 알려요. Tab 순서가 자연스러운지, 포커스가 눈에 보이는지, 이름이 전달되는지는 보지 않아요.

## 사용 방식

테스트 파일은 고치지 않아요. 기존 Playwright 설정을 한 번 감싸고, 필요할 때만 켜요.

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test';
import { withA11y } from 'journey-a11y';

export default defineConfig(
  withA11y({
    projects: [{ name: 'chromium' }],
  }),
);
```

```bash
A11Y=1 npx playwright test
```

`A11Y`가 없으면 기존 테스트 실행은 그대로예요. 켜면 Chromium으로 도는 프로젝트마다 키보드로 실행하는 프로젝트가 하나씩 더해지고, 로그인 상태 같은 원래 프로젝트의 설정을 그대로 물려받아요. 결과는 평소 쓰는 Playwright 리포트에 함께 나와요.

Chromium과 Playwright `>=1.54 <2`를 지원해요.

## 설계 문서

설계는 [`.codocs/`](.codocs/journey-a11y.yaml)에 한국어로 정리돼 있어요.

## 라이선스

[MIT](LICENSE)
