import { test, expect } from "@playwright/test";
import { EmotionType } from "@/commons/constants/enum";

test.describe("일기 필터 기능 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // 테스트용 일기 데이터 설정 (enum.ts의 EmotionType을 직접 사용)
    const testDiaries = [
      {
        id: 1,
        title: "Happy Day",
        content: "Content for Happy Day",
        emotion: EmotionType.Happy,
        createdAt: "2024-01-01T00:00:00.000Z",
      },
      {
        id: 2,
        title: "Sad Day",
        content: "Content for Sad Day",
        emotion: EmotionType.Sad,
        createdAt: "2024-01-02T00:00:00.000Z",
      },
      {
        id: 3,
        title: "Angry Day",
        content: "Content for Angry Day",
        emotion: EmotionType.Angry,
        createdAt: "2024-01-03T00:00:00.000Z",
      },
      {
        id: 4,
        title: "Surprise Day",
        content: "Content for Surprise Day",
        emotion: EmotionType.Surprise,
        createdAt: "2024-01-04T00:00:00.000Z",
      },
      {
        id: 5,
        title: "Etc Day",
        content: "Content for Etc Day",
        emotion: EmotionType.Etc,
        createdAt: "2024-01-05T00:00:00.000Z",
      },
      {
        id: 6,
        title: "Another Happy Day",
        content: "Content for Another Happy Day",
        emotion: EmotionType.Happy,
        createdAt: "2024-01-06T00:00:00.000Z",
      },
    ];

    // 로컬스토리지에 테스트 데이터 설정
    await page.addInitScript((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);
  });

  test("필터 선택박스 클릭 시 올바른 메뉴 옵션이 표시되어야 한다", async ({
    page,
  }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-list"]');

    // 필터 선택박스 클릭
    await page.click('[data-testid="filter-selectbox"]');

    // 드롭다운이 열렸는지 확인 (500ms 미만으로 설정)
    await page.waitForTimeout(300);

    // 선택 가능한 메뉴 옵션 확인 (더 넓은 범위에서 찾기)
    const options = await page.locator("li").allTextContents();

    expect(options).toContain("전체");
    expect(options).toContain("행복해요");
    expect(options).toContain("슬퍼요");
    expect(options).toContain("놀랐어요");
    expect(options).toContain("화나요");
    expect(options).toContain("기타");
  });

  test("전체 필터 선택 시 모든 일기 카드가 노출되어야 한다", async ({
    page,
  }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-list"]');

    // 필터 선택박스 클릭
    await page.click('[data-testid="filter-selectbox"]');
    await page.waitForTimeout(300);

    // 전체 옵션 선택
    await page.click("text=전체");

    // 모든 일기 카드가 표시되는지 확인
    const diaryCards = await page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(6);
  });

  test("행복해요 필터 선택 시 Happy 감정의 일기 카드만 노출되어야 한다", async ({
    page,
  }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-list"]');

    // 필터 선택박스 클릭
    await page.click('[data-testid="filter-selectbox"]');
    await page.waitForTimeout(300);

    // 행복해요 옵션 선택
    await page.click("text=행복해요");

    // Happy 감정의 일기 카드만 표시되는지 확인
    const diaryCards = await page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(2);

    // 각 카드의 감정 라벨이 "행복해요"인지 확인 (enum.ts의 emotions 데이터와 비교)
    const emotionLabels = await page
      .locator('[data-testid="emotion-label"]')
      .allTextContents();
    for (const label of emotionLabels) {
      expect(label).toBe("행복해요"); // emotions[EmotionType.Happy].label과 일치
    }
  });

  test("슬퍼요 필터 선택 시 Sad 감정의 일기 카드만 노출되어야 한다", async ({
    page,
  }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-list"]');

    // 필터 선택박스 클릭
    await page.click('[data-testid="filter-selectbox"]');
    await page.waitForTimeout(300);

    // 슬퍼요 옵션 선택
    await page.click("text=슬퍼요");

    // Sad 감정의 일기 카드만 표시되는지 확인
    const diaryCards = await page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);

    // 감정 라벨이 "슬퍼요"인지 확인
    const emotionLabel = await page
      .locator('[data-testid="emotion-label"]')
      .textContent();
    expect(emotionLabel).toBe("슬퍼요");
  });

  test("놀랐어요 필터 선택 시 Surprise 감정의 일기 카드만 노출되어야 한다", async ({
    page,
  }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-list"]');

    // 필터 선택박스 클릭
    await page.click('[data-testid="filter-selectbox"]');
    await page.waitForTimeout(300);

    // 놀랐어요 옵션 선택
    await page.click("text=놀랐어요");

    // Surprise 감정의 일기 카드만 표시되는지 확인
    const diaryCards = await page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);

    // 감정 라벨이 "놀랐어요"인지 확인
    const emotionLabel = await page
      .locator('[data-testid="emotion-label"]')
      .textContent();
    expect(emotionLabel).toBe("놀랐어요");
  });

  test("화나요 필터 선택 시 Angry 감정의 일기 카드만 노출되어야 한다", async ({
    page,
  }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-list"]');

    // 필터 선택박스 클릭
    await page.click('[data-testid="filter-selectbox"]');
    await page.waitForTimeout(300);

    // 화나요 옵션 선택
    await page.click("text=화나요");

    // Angry 감정의 일기 카드만 표시되는지 확인
    const diaryCards = await page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);

    // 감정 라벨이 "화나요"인지 확인
    const emotionLabel = await page
      .locator('[data-testid="emotion-label"]')
      .textContent();
    expect(emotionLabel).toBe("화나요");
  });

  test("검색 결과에 대해 필터가 적용되어야 한다", async ({ page }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-list"]');

    // 1. 검색창에 검색어를 입력하여 검색
    await page.fill('[data-testid="search-input"]', "Happy");

    // 검색 결과 확인 (Happy가 포함된 일기 2개)
    let diaryCards = await page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(2);

    // 2. 검색된 결과를 바탕으로 필터선택박스를 변경
    await page.click('[data-testid="filter-selectbox"]');
    await page.waitForTimeout(300);
    await page.click("text=행복해요");

    // 선택한 emotion과 일치하는 일기 카드만 노출되는지 확인
    diaryCards = await page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(2);

    // 각 카드의 감정 라벨이 "행복해요"인지 확인 (enum.ts의 emotions 데이터와 비교)
    const emotionLabels = await page
      .locator('[data-testid="emotion-label"]')
      .allTextContents();
    for (const label of emotionLabels) {
      expect(label).toBe("행복해요"); // emotions[EmotionType.Happy].label과 일치
    }
  });

  test("검색 결과에 대해 다른 감정 필터 적용 시 결과가 없어야 한다", async ({
    page,
  }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-list"]');

    // 1. 검색창에 검색어를 입력하여 검색 (Happy가 포함된 일기만 검색)
    await page.fill('[data-testid="search-input"]', "Happy");

    // 검색 결과 확인
    let diaryCards = await page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(2);

    // 2. 검색된 결과를 바탕으로 필터선택박스를 변경 (다른 감정으로)
    await page.click('[data-testid="filter-selectbox"]');
    await page.waitForTimeout(300);
    await page.click("text=슬퍼요");

    // 선택한 emotion과 일치하는 일기 카드만 노출되는지 확인 (결과 없음)
    diaryCards = await page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(0);
  });
});
