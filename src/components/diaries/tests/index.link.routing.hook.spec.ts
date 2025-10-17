import { test, expect } from "@playwright/test";
import { EmotionType } from "@/commons/constants/enum";

/**
 * Diaries Link Routing Hook E2E Tests
 *
 * 테스트 대상:
 * - 일기 카드 클릭 시 상세 페이지 라우팅
 * - URL_PATHS 상수를 사용한 동적 경로 이동
 * - 삭제 버튼 클릭 시 이벤트 전파 차단
 * - cursor: pointer 스타일 적용
 *
 * 테스트 조건:
 * - Playwright 사용 (jest, @testing-library/react 제외)
 * - 실제 로컬스토리지 데이터 사용 (Mock 미사용)
 * - data-testid 기반 페이지 로드 식별
 * - timeout: 400ms (500ms 미만)
 */

test.describe("Diaries Link Routing Hook", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 실제 테스트 데이터 저장
    const testDiaries = [
      {
        id: 1,
        title: "테스트 일기 1",
        content: "테스트 내용 1",
        emotion: EmotionType.Happy,
        createdAt: "2024-01-01",
      },
      {
        id: 2,
        title: "테스트 일기 2",
        content: "테스트 내용 2",
        emotion: EmotionType.Sad,
        createdAt: "2024-01-02",
      },
      {
        id: 3,
        title: "테스트 일기 3",
        content: "테스트 내용 3",
        emotion: EmotionType.Angry,
        createdAt: "2024-01-03",
      },
    ];

    await page.goto("/diaries");
    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);
    await page.reload();

    // 페이지가 로드될 때까지 대기 (data-testid 사용, timeout: 400ms)
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 400,
    });
  });

  test("일기 카드 클릭 시 상세 페이지로 이동해야 함", async ({ page }) => {
    // 첫 번째 일기 카드 클릭
    const firstCard = page.locator('[data-testid="diary-card"]').first();
    await firstCard.click();

    // URL이 /diaries/1로 변경되었는지 확인
    await expect(page).toHaveURL("/diaries/1");
  });

  test("두 번째 일기 카드 클릭 시 해당 id로 이동해야 함", async ({ page }) => {
    // 두 번째 일기 카드 클릭
    const secondCard = page.locator('[data-testid="diary-card"]').nth(1);
    await secondCard.click();

    // URL이 /diaries/2로 변경되었는지 확인
    await expect(page).toHaveURL("/diaries/2");
  });

  test("세 번째 일기 카드 클릭 시 해당 id로 이동해야 함", async ({ page }) => {
    // 세 번째 일기 카드 클릭
    const thirdCard = page.locator('[data-testid="diary-card"]').nth(2);
    await thirdCard.click();

    // URL이 /diaries/3으로 변경되었는지 확인
    await expect(page).toHaveURL("/diaries/3");
  });

  test("삭제 버튼 클릭 시 페이지 이동이 발생하지 않아야 함", async ({
    page,
  }) => {
    // 현재 URL 저장
    const currentUrl = page.url();

    // 첫 번째 카드의 삭제 버튼 클릭
    const deleteButton = page
      .locator('[data-testid="diary-card"]')
      .first()
      .locator('button[aria-label="삭제"]');
    await deleteButton.click();

    // 짧은 대기 후 URL이 변경되지 않았는지 확인
    await page.waitForTimeout(100);
    expect(page.url()).toBe(currentUrl);
    await expect(page).toHaveURL("/diaries");
  });

  test("카드 영역에 cursor pointer 스타일이 적용되어야 함", async ({
    page,
  }) => {
    const firstCard = page.locator('[data-testid="diary-card"]').first();

    // 카드에 cursor: pointer 스타일이 적용되었는지 확인
    const cursor = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).cursor;
    });

    expect(cursor).toBe("pointer");
  });
});
