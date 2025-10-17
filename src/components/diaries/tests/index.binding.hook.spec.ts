import { test, expect } from "@playwright/test";
import { EmotionType } from "@/commons/constants/enum";

/**
 * Diaries Binding Hook E2E Tests
 *
 * 테스트 대상:
 * - 로컬스토리지 실제 데이터 바인딩
 * - Emotion 타입별 이미지 매핑
 * - Emotion 타입별 감정 텍스트 표시
 * - createdAt 날짜 형식 변환 (YYYY. MM. DD)
 * - 제목 ellipsis 처리
 * - 빈 데이터 처리
 *
 * 테스트 조건:
 * - Playwright 사용 (jest, @testing-library/react 제외)
 * - 실제 로컬스토리지 데이터 사용 (Mock 미사용)
 * - data-testid 기반 페이지 로드 식별
 * - timeout: 400ms (500ms 미만)
 */

test.describe("Diaries Binding Hook", () => {
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
        {
          id: 4,
          title: "깜짝 놀란 일",
          content: "오늘 놀라운 일이 있었다",
          emotion: "Surprise",
          createdAt: "2024-03-15T10:00:00.000Z",
        },
        {
          id: 5,
          title: "기타 감정",
          content: "특별한 감정",
          emotion: "Etc",
          createdAt: "2024-03-16T10:00:00.000Z",
        },
        {
          id: 6,
          title:
            "타이틀 영역 입니다. 한줄까지만 노출 됩니다. 매우 긴 제목을 테스트하기 위한 텍스트입니다. 이 제목은 카드 영역을 초과할 것입니다.",
          content: "긴 제목 테스트",
          emotion: "Happy",
          createdAt: "2024-03-17T10:00:00.000Z",
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

  test("로컬스토리지의 실제 데이터를 바인딩하여 표시한다", async ({ page }) => {
    // 다이어리 카드들이 렌더링 되었는지 확인
    const diaryCards = page.locator('[data-testid="diary-card"]');
    const count = await diaryCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("emotion에 따라 올바른 이미지를 표시한다", async ({ page }) => {
    // 첫 번째 카드 (Happy emotion)
    const firstCard = page.locator('[data-testid="diary-card"]').first();
    const firstImage = firstCard.locator("img").first();
    const firstImageSrc = await firstImage.getAttribute("src");
    expect(firstImageSrc).toContain("emotion-happy");
  });

  test("emotion에 따라 올바른 감정 텍스트를 표시한다", async ({ page }) => {
    // 첫 번째 카드의 감정 라벨 확인
    const firstCard = page.locator('[data-testid="diary-card"]').first();
    const emotionLabel = firstCard.locator('[data-testid="emotion-label"]');
    await expect(emotionLabel).toHaveText("행복해요");

    // 두 번째 카드의 감정 라벨 확인
    const secondCard = page.locator('[data-testid="diary-card"]').nth(1);
    const emotionLabel2 = secondCard.locator('[data-testid="emotion-label"]');
    await expect(emotionLabel2).toHaveText("슬퍼요");
  });

  test("createdAt을 올바른 형식으로 표시한다", async ({ page }) => {
    // 첫 번째 카드의 날짜 확인
    const firstCard = page.locator('[data-testid="diary-card"]').first();
    const dateElement = firstCard.locator('[data-testid="card-date"]');
    const dateText = await dateElement.textContent();

    // 날짜 형식 확인 (YYYY. MM. DD)
    expect(dateText).toMatch(/\d{4}\.\s\d{2}\.\s\d{2}/);
  });

  test("제목을 올바르게 표시한다", async ({ page }) => {
    // 첫 번째 카드의 제목 확인
    const firstCard = page.locator('[data-testid="diary-card"]').first();
    const titleElement = firstCard.locator('[data-testid="card-title"]');
    await expect(titleElement).toHaveText("행복한 하루");
  });

  test("긴 제목은 카드 영역을 넘어가지 않도록 처리한다", async ({ page }) => {
    // 긴 제목을 가진 카드 찾기
    const cards = page.locator('[data-testid="diary-card"]');
    const longTitleCard = cards.nth(5); // 6번째 카드 (긴 제목)

    const titleElement = longTitleCard.locator('[data-testid="card-title"]');
    const titleBox = await titleElement.boundingBox();

    // 카드의 너비 확인
    const cardBox = await longTitleCard.boundingBox();

    if (titleBox && cardBox) {
      // 제목이 카드 영역을 넘어가지 않는지 확인
      expect(titleBox.width).toBeLessThanOrEqual(cardBox.width);
    }

    // CSS에서 text-overflow: ellipsis가 적용되었는지 확인
    const overflow = await titleElement.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        overflow: style.overflow,
        textOverflow: style.textOverflow,
        whiteSpace: style.whiteSpace,
      };
    });

    expect(overflow.textOverflow).toBe("ellipsis");
  });

  test("로컬스토리지에 데이터가 없을 때 빈 리스트를 표시한다", async ({
    page,
  }) => {
    // 로컬스토리지 비우기
    await page.evaluate(() => {
      localStorage.removeItem("diaries");
    });

    await page.reload();
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 400,
    });

    // 카드가 없는지 확인
    const diaryCards = page.locator('[data-testid="diary-card"]');
    const count = await diaryCards.count();
    expect(count).toBe(0);
  });

  test("모든 emotion 타입이 올바르게 렌더링된다", async ({ page }) => {
    const emotionMap = {
      0: "행복해요", // Happy
      1: "슬퍼요", // Sad
      2: "화나요", // Angry
      3: "놀랐어요", // Surprise
      4: "기타", // Etc
    };

    for (const [index, expectedLabel] of Object.entries(emotionMap)) {
      const card = page
        .locator('[data-testid="diary-card"]')
        .nth(Number(index));
      const emotionLabel = card.locator('[data-testid="emotion-label"]');
      await expect(emotionLabel).toHaveText(expectedLabel);
    }
  });

  test("잘못된 형식의 로컬스토리지 데이터를 안전하게 처리한다", async ({
    page,
  }) => {
    // 잘못된 JSON 형식으로 데이터 저장
    await page.evaluate(() => {
      localStorage.setItem("diaries", "invalid json");
    });

    await page.reload();
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 400,
    });

    // 에러가 발생하지 않고 빈 리스트로 표시되어야 함
    const diaryCards = page.locator('[data-testid="diary-card"]');
    const count = await diaryCards.count();
    expect(count).toBe(0);
  });

  test("데이터가 많을 때도 올바르게 렌더링된다", async ({ page }) => {
    // 대량의 데이터 생성
    await page.evaluate(() => {
      const largeDiaries = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        title: `일기 제목 ${i + 1}`,
        content: `일기 내용 ${i + 1}`,
        emotion: ["Happy", "Sad", "Angry", "Surprise", "Etc"][i % 5],
        createdAt: new Date(2024, 2, (i % 28) + 1).toISOString(),
      }));
      localStorage.setItem("diaries", JSON.stringify(largeDiaries));
    });

    await page.reload();
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 400,
    });

    // 모든 카드가 렌더링되었는지 확인
    const diaryCards = page.locator('[data-testid="diary-card"]');
    const count = await diaryCards.count();
    expect(count).toBe(20);
  });

  test("날짜 형식이 일관되게 표시된다", async ({ page }) => {
    // 다양한 날짜 형식 테스트
    const firstCard = page.locator('[data-testid="diary-card"]').first();
    const dateElement = firstCard.locator('[data-testid="card-date"]');
    const dateText = await dateElement.textContent();

    // 날짜가 정확히 "YYYY. MM. DD" 형식인지 확인
    expect(dateText).toBe("2024. 03. 12");
  });
});
