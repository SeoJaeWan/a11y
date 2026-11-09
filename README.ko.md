# Journey A11y

[English](README.md) | 한국어

> 가칭이에요. 설계 중이라 아직 설치할 코드는 없어요.

Journey A11y는 이미 갖고 있는 E2E 테스트를 키보드만 쓰는 사용자의 방식으로 다시 실행하고, 그 사용자가 단계마다 무엇을 겪는지 기록하는 Playwright 확장이에요.

접근성 검사 도구는 규칙을 요소 하나씩 확인해요. Journey A11y는 E2E 테스트가 이미 그려 둔 여정을 봐요. 키보드 사용자가 각 목표에 닿을 수 있는지, 실행할 수 있는지, 그 과정에서 무엇이 전달되는지를 기록해요.

## 기록하는 것

E2E 테스트의 `click()`, `fill()` 같은 단계마다 다음을 남겨요.

- **도달**: 목표까지 Tab과 방향키를 몇 번 눌렀는지, 또는 닿지 못했는지
- **실행**: 어떤 키(Enter, Space, 선언된 단축키)로 동작했는지, 그 뒤 테스트의 다음 단계가 통과했는지
- **전달되는 정보**: 지나간 지점마다 역할, 이름, 이름 출처, 상태
- **흐름**: 다음 단계에서 포커스가 어디서 시작하는지. 예를 들어 대화상자가 열리거나 페이지가 바뀐 뒤

관찰하고 기록할 뿐, 점수를 매기거나 무엇이 문제인지 판정하지 않아요. 그 판단은 개발자에게 맡겨요.

## 사용 예정 방식

테스트 파일은 고치지 않아요. 기존 Playwright 설정에 프로젝트를 더하고, 필요할 때만 켜요.

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test';
import { a11yProjects } from '@journey-a11y/playwright'; // 패키지 이름은 확정 전이에요

export default defineConfig({
  projects: [{ name: 'chromium' }, ...a11yProjects()],
});
```

```bash
A11Y=1 npx playwright test
```

결과는 평소 쓰는 Playwright HTML 리포트에 함께 나오고, 옆에 JSON 기록이 남아요.

첫 버전은 Chromium과 Playwright `>=1.54 <2`를 지원해요.

## 설계 문서

설계는 [`.codocs/`](.codocs/journey-a11y.yaml)에 한국어로 정리돼 있어요.

## 라이선스

[MIT](LICENSE)
