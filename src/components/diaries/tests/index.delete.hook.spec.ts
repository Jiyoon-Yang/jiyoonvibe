import { test, expect } from "@playwright/test";
import { EmotionType } from "@/commons/constants/enum";

/**
 * Diaries Delete Hook E2E Tests
 *
 * 테스트 대상:
 * - 비로그인 유저: 삭제 아이콘 미노출
 * - 로그인 유저: 삭제 아이콘 노출 및 삭제 기능
 * - 삭제 모달 표시 및 동작
 * - 로컬스토리지에서 일기 삭제
 * - 페이지 새로고침
 *
 * 테스트 조건:
 * - Playwright 사용 (jest, @testing-library/react 제외)
 * - 실제 로컬스토리지 데이터 사용 (Mock 미사용)
 * - data-testid 기반 페이지 로드 식별
 * - timeout: 400ms (500ms 미만)
 * - 로그인 데이터는 window.__TEST_BYPASS__ 사용
 */

test.describe("Diaries Delete Hook", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 실제 테스트 데이터 저장
    await page.goto("/diaries");
    await page.evaluate(() => {
      const testDiaries = [
        {
          id: 1,
          title: "행복한 하루",
          content: "오늘은 정말 행복한 하루였다",
          emotion: "Happy",
          createdAt: "2024-03-12T10:00:00.000Z",
        },
        {
          id: 2,
          title: "슬픈 일이 있었다",
          content: "오늘은 슬픈 일이 있었다",
          emotion: "Sad",
          createdAt: "2024-03-13T10:00:00.000Z",
        },
        {
          id: 3,
          title: "화가 났던 순간",
          content: "정말 화가 났다",
          emotion: "Angry",
          createdAt: "2024-03-14T10:00:00.000Z",
        },
      ];
      localStorage.setItem("diaries", JSON.stringify(testDiaries));
    });
    // 로컬스토리지 설정 후 페이지 다시 로드
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 400,
    });
    // 첫 번째 카드가 렌더링될 때까지 대기
    await page.waitForSelector('[data-testid="diary-card"]', {
      timeout: 400,
    });
  });

  test("비로그인 유저는 삭제 아이콘이 노출되지 않는다", async ({ page }) => {
    // 비로그인 상태로 설정 (reload 전에 설정)
    await page.addInitScript(() => {
      window.__TEST_BYPASS__ = false;
    });

    await page.reload();
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 400,
    });

    // 삭제 버튼이 존재하지 않는지 확인
    const deleteButtons = page.locator('[data-testid="delete-button"]');
    const count = await deleteButtons.count();
    expect(count).toBe(0);
  });

  test("로그인 유저는 삭제 아이콘이 노출된다", async ({ page }) => {
    // 로그인 상태로 설정
    await page.evaluate(() => {
      window.__TEST_BYPASS__ = true;
    });

    await page.reload();
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 400,
    });

    // 삭제 버튼이 존재하는지 확인
    const deleteButtons = page.locator('[data-testid="delete-button"]');
    const count = await deleteButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test("삭제 아이콘 클릭 시 삭제 모달이 표시된다", async ({ page }) => {
    // 로그인 상태로 설정
    await page.evaluate(() => {
      window.__TEST_BYPASS__ = true;
    });

    await page.reload();
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 400,
    });

    // 첫 번째 카드의 삭제 버튼 클릭
    const firstDeleteButton = page
      .locator('[data-testid="delete-button"]')
      .first();
    await firstDeleteButton.click();

    // 삭제 모달이 표시되는지 확인
    const deleteModal = page.locator('[data-testid="delete-modal"]');
    await expect(deleteModal).toBeVisible();
  });

  test("삭제 모달에서 취소 버튼 클릭 시 모달이 닫힌다", async ({ page }) => {
    // 로그인 상태로 설정
    await page.evaluate(() => {
      window.__TEST_BYPASS__ = true;
    });

    await page.reload();
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 400,
    });

    // 첫 번째 카드의 삭제 버튼 클릭
    const firstDeleteButton = page
      .locator('[data-testid="delete-button"]')
      .first();
    await firstDeleteButton.click();

    // 삭제 모달이 표시되는지 확인
    const deleteModal = page.locator('[data-testid="delete-modal"]');
    await expect(deleteModal).toBeVisible();

    // 취소 버튼 클릭
    const cancelButton = page.locator('[data-testid="delete-cancel-button"]');
    await cancelButton.click();

    // 모달이 닫혔는지 확인
    await expect(deleteModal).not.toBeVisible();
  });

  test("삭제 모달에서 삭제 버튼 클릭 시 일기가 삭제되고 페이지가 새로고침된다", async ({
    page,
  }) => {
    // 로그인 상태로 설정
    await page.evaluate(() => {
      window.__TEST_BYPASS__ = true;
    });

    await page.reload();
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 400,
    });

    // 삭제 전 일기 개수 확인
    const initialCards = page.locator('[data-testid="diary-card"]');
    const initialCount = await initialCards.count();
    expect(initialCount).toBe(3);

    // 첫 번째 카드의 삭제 버튼 클릭
    const firstDeleteButton = page
      .locator('[data-testid="delete-button"]')
      .first();
    await firstDeleteButton.click();

    // 삭제 모달이 표시되는지 확인
    const deleteModal = page.locator('[data-testid="delete-modal"]');
    await expect(deleteModal).toBeVisible();

    // 삭제 버튼 클릭
    const confirmDeleteButton = page.locator(
      '[data-testid="delete-confirm-button"]'
    );
    await confirmDeleteButton.click();

    // 페이지가 새로고침되고 일기가 삭제되었는지 확인
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 400,
    });

    const remainingCards = page.locator('[data-testid="diary-card"]');
    const remainingCount = await remainingCards.count();
    expect(remainingCount).toBe(2);

    // 로컬스토리지에서도 삭제되었는지 확인
    const localStorageData = await page.evaluate(() => {
      const diaries = localStorage.getItem("diaries");
      return diaries ? JSON.parse(diaries) : [];
    });
    expect(localStorageData).toHaveLength(2);
    expect(
      localStorageData.find((diary: any) => diary.id === 1)
    ).toBeUndefined();
  });

  test("삭제 후 올바른 일기들이 남아있는지 확인한다", async ({ page }) => {
    // 로그인 상태로 설정
    await page.evaluate(() => {
      window.__TEST_BYPASS__ = true;
    });

    await page.reload();
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 400,
    });

    // 두 번째 카드의 삭제 버튼 클릭 (id: 2)
    const secondDeleteButton = page
      .locator('[data-testid="delete-button"]')
      .nth(1);
    await secondDeleteButton.click();

    // 삭제 모달에서 삭제 확인
    const confirmDeleteButton = page.locator(
      '[data-testid="delete-confirm-button"]'
    );
    await confirmDeleteButton.click();

    // 페이지 새로고침 대기
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 400,
    });

    // 남은 일기들의 제목 확인
    const remainingCards = page.locator('[data-testid="diary-card"]');
    const remainingCount = await remainingCards.count();
    expect(remainingCount).toBe(2);

    // 첫 번째 카드 (id: 1)
    const firstCard = remainingCards.first();
    const firstTitle = firstCard.locator('[data-testid="card-title"]');
    await expect(firstTitle).toHaveText("행복한 하루");

    // 두 번째 카드 (id: 3)
    const secondCard = remainingCards.nth(1);
    const secondTitle = secondCard.locator('[data-testid="card-title"]');
    await expect(secondTitle).toHaveText("화가 났던 순간");
  });

  test("모든 일기를 삭제한 후 빈 상태를 올바르게 표시한다", async ({
    page,
  }) => {
    // 로그인 상태로 설정
    await page.evaluate(() => {
      window.__TEST_BYPASS__ = true;
    });

    await page.reload();
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 400,
    });

    // 모든 일기 삭제
    for (let i = 0; i < 3; i++) {
      const deleteButton = page
        .locator('[data-testid="delete-button"]')
        .first();
      await deleteButton.click();

      const confirmDeleteButton = page.locator(
        '[data-testid="delete-confirm-button"]'
      );
      await confirmDeleteButton.click();

      await page.waitForSelector('[data-testid="diaries-list"]', {
        timeout: 400,
      });
    }

    // 모든 일기가 삭제되었는지 확인
    const remainingCards = page.locator('[data-testid="diary-card"]');
    const remainingCount = await remainingCards.count();
    expect(remainingCount).toBe(0);

    // 로컬스토리지도 비어있는지 확인
    const localStorageData = await page.evaluate(() => {
      const diaries = localStorage.getItem("diaries");
      return diaries ? JSON.parse(diaries) : [];
    });
    expect(localStorageData).toHaveLength(0);
  });

  test("삭제 중 에러가 발생해도 안전하게 처리된다", async ({ page }) => {
    // 로그인 상태로 설정
    await page.evaluate(() => {
      window.__TEST_BYPASS__ = true;
    });

    // 잘못된 데이터로 로컬스토리지 설정
    await page.evaluate(() => {
      localStorage.setItem("diaries", "invalid json");
    });

    await page.reload();
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 400,
    });

    // 에러가 발생해도 페이지가 정상적으로 로드되는지 확인
    const container = page.locator('[data-testid="diaries-list"]');
    await expect(container).toBeVisible();

    // 삭제 버튼이 없어야 함 (데이터가 없으므로)
    const deleteButtons = page.locator('[data-testid="delete-button"]');
    const count = await deleteButtons.count();
    expect(count).toBe(0);
  });
});
