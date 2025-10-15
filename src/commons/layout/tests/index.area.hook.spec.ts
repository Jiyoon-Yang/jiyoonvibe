import { test, expect } from "@playwright/test";

/**
 * Layout Area Hook E2E Tests
 *
 * 테스트 대상:
 * - /diaries: 모든 영역 노출 (header, logo, banner, navigation, footer)
 * - /diaries/[id]: header, logo, footer만 노출 (banner, navigation 숨김)
 *
 * 테스트 제외:
 * - /auth/login
 * - /auth/signup
 * - /pictures
 */

test.describe("Layout 영역 노출 제어", () => {
  test.describe("일기목록 페이지 (/diaries)", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/diaries");
      // data-testid를 사용하여 페이지 로드 대기 (timeout: 500ms 미만)
      await page.waitForSelector('[data-testid="layout-logo"]', {
        timeout: 400,
      });
    });

    test("모든 레이아웃 영역이 노출되어야 함", async ({ page }) => {
      // header 영역 전체 노출
      const header = page.locator("header");
      await expect(header).toBeVisible();

      // header 영역 내 logo 노출
      const logo = page.locator('[data-testid="layout-logo"]');
      await expect(logo).toBeVisible();

      // banner 영역 전체 노출
      const banner = page.locator('[data-testid="layout-banner"]');
      await expect(banner).toBeVisible();

      // navigation 영역 전체 노출
      const navigation = page.locator('[data-testid="layout-navigation"]');
      await expect(navigation).toBeVisible();

      // footer 영역 전체 노출
      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
    });
  });

  test.describe("일기상세 페이지 (/diaries/[id])", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/diaries/1");
      // data-testid를 사용하여 페이지 로드 대기 (timeout: 500ms 미만)
      await page.waitForSelector('[data-testid="layout-logo"]', {
        timeout: 400,
      });
    });

    test("header, logo, footer만 노출되어야 함", async ({ page }) => {
      // header 영역 전체 노출
      const header = page.locator("header");
      await expect(header).toBeVisible();

      // header 영역 내 logo 노출
      const logo = page.locator('[data-testid="layout-logo"]');
      await expect(logo).toBeVisible();

      // footer 영역 전체 노출
      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
    });

    test("banner와 navigation은 숨겨져야 함", async ({ page }) => {
      // banner 영역 숨김
      const banner = page.locator('[data-testid="layout-banner"]');
      await expect(banner).not.toBeVisible();

      // navigation 영역 숨김
      const navigation = page.locator('[data-testid="layout-navigation"]');
      await expect(navigation).not.toBeVisible();
    });

    test("다이나믹 라우트에서도 동일하게 작동해야 함 (/diaries/123)", async ({
      page,
    }) => {
      await page.goto("/diaries/123");
      await page.waitForSelector('[data-testid="layout-logo"]', {
        timeout: 400,
      });

      // header, logo, footer 노출
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator('[data-testid="layout-logo"]')).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();

      // banner, navigation 숨김
      await expect(
        page.locator('[data-testid="layout-banner"]')
      ).not.toBeVisible();
      await expect(
        page.locator('[data-testid="layout-navigation"]')
      ).not.toBeVisible();
    });
  });

  // 테스트 제외 대상 명시
  test.describe("테스트 제외 경로", () => {
    test.skip("로그인 페이지 (/auth/login)", () => {
      // 테스트 제외: 요구사항에 따라 skip
    });

    test.skip("회원가입 페이지 (/auth/signup)", () => {
      // 테스트 제외: 요구사항에 따라 skip
    });

    test.skip("사진보관함 페이지 (/pictures)", () => {
      // 테스트 제외: 요구사항에 따라 skip
    });
  });
});
