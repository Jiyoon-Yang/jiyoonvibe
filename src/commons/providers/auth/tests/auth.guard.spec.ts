import { test, expect } from "@playwright/test";

/**
 * AuthGuard E2E Tests
 *
 * 테스트 대상:
 * - 테스트 환경(NEXT_PUBLIC_TEST_ENV=test)에서 모든 페이지 접근 가능 검증
 * - 로그인/비로그인 상태와 관계없이 페이지 접근 가능
 * - /diaries/[id]는 memberOnly 페이지 (실제 환경에서만 제한)
 * - /diaries는 anyone 페이지
 *
 * 테스트 조건:
 * - 실제 API 사용 (Mock 데이터 미사용)
 * - data-testid 기반 페이지 로드 식별
 * - playwright.config.ts에서 NEXT_PUBLIC_TEST_ENV=test 설정
 *
 * 참고:
 * - 테스트 환경에서는 AuthGuard가 모든 페이지 접근을 허용함
 * - 실제 환경(프로덕션)에서는 accessType에 따라 접근 제한
 */

test.describe("AuthGuard - 테스트 환경 검증", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto("http://localhost:3000");
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test("테스트 환경: 비로그인 유저도 anyone 페이지(/diaries) 접근 가능", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/diaries");

    // 페이지가 정상 로드되어야 함
    await expect(page.locator('[data-testid="diaries-list"]')).toBeVisible();
  });

  test("테스트 환경: 비로그인 유저도 memberOnly 페이지(/diaries/1) 접근 가능", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/diaries/1");

    // 테스트 환경에서는 로그인 모달이 표시되지 않고 페이지가 로드되어야 함
    // (빈 diary-detail 컨테이너가 렌더링됨)
    await expect(
      page.locator('[data-testid="diary-detail"]')
    ).toBeAttached();

    // 로그인 요청 모달이 표시되지 않아야 함
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).not.toBeVisible();
  });
});

test.describe("AuthGuard - 로그인 유저", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto("http://localhost:3000");
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test("테스트 환경: 로그인 후 memberOnly 페이지(/diaries/1) 정상 접근", async ({
    page,
  }) => {
    // 1. 로그인 페이지 접속
    await page.goto("http://localhost:3000/auth/login");
    await expect(page.locator('[data-testid="login-page"]')).toBeVisible();

    // 2. 로그인 진행
    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill("a@c.com");
    await passwordInput.fill("1234qwer");
    await submitButton.click();

    // 3. 로그인 완료 모달 처리
    const loginModal = page.locator('[data-testid="modal"]');
    await expect(loginModal).toBeVisible({ timeout: 2000 });

    const modalButton = page.locator('[data-testid="modal-primary-button"]');
    await expect(modalButton).toBeVisible();
    await modalButton.click();

    // 4. memberOnly 페이지(/diaries/1) 접근
    await page.goto("http://localhost:3000/diaries/1");

    // 5. 테스트 환경에서는 로그인 여부와 관계없이 페이지 접근 가능
    await expect(
      page.locator('[data-testid="diary-detail"]')
    ).toBeAttached();

    // 로그인 요청 모달이 표시되지 않아야 함
    const authModal = page.locator('[data-testid="modal"]');
    await expect(authModal).not.toBeVisible();
  });

  test("테스트 환경: 로그인 후 anyone 페이지(/diaries) 정상 접근", async ({
    page,
  }) => {
    // 1. 로그인 페이지 접속
    await page.goto("http://localhost:3000/auth/login");
    await expect(page.locator('[data-testid="login-page"]')).toBeVisible();

    // 2. 로그인 진행
    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill("a@c.com");
    await passwordInput.fill("1234qwer");
    await submitButton.click();

    // 3. 로그인 완료 모달 처리
    const loginModal = page.locator('[data-testid="modal"]');
    await expect(loginModal).toBeVisible({ timeout: 2000 });

    const modalButton = page.locator('[data-testid="modal-primary-button"]');
    await expect(modalButton).toBeVisible();
    await modalButton.click();

    // 4. anyone 페이지(/diaries) 접근
    await page.goto("http://localhost:3000/diaries");

    // 5. 페이지가 정상 로드되어야 함
    await expect(page.locator('[data-testid="diaries-list"]')).toBeVisible();
  });
});

