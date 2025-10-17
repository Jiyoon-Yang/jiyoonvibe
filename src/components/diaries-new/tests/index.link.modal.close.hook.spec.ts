import { test, expect } from "@playwright/test";

/**
 * 일기쓰기 모달 닫기 기능 E2E Tests
 *
 * 테스트 대상:
 * - 닫기 버튼 클릭 시 등록취소 확인 모달 표시
 * - "계속 작성" 버튼으로 등록취소 모달만 닫기
 * - "등록 취소" 버튼으로 모든 모달 닫기
 * - 2중 모달 스택 동작 검증
 */

test.describe("일기쓰기 모달 닫기 기능", () => {
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto("/diaries");

    // data-testid를 사용하여 페이지가 완전히 로드될 때까지 대기
    await expect(page.locator('[data-testid="diaries-list"]')).toBeVisible();

    // 일기쓰기 버튼 클릭하여 일기쓰기 모달 열기
    await page.click('[data-testid="write-diary-button"]');

    // 일기쓰기 모달이 열렸는지 확인
    await expect(
      page.locator('[data-testid="diaries-new-modal"]')
    ).toBeVisible();
  });

  test("닫기 버튼 클릭 시 등록취소 확인 모달이 열려야 한다", async ({
    page,
  }) => {
    // 닫기 버튼 클릭
    await page.click('[data-testid="close-diary-button"]');

    // 등록취소 확인 모달이 열렸는지 확인
    const modalTitle = await page.textContent('[data-testid="modal-title"]');
    expect(modalTitle).toBe("일기 등록 취소");

    // 2개의 모달이 렌더링되어 있는지 확인 (일기쓰기 + 등록취소)
    const modals = await page.locator('[data-testid="modal"]').count();
    const diaryNewModals = await page
      .locator('[data-testid="diaries-new-modal"]')
      .count();
    expect(modals).toBe(1); // 등록취소 모달
    expect(diaryNewModals).toBe(1); // 일기쓰기 모달
  });

  test("계속 작성 버튼 클릭 시 등록취소 모달만 닫혀야 한다", async ({
    page,
  }) => {
    // 닫기 버튼 클릭하여 등록취소 모달 열기
    await page.click('[data-testid="close-diary-button"]');

    // 등록취소 모달이 열렸는지 확인 (timeout: 500ms 미만)
    await page.waitForSelector('[data-testid="modal-title"]', {
      timeout: 400,
    });

    // "계속 작성" 버튼 클릭
    await page.click('[data-testid="modal-cancel-button"]');

    // 등록취소 모달이 닫혔는지 확인
    const cancelModal = await page.locator('[data-testid="modal"]').count();
    expect(cancelModal).toBe(0);

    // 일기쓰기 모달은 여전히 열려있는지 확인
    const diaryNewModal = await page
      .locator('[data-testid="diaries-new-modal"]')
      .isVisible();
    expect(diaryNewModal).toBe(true);
  });

  test("등록 취소 버튼 클릭 시 모든 모달이 닫혀야 한다", async ({ page }) => {
    // 닫기 버튼 클릭하여 등록취소 모달 열기
    await page.click('[data-testid="close-diary-button"]');

    // 등록취소 모달이 열렸는지 확인 (timeout: 500ms 미만)
    await page.waitForSelector('[data-testid="modal-title"]', {
      timeout: 400,
    });

    // "등록 취소" 버튼 클릭
    await page.click('[data-testid="modal-confirm-button"]');

    // 등록취소 모달이 닫혔는지 확인
    const cancelModal = await page.locator('[data-testid="modal"]').count();
    expect(cancelModal).toBe(0);

    // 일기쓰기 모달도 닫혔는지 확인
    const diaryNewModal = await page
      .locator('[data-testid="diaries-new-modal"]')
      .count();
    expect(diaryNewModal).toBe(0);
  });

  test("계속 작성 후 다시 닫기를 눌렀을 때 정상 동작해야 한다", async ({
    page,
  }) => {
    // 첫 번째: 닫기 버튼 클릭
    await page.click('[data-testid="close-diary-button"]');
    await page.waitForSelector('[data-testid="modal-title"]', {
      timeout: 400,
    });

    // "계속 작성" 버튼 클릭하여 등록취소 모달만 닫기
    await page.click('[data-testid="modal-cancel-button"]');

    // 등록취소 모달이 닫혔는지 확인 (timeout: 500ms 미만)
    await page.waitForSelector('[data-testid="modal"]', {
      state: "hidden",
      timeout: 400,
    });

    // 두 번째: 다시 닫기 버튼 클릭
    await page.click('[data-testid="close-diary-button"]');

    // 등록취소 모달이 다시 열렸는지 확인
    const modalTitle = await page.textContent('[data-testid="modal-title"]');
    expect(modalTitle).toBe("일기 등록 취소");

    // "등록 취소" 버튼 클릭하여 모든 모달 닫기
    await page.click('[data-testid="modal-confirm-button"]');

    // 모든 모달이 닫혔는지 확인
    const allModalsClosed = await page
      .locator('[data-testid="diaries-new-modal"]')
      .count();
    expect(allModalsClosed).toBe(0);
  });
});
