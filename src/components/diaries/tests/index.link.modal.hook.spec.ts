import { test, expect } from "@playwright/test";

test.describe("Diaries 모달 링크 기능", () => {
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto("/diaries");

    // 페이지 로드 완료 대기 - data-testid를 사용하여 컨테이너 확인
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test("일기쓰기 버튼이 페이지에 존재해야 한다", async ({ page }) => {
    // 일기쓰기 버튼 찾기
    const writeButton = page.getByRole("button", { name: "일기쓰기" });

    // 버튼이 존재하는지 확인
    await expect(writeButton).toBeVisible();
  });

  test("일기쓰기 버튼 클릭시 모달이 열려야 한다", async ({ page }) => {
    // 일기쓰기 버튼 클릭
    const writeButton = page.getByRole("button", { name: "일기쓰기" });
    await writeButton.click();

    // 모달이 나타나는지 확인 (모달 제목으로 확인)
    const modalTitle = page.getByRole("heading", { name: "일기 쓰기" });
    await expect(modalTitle).toBeVisible();
  });

  test("모달 내부에 일기쓰기 컴포넌트가 표시되어야 한다", async ({ page }) => {
    // 일기쓰기 버튼 클릭
    const writeButton = page.getByRole("button", { name: "일기쓰기" });
    await writeButton.click();

    // 모달 내부에 "일기 쓰기" 제목이 있는지 확인
    const modalTitle = page.getByRole("heading", { name: "일기 쓰기" });
    await expect(modalTitle).toBeVisible();

    // 모달 내부에 "오늘 기분은 어땠나요?" 텍스트가 있는지 확인
    const emotionTitle = page.getByText("오늘 기분은 어땠나요?");
    await expect(emotionTitle).toBeVisible();
  });

  test("모달 배경 클릭시 모달이 닫혀야 한다", async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const writeButton = page.getByRole("button", { name: "일기쓰기" });
    await writeButton.click();

    // 모달이 열렸는지 확인
    const modalTitle = page.getByRole("heading", { name: "일기 쓰기" });
    await expect(modalTitle).toBeVisible();

    // 모달 배경 클릭 (페이지 좌측 상단 클릭하여 배경 영역 클릭)
    await page.mouse.click(10, 10);

    // 모달이 사라졌는지 확인
    await expect(modalTitle).not.toBeVisible();
  });

  test("모달 닫기 버튼 클릭시 등록취소 확인 모달이 표시되어야 한다", async ({
    page,
  }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const writeButton = page.getByRole("button", { name: "일기쓰기" });
    await writeButton.click();

    // 모달이 열렸는지 확인
    const modalTitle = page.getByRole("heading", { name: "일기 쓰기" });
    await expect(modalTitle).toBeVisible();

    // 닫기 버튼 클릭
    const closeButton = page.getByRole("button", { name: "닫기" });
    await closeButton.click();

    // 등록취소 확인 모달이 표시되는지 확인
    const confirmModalTitle = page.locator('[data-testid="modal-title"]');
    await expect(confirmModalTitle).toBeVisible();
    await expect(confirmModalTitle).toHaveText("일기 등록 취소");

    // "등록 취소" 버튼 클릭하여 모든 모달 닫기
    const cancelButton = page.locator('[data-testid="modal-confirm-button"]');
    await cancelButton.click();

    // 모달이 사라졌는지 확인
    await expect(modalTitle).not.toBeVisible();
  });

  test("모달을 여러 번 열고 닫을 수 있어야 한다", async ({ page }) => {
    // 첫 번째: 모달 열기
    const writeButton = page.getByRole("button", { name: "일기쓰기" });
    await writeButton.click();

    let modalTitle = page.getByRole("heading", { name: "일기 쓰기" });
    await expect(modalTitle).toBeVisible();

    // 첫 번째: 닫기 버튼 클릭 후 등록취소 확인 모달에서 "등록 취소" 클릭
    let closeButton = page.getByRole("button", { name: "닫기" });
    await closeButton.click();
    // 등록취소 확인 모달이 표시됨
    await page.locator('[data-testid="modal-confirm-button"]').click();
    await expect(modalTitle).not.toBeVisible();

    // 두 번째: 모달 다시 열기
    await writeButton.click();
    modalTitle = page.getByRole("heading", { name: "일기 쓰기" });
    await expect(modalTitle).toBeVisible();

    // 두 번째: 배경 클릭으로 닫기
    await page.mouse.click(10, 10);
    await expect(modalTitle).not.toBeVisible();

    // 세 번째: 모달 다시 열기
    await writeButton.click();
    modalTitle = page.getByRole("heading", { name: "일기 쓰기" });
    await expect(modalTitle).toBeVisible();
  });

  test("모달이 페이지 위에 overlay로 표시되어야 한다", async ({ page }) => {
    // 일기쓰기 버튼 클릭
    const writeButton = page.getByRole("button", { name: "일기쓰기" });
    await writeButton.click();

    // 모달 제목이 표시되는지 확인
    const modalTitle = page.getByRole("heading", { name: "일기 쓰기" });
    await expect(modalTitle).toBeVisible();

    // 모달 뒤의 페이지 요소도 여전히 DOM에 존재하는지 확인 (overlay 확인)
    const diariesContainer = page.locator('[data-testid="diaries-container"]');
    await expect(diariesContainer).toBeInViewport();

    // 일기쓰기 버튼도 여전히 DOM에 존재하는지 확인
    await expect(writeButton).toBeInViewport();
  });
});
