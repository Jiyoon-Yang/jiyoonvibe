import { test, expect } from "@playwright/test";
import { EmotionType } from "@/commons/constants/enum";

// 테스트용 일기 데이터
const testDiary = {
  id: 1,
  title: "테스트 일기 제목",
  content: "테스트 일기 내용입니다.",
  emotion: EmotionType.Happy,
  createdAt: "2024-01-01T00:00:00.000Z",
};

test.describe("일기상세 수정 기능", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.addInitScript((diary) => {
      localStorage.setItem("diaries", JSON.stringify([diary]));
    }, testDiary);

    // 일기상세 페이지로 이동
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]');
  });

  test("일기 수정 버튼 클릭 시 수정 모드로 전환", async ({ page }) => {
    // 수정 버튼 클릭
    await page.click('button:has-text("수정")');

    // 수정 모드 확인 - 기분 선택 영역이 나타나는지 확인
    await expect(page.locator('text="오늘 기분은 어땟나요?"')).toBeVisible();

    // 제목 입력 필드가 나타나는지 확인
    await expect(page.locator('input[placeholder*="제목"]')).toBeVisible();

    // 내용 입력 필드가 나타나는지 확인
    await expect(page.locator('textarea[placeholder*="내용"]')).toBeVisible();

    // 수정하기, 취소 버튼이 나타나는지 확인
    await expect(page.locator('button:has-text("수정 하기")')).toBeVisible();
    await expect(page.locator('button:has-text("취소")')).toBeVisible();
  });

  test("수정 중일 때 회고 입력창이 비활성화됨", async ({ page }) => {
    // 수정 버튼 클릭하여 수정 모드로 전환
    await page.click('button:has-text("수정")');

    // 회고 입력창이 비활성화되었는지 확인
    const retrospectInput = page.locator(
      '[data-testid="retrospect-input-field"]'
    );
    await expect(retrospectInput).toBeDisabled();

    // 회고 입력 버튼이 비활성화되었는지 확인
    const retrospectButton = page.locator(
      '[data-testid="retrospect-input-button"]'
    );
    await expect(retrospectButton).toBeDisabled();

    // 비활성화 메시지가 placeholder로 표시되는지 확인
    await expect(retrospectInput).toHaveAttribute(
      "placeholder",
      "수정중일땐 회고를 작성할 수 없어요."
    );
  });

  test("일기 수정 완료", async ({ page }) => {
    // 수정 버튼 클릭
    await page.click('button:has-text("수정")');

    // 감정 변경 (슬퍼요로 변경)
    await page.click('text="슬퍼요"');

    // 제목 변경
    const titleInput = page.locator('input[placeholder*="제목"]');
    await titleInput.clear();
    await titleInput.fill("수정된 제목");

    // 내용 변경
    const contentInput = page.locator('textarea[placeholder*="내용"]');
    await contentInput.clear();
    await contentInput.fill("수정된 내용입니다.");

    // 수정하기 버튼 클릭
    await page.click('button:has-text("수정 하기")');

    // 수정 완료 후 원래 화면으로 돌아가는지 확인
    await expect(
      page.locator('text="오늘 기분은 어땟나요?"')
    ).not.toBeVisible();

    // 수정된 내용이 반영되었는지 확인
    await expect(page.locator('[data-testid="detail-title"]')).toHaveText(
      "수정된 제목"
    );
    await expect(page.locator('[data-testid="detail-content"]')).toHaveText(
      "수정된 내용입니다."
    );

    // 수정된 감정이 반영되었는지 확인
    await expect(page.locator('[data-testid="emotion-text"]')).toHaveText(
      "슬퍼요"
    );
  });

  test("수정 취소", async ({ page }) => {
    // 수정 버튼 클릭
    await page.click('button:has-text("수정")');

    // 제목 변경
    const titleInput = page.locator('input[placeholder*="제목"]');
    await titleInput.clear();
    await titleInput.fill("취소 테스트 제목");

    // 취소 버튼 클릭
    await page.click('button:has-text("취소")');

    // 원래 화면으로 돌아가는지 확인
    await expect(
      page.locator('text="오늘 기분은 어땟나요?"')
    ).not.toBeVisible();

    // 원래 내용이 유지되는지 확인
    await expect(page.locator('[data-testid="detail-title"]')).toHaveText(
      "테스트 일기 제목"
    );
    await expect(page.locator('[data-testid="detail-content"]')).toHaveText(
      "테스트 일기 내용입니다."
    );
  });

  test("모든 감정 타입으로 수정 가능", async ({ page }) => {
    const emotions = [
      { type: EmotionType.Happy, label: "행복해요" },
      { type: EmotionType.Sad, label: "슬퍼요" },
      { type: EmotionType.Angry, label: "화나요" },
      { type: EmotionType.Surprise, label: "놀랐어요" },
      { type: EmotionType.Etc, label: "기타" },
    ];

    for (const emotion of emotions) {
      // 수정 버튼 클릭
      await page.click('button:has-text("수정")');

      // 해당 감정 선택
      await page.click(`text="${emotion.label}"`);

      // 수정하기 버튼 클릭
      await page.click('button:has-text("수정 하기")');

      // 수정된 감정이 반영되었는지 확인
      await expect(page.locator('[data-testid="emotion-text"]')).toHaveText(
        emotion.label
      );
    }
  });

  test("폼 검증 - 제목이 비어있을 때", async ({ page }) => {
    // 수정 버튼 클릭
    await page.click('button:has-text("수정")');

    // 제목을 비우기
    const titleInput = page.locator('input[placeholder*="제목"]');
    await titleInput.clear();

    // 수정하기 버튼이 비활성화되어 있는지 확인
    const submitButton = page.locator('button:has-text("수정 하기")');
    await expect(submitButton).toBeDisabled();
  });

  test("폼 검증 - 내용이 비어있을 때", async ({ page }) => {
    // 수정 버튼 클릭
    await page.click('button:has-text("수정")');

    // 내용을 비우기
    const contentInput = page.locator('textarea[placeholder*="내용"]');
    await contentInput.clear();

    // 수정하기 버튼이 비활성화되어 있는지 확인
    const submitButton = page.locator('button:has-text("수정 하기")');
    await expect(submitButton).toBeDisabled();
  });
});
