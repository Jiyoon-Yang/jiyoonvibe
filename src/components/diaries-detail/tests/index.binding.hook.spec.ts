import { test, expect } from "@playwright/test";
import { EmotionType } from "@/commons/constants/enum";

/**
 * Diaries Detail Binding Hook E2E Tests
 *
 * 테스트 대상:
 * - 다이나믹 라우팅된 [id]로 특정 일기 데이터 바인딩
 * - 로컬스토리지 실제 데이터 사용
 * - Emotion 타입별 아이콘 이미지 표시
 * - Emotion 타입별 감정 텍스트 표시
 * - createdAt 날짜 형식 변환 (YYYY. MM. DD)
 * - 제목, 내용 표시
 * - 존재하지 않는 일기 ID 처리
 *
 * 테스트 조건:
 * - Playwright 사용 (jest, @testing-library/react 제외)
 * - 실제 로컬스토리지 데이터 사용 (Mock 미사용)
 * - data-testid 기반 페이지 로드 식별
 * - timeout: 400ms (500ms 미만)
 */

test.describe("Diaries Detail Binding Hook", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 실제 테스트 데이터 저장
    await page.goto("/diaries");
    await page.evaluate(() => {
      const testDiaries = [
        {
          id: 1,
          title: "행복한 하루",
          content:
            "오늘은 정말 행복한 하루였다. 친구들과 즐거운 시간을 보냈고 맛있는 음식도 먹었다.",
          emotion: "Happy",
          createdAt: "2024-07-12T10:00:00.000Z",
        },
        {
          id: 2,
          title: "슬픈 일이 있었다",
          content:
            "오늘은 슬픈 일이 있었다. 하지만 내일은 더 나아질 거라 믿는다.",
          emotion: "Sad",
          createdAt: "2024-07-13T10:00:00.000Z",
        },
        {
          id: 3,
          title: "화가 났던 순간",
          content: "정말 화가 났다. 하지만 곧 진정할 수 있을 것이다.",
          emotion: "Angry",
          createdAt: "2024-07-14T10:00:00.000Z",
        },
        {
          id: 4,
          title: "깜짝 놀란 일",
          content: "오늘 놀라운 일이 있었다. 예상치 못한 좋은 소식을 들었다.",
          emotion: "Surprise",
          createdAt: "2024-07-15T10:00:00.000Z",
        },
        {
          id: 5,
          title: "기타 감정",
          content: "특별한 감정을 느낀 하루였다.",
          emotion: "Etc",
          createdAt: "2024-07-16T10:00:00.000Z",
        },
      ];
      localStorage.setItem("diaries", JSON.stringify(testDiaries));
    });
  });

  test("특정 id의 일기 데이터를 올바르게 바인딩한다", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    // 제목 확인
    const title = page.locator('[data-testid="detail-title"]');
    await expect(title).toHaveText("행복한 하루");

    // 내용 확인
    const content = page.locator('[data-testid="detail-content"]');
    const contentText = await content.textContent();
    expect(contentText).toContain("오늘은 정말 행복한 하루였다");
  });

  test("emotion에 따라 올바른 아이콘 이미지를 표시한다 - Happy", async ({
    page,
  }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    const emotionIcon = page.locator('[data-testid="emotion-icon"]');
    const iconSrc = await emotionIcon.getAttribute("src");
    expect(iconSrc).toContain("emotion-happy");
    expect(iconSrc).toContain(".png");
  });

  test("emotion에 따라 올바른 아이콘 이미지를 표시한다 - Sad", async ({
    page,
  }) => {
    await page.goto("/diaries/2");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    const emotionIcon = page.locator('[data-testid="emotion-icon"]');
    const iconSrc = await emotionIcon.getAttribute("src");
    expect(iconSrc).toContain("emotion-sad");
    expect(iconSrc).toContain(".png");
  });

  test("emotion에 따라 올바른 감정 텍스트를 표시한다 - Happy", async ({
    page,
  }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    const emotionText = page.locator('[data-testid="emotion-text"]');
    await expect(emotionText).toHaveText("행복해요");
  });

  test("emotion에 따라 올바른 감정 텍스트를 표시한다 - Sad", async ({
    page,
  }) => {
    await page.goto("/diaries/2");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    const emotionText = page.locator('[data-testid="emotion-text"]');
    await expect(emotionText).toHaveText("슬퍼요");
  });

  test("createdAt을 올바른 형식으로 표시한다", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    const dateElement = page.locator('[data-testid="detail-date"]');
    const dateText = await dateElement.textContent();

    // 날짜 형식 확인 (YYYY. MM. DD)
    expect(dateText).toBe("2024. 07. 12");
  });

  test("모든 emotion 타입이 올바르게 렌더링된다", async ({ page }) => {
    const emotionTests = [
      { id: 1, emotion: "Happy", label: "행복해요" },
      { id: 2, emotion: "Sad", label: "슬퍼요" },
      { id: 3, emotion: "Angry", label: "화나요" },
      { id: 4, emotion: "Surprise", label: "놀랐어요" },
      { id: 5, emotion: "Etc", label: "기타" },
    ];

    for (const test of emotionTests) {
      await page.goto(`/diaries/${test.id}`);
      await page.waitForSelector('[data-testid="diary-detail"]', {
        timeout: 400,
      });

      const emotionText = page.locator('[data-testid="emotion-text"]');
      await expect(emotionText).toHaveText(test.label);

      const emotionIcon = page.locator('[data-testid="emotion-icon"]');
      const iconSrc = await emotionIcon.getAttribute("src");
      expect(iconSrc).toContain(`emotion-${test.emotion.toLowerCase()}`);
    }
  });

  test("존재하지 않는 id의 경우 적절히 처리한다", async ({ page }) => {
    await page.goto("/diaries/999");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
      state: "attached",
    });

    // 일기를 찾을 수 없다는 메시지 또는 빈 상태 확인
    const detailContainer = page.locator('[data-testid="diary-detail"]');
    const isEmpty = await detailContainer.evaluate((el) => {
      return el.textContent?.trim() === "" || el.children.length === 0;
    });

    // 빈 상태이거나 "찾을 수 없습니다" 같은 메시지가 있어야 함
    expect(isEmpty).toBe(true);
  });

  test("로컬스토리지에 데이터가 없을 때 적절히 처리한다", async ({ page }) => {
    await page.goto("/diaries/1");

    // 로컬스토리지 비우기
    await page.evaluate(() => {
      localStorage.removeItem("diaries");
    });

    await page.reload();
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
      state: "attached",
    });

    // 빈 상태 확인
    const detailContainer = page.locator('[data-testid="diary-detail"]');
    const isEmpty = await detailContainer.evaluate((el) => {
      return el.textContent?.trim() === "" || el.children.length === 0;
    });

    expect(isEmpty).toBe(true);
  });

  test("잘못된 형식의 로컬스토리지 데이터를 안전하게 처리한다", async ({
    page,
  }) => {
    await page.goto("/diaries/1");

    // 잘못된 JSON 형식으로 데이터 저장
    await page.evaluate(() => {
      localStorage.setItem("diaries", "invalid json");
    });

    await page.reload();
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
      state: "attached",
    });

    // 에러가 발생하지 않고 빈 상태로 표시되어야 함
    const detailContainer = page.locator('[data-testid="diary-detail"]');
    const isEmpty = await detailContainer.evaluate((el) => {
      return el.textContent?.trim() === "" || el.children.length === 0;
    });

    expect(isEmpty).toBe(true);
  });

  test("내용이 올바르게 표시된다", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    const content = page.locator('[data-testid="detail-content"]');
    const contentText = await content.textContent();

    expect(contentText).toContain("오늘은 정말 행복한 하루였다");
    expect(contentText).toContain("친구들과 즐거운 시간을 보냈고");
  });

  test("다른 id로 이동하면 해당 일기 데이터가 표시된다", async ({ page }) => {
    // 첫 번째 일기
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    let title = page.locator('[data-testid="detail-title"]');
    await expect(title).toHaveText("행복한 하루");

    // 두 번째 일기로 이동
    await page.goto("/diaries/2");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    title = page.locator('[data-testid="detail-title"]');
    await expect(title).toHaveText("슬픈 일이 있었다");
  });
});
