import { test, expect } from "@playwright/test";
import { EmotionType } from "@/commons/constants/enum";

/**
 * Diaries Detail Delete Hook E2E Tests
 *
 * 테스트 대상:
 * - 삭제 버튼 클릭 시 모달 노출
 * - 모달의 취소 버튼 클릭 시 모달 닫기
 * - 모달의 삭제 버튼 클릭 시 일기 삭제 및 페이지 이동
 * - 로컬스토리지에서 일기 삭제 확인
 *
 * 테스트 조건:
 * - Playwright 사용 (jest, @testing-library/react 제외)
 * - 실제 로컬스토리지 데이터 사용 (Mock 미사용)
 * - data-testid 기반 페이지 로드 식별
 * - timeout: 400ms (500ms 미만)
 */

test.describe("Diaries Detail Delete Hook", () => {
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
          createdAt: "2024-07-12T10:00:00.000Z",
        },
        {
          id: 2,
          title: "슬픈 일이 있었다",
          content: "오늘은 슬픈 일이 있었다",
          emotion: "Sad",
          createdAt: "2024-07-13T10:00:00.000Z",
        },
        {
          id: 3,
          title: "화가 났던 순간",
          content: "정말 화가 났다",
          emotion: "Angry",
          createdAt: "2024-07-14T10:00:00.000Z",
        },
      ];
      localStorage.setItem("diaries", JSON.stringify(testDiaries));
    });
  });

  test("삭제 버튼 클릭 시 삭제 모달이 노출된다", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    // 삭제 버튼 클릭 (페이지에는 여러 개의 버튼이 있으므로 텍스트로 찾기)
    const deleteButton = page.getByRole("button", { name: "삭제" });
    await deleteButton.click();

    // 모달이 노출되는지 확인
    await page.waitForSelector('[data-testid="delete-modal"]', {
      timeout: 400,
    });

    const modal = page.locator('[data-testid="delete-modal"]');
    await expect(modal).toBeVisible();
  });

  test("삭제 모달의 취소 버튼 클릭 시 모달이 닫힌다", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    // 삭제 버튼 클릭
    const deleteButton = page.getByRole("button", { name: "삭제" });
    await deleteButton.click();

    // 모달이 노출되는지 확인
    await page.waitForSelector('[data-testid="delete-modal"]', {
      timeout: 400,
    });

    // 취소 버튼 클릭
    const cancelButton = page.locator('[data-testid="delete-cancel-button"]');
    await cancelButton.click();

    // 모달이 사라졌는지 확인
    const modal = page.locator('[data-testid="delete-modal"]');
    await expect(modal).not.toBeVisible();
  });

  test("삭제 모달의 삭제 버튼 클릭 시 일기가 삭제되고 /diaries로 이동한다", async ({
    page,
  }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    // 삭제 버튼 클릭
    const deleteButton = page.getByRole("button", { name: "삭제" });
    await deleteButton.click();

    // 모달이 노출되는지 확인
    await page.waitForSelector('[data-testid="delete-modal"]', {
      timeout: 400,
    });

    // 삭제 버튼 클릭
    const confirmDeleteButton = page.locator(
      '[data-testid="delete-confirm-button"]'
    );
    await confirmDeleteButton.click();

    // /diaries로 이동했는지 확인
    await expect(page).toHaveURL(/\/diaries$/);

    // 로컬스토리지에서 일기가 삭제되었는지 확인
    const localStorageData = await page.evaluate(() => {
      const diaries = localStorage.getItem("diaries");
      return diaries ? JSON.parse(diaries) : [];
    });

    expect(localStorageData).toHaveLength(2);
    expect(
      localStorageData.find((diary: any) => diary.id === 1)
    ).toBeUndefined();
  });

  test("삭제 후 일기 목록에 해당 일기가 표시되지 않는다", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    // 삭제 버튼 클릭
    const deleteButton = page.getByRole("button", { name: "삭제" });
    await deleteButton.click();

    // 모달이 노출되는지 확인
    await page.waitForSelector('[data-testid="delete-modal"]', {
      timeout: 400,
    });

    // 삭제 버튼 클릭
    const confirmDeleteButton = page.locator(
      '[data-testid="delete-confirm-button"]'
    );
    await confirmDeleteButton.click();

    // /diaries로 이동했는지 확인
    await expect(page).toHaveURL(/\/diaries$/);

    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 400,
    });

    // 삭제된 일기가 목록에 없는지 확인
    const diaryTitles = await page
      .locator('[data-testid="card-title"]')
      .allTextContents();
    expect(diaryTitles).not.toContain("행복한 하루");
  });
});
