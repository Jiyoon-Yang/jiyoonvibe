import { test, expect } from "@playwright/test";

test.describe("Layout Link Routing", () => {
  test.describe("일기보관함 페이지 (/diaries)", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/diaries");
      // data-testid를 사용하여 페이지 로드 대기
      await page.waitForSelector('[data-testid="layout-navigation"]');
    });

    test("페이지 로드시 일기보관함 탭이 active 상태여야 함", async ({
      page,
    }) => {
      const diaryTab = page.locator('[data-testid="nav-tab-diaries"]');
      const pictureTab = page.locator('[data-testid="nav-tab-pictures"]');

      // 일기보관함 탭이 active 상태인지 확인
      await expect(diaryTab).toHaveAttribute("data-active", "true");
      // 사진보관함 탭은 active 상태가 아니어야 함
      await expect(pictureTab).toHaveAttribute("data-active", "false");
    });

    test("로고 클릭시 일기목록 페이지로 이동해야 함", async ({ page }) => {
      const logo = page.locator('[data-testid="layout-logo"]');
      await logo.click();

      // URL이 /diaries인지 확인
      await expect(page).toHaveURL("/diaries");
      // 일기보관함 탭이 여전히 active 상태인지 확인
      const diaryTab = page.locator('[data-testid="nav-tab-diaries"]');
      await expect(diaryTab).toHaveAttribute("data-active", "true");
    });

    test("일기보관함 탭 클릭시 일기목록 페이지로 이동해야 함", async ({
      page,
    }) => {
      const diaryTab = page.locator('[data-testid="nav-tab-diaries"]');
      await diaryTab.click();

      // URL이 /diaries인지 확인
      await expect(page).toHaveURL("/diaries");
      // 일기보관함 탭이 active 상태인지 확인
      await expect(diaryTab).toHaveAttribute("data-active", "true");
    });
  });

  // /pictures 페이지는 skip
  test.skip("사진보관함 페이지 (/pictures)", () => {});
});
