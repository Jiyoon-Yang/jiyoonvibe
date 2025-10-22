import { test, expect } from "@playwright/test";

/**
 * Diaries Link Modal Hook E2E Tests
 *
 * 테스트 대상:
 * - 일기쓰기 모달 열기 기능
 * - 권한 분기 (로그인/비로그인 유저)
 * - 로그인 요청 모달 표시
 * - 모달 닫기 기능
 * - 모달 스택 관리
 *
 * 테스트 조건:
 * - Playwright 사용 (jest, @testing-library/react 제외)
 * - 실제 데이터 사용 (Mock 미사용)
 * - window.__TEST_BYPASS__ 전역변수로 로그인 상태 제어
 * - data-testid 기반 페이지 로드 식별
 * - timeout: 500ms 미만
 */

test.describe("Diaries 모달 링크 기능 - 권한 분기 (비로그인 유저)", () => {
  test.beforeEach(async ({ page }) => {
    // 비로그인 테스트를 위한 플래그 설정
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-list"]');

    // 비로그인 상태로 테스트하기 위해 플래그 설정
    await page.evaluate(() => {
      window.__TEST_BYPASS__ = false;
    });
  });

  test("비로그인 유저가 일기쓰기 버튼 클릭 시 로그인 요청 모달이 노출되어야 한다", async ({
    page,
  }) => {
    // 일기쓰기 버튼 클릭
    const writeButton = page.locator('[data-testid="write-diary-button"]');
    await writeButton.click();

    // 로그인 요청 모달이 노출되는지 확인
    const loginModal = page.getByText("로그인이 필요합니다");
    await expect(loginModal).toBeVisible({ timeout: 500 });

    // 모달 설명 확인
    const modalDescription = page.getByText(
      "이 기능은 로그인 후 이용하실 수 있습니다."
    );
    await expect(modalDescription).toBeVisible({ timeout: 500 });

    // 로그인하러가기 버튼 확인
    const loginButton = page.getByRole("button", { name: "로그인하러가기" });
    await expect(loginButton).toBeVisible({ timeout: 500 });
  });
});

test.describe("Diaries 모달 링크 기능 - 권한 분기 (로그인 유저)", () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 유저로 테스트
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-list"]');

    // 로그인 상태로 테스트 (기본값, __TEST_BYPASS__가 true거나 undefined)
  });

  test("로그인 유저가 일기쓰기 버튼 클릭 시 일기쓰기 모달이 노출되어야 한다", async ({
    page,
  }) => {
    // 일기쓰기 버튼 클릭
    const writeButton = page.locator('[data-testid="write-diary-button"]');
    await writeButton.click();

    // 일기쓰기 모달이 노출되는지 확인
    const diaryModal = page.locator('[data-testid="diaries-new-modal"]');
    await expect(diaryModal).toBeVisible({ timeout: 500 });

    // 모달 제목 확인
    const modalTitle = page.getByRole("heading", { name: "일기 쓰기" });
    await expect(modalTitle).toBeVisible({ timeout: 500 });
  });
});

test.describe("Diaries 모달 링크 기능", () => {
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto("/diaries");

    // 페이지 로드 완료 대기 - data-testid를 사용하여 컨테이너 확인
    await page.waitForSelector('[data-testid="diaries-list"]');
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
    const diariesContainer = page.locator('[data-testid="diaries-list"]');
    await expect(diariesContainer).toBeInViewport();

    // 일기쓰기 버튼도 여전히 DOM에 존재하는지 확인
    await expect(writeButton).toBeInViewport();
  });
});
