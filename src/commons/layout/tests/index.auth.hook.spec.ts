import { test, expect } from "@playwright/test";

/**
 * Layout Auth Hook E2E Tests
 *
 * 테스트 대상:
 * - 비로그인 유저: 로그인 버튼 노출, 로그인 페이지 이동
 * - 로그인 유저: 유저 이름 및 로그아웃 버튼 노출, 로그아웃 기능
 *
 * 테스트 조건:
 * - 실제 API 사용 (Mock 데이터 미사용)
 * - data-testid 기반 페이지 로드 식별
 * - networkidle 대기 방식 미사용
 */

test.describe("Layout Auth Hook - 비로그인 유저", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto("http://localhost:3000");
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test("비회원으로 /diaries에 접속하여 페이지 로드 확인", async ({ page }) => {
    await page.goto("http://localhost:3000/diaries");
    await expect(page.locator('[data-testid="layout-logo"]')).toBeVisible();
  });

  test("layout의 로그인버튼 노출여부 확인", async ({ page }) => {
    await page.goto("http://localhost:3000/diaries");
    await expect(page.locator('[data-testid="layout-logo"]')).toBeVisible();

    // 로그인 버튼이 보여야 함
    const loginButton = page.locator('[data-testid="login-button"]');
    await expect(loginButton).toBeVisible();

    // 로그아웃 버튼과 유저이름은 보이지 않아야 함
    await expect(
      page.locator('[data-testid="logout-button"]')
    ).not.toBeVisible();
    await expect(page.locator('[data-testid="user-name"]')).not.toBeVisible();
  });

  test("로그인버튼 클릭하여 /auth/login 페이지로 이동", async ({ page }) => {
    await page.goto("http://localhost:3000/diaries");
    await expect(page.locator('[data-testid="layout-logo"]')).toBeVisible();

    const loginButton = page.locator('[data-testid="login-button"]');
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    // /auth/login 페이지로 이동 확인
    await expect(page).toHaveURL("http://localhost:3000/auth/login");
    await expect(page.locator('[data-testid="login-page"]')).toBeVisible();
  });
});

test.describe("Layout Auth Hook - 로그인 유저", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto("http://localhost:3000");
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test("로그인 프로세스 및 로그아웃 전체 플로우", async ({ page }) => {
    // 1. 비회원으로 /auth/login에 접속하여 페이지 로드 확인
    await page.goto("http://localhost:3000/auth/login");
    await expect(page.locator('[data-testid="login-page"]')).toBeVisible();

    // 2. 로그인 시도
    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill("a@c.com");
    await passwordInput.fill("1234qwer");
    await submitButton.click();

    // 3. 로그인 성공 후, 완료 모달 클릭하여 /diaries 페이지 로드 확인
    // 네트워크 통신이므로 timeout 2000ms 미만
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible({ timeout: 1900 });

    const modalButton = page.locator('[data-testid="modal-primary-button"]');
    await expect(modalButton).toBeVisible();
    await modalButton.click();

    await expect(page).toHaveURL("http://localhost:3000/diaries");
    await expect(page.locator('[data-testid="layout-logo"]')).toBeVisible();

    // 4. layout에서 유저이름, 로그아웃버튼 노출여부 확인
    const userName = page.locator('[data-testid="user-name"]');
    const logoutButton = page.locator('[data-testid="logout-button"]');

    await expect(userName).toBeVisible();
    await expect(logoutButton).toBeVisible();

    // 로그인 버튼은 보이지 않아야 함
    await expect(
      page.locator('[data-testid="login-button"]')
    ).not.toBeVisible();

    // 5. 로그아웃버튼 클릭하여 /auth/login 페이지 로드 확인
    await logoutButton.click();
    await expect(page).toHaveURL("http://localhost:3000/auth/login");
    await expect(page.locator('[data-testid="login-page"]')).toBeVisible();

    // 6. /diaries에 접속하여 페이지 로드 확인
    await page.goto("http://localhost:3000/diaries");
    await expect(page.locator('[data-testid="layout-logo"]')).toBeVisible();

    // 7. layout에 로그인버튼 노출여부 확인
    const loginButton = page.locator('[data-testid="login-button"]');
    await expect(loginButton).toBeVisible();
    await expect(
      page.locator('[data-testid="logout-button"]')
    ).not.toBeVisible();
    await expect(page.locator('[data-testid="user-name"]')).not.toBeVisible();
  });
});
