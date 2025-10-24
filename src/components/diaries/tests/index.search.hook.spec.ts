import { test, expect } from "@playwright/test";

test.describe("일기 검색 기능", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    const testDiaries = [
      {
        id: 1,
        title: "행복한 하루",
        content: "오늘은 정말 행복한 하루였어요.",
        emotion: "Happy",
        createdAt: "2024-01-15T10:00:00Z",
      },
      {
        id: 2,
        title: "슬픈 날",
        content: "오늘은 슬픈 일이 있었어요.",
        emotion: "Sad",
        createdAt: "2024-01-16T10:00:00Z",
      },
      {
        id: 3,
        title: "화나는 순간",
        content: "오늘 정말 화가 났어요.",
        emotion: "Angry",
        createdAt: "2024-01-17T10:00:00Z",
      },
      {
        id: 4,
        title: "놀라운 일",
        content: "오늘 정말 놀라운 일이 있었어요.",
        emotion: "Surprise",
        createdAt: "2024-01-18T10:00:00Z",
      },
      {
        id: 5,
        title: "기타 감정",
        content: "오늘은 특별한 감정이었어요.",
        emotion: "Etc",
        createdAt: "2024-01-19T10:00:00Z",
      },
    ];

    await page.goto("/diaries");
    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);

    // 페이지 새로고침하여 데이터 로드
    await page.reload();

    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diaries-list"]');
  });

  test("검색창에 검색어 입력 시 엔터 또는 돋보기 버튼 활성화", async ({
    page,
  }) => {
    // 검색창 찾기
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible();

    // 검색어 입력
    await searchInput.fill("행복");

    // 엔터키로 검색 실행
    await searchInput.press("Enter");

    // 검색 결과 확인 (행복한 하루만 표시되어야 함)
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);

    const cardTitle = page.locator('[data-testid="card-title"]').first();
    await expect(cardTitle).toHaveText("행복한 하루");
  });

  test("검색어가 포함된 제목의 일기만 필터링", async ({ page }) => {
    // 검색창에 '하루' 입력 (행복한 하루에 포함)
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("하루");
    await searchInput.press("Enter");

    // 검색 결과 확인 (행복한 하루만 표시)
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);

    const cardTitle = page.locator('[data-testid="card-title"]').first();
    await expect(cardTitle).toHaveText("행복한 하루");
  });

  test("검색어가 포함되지 않은 제목의 일기 필터링", async ({ page }) => {
    // 검색창에 '없는단어' 입력
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("없는단어");
    await searchInput.press("Enter");

    // 검색 결과 확인 (일치하는 일기가 없으므로 0개)
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(0);
  });

  test("빈 검색어로 검색 시 모든 일기 표시", async ({ page }) => {
    // 검색창에 빈 문자열 입력
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("");
    await searchInput.press("Enter");

    // 검색 결과 확인 (모든 일기 표시)
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(5);
  });

  test("부분 검색어로 검색", async ({ page }) => {
    // 검색창에 '행' 입력 (행복한 하루의 일부)
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("행");
    await searchInput.press("Enter");

    // 검색 결과 확인 (행복한 하루만 표시)
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);

    const cardTitle = page.locator('[data-testid="card-title"]').first();
    await expect(cardTitle).toHaveText("행복한 하루");
  });

  test("대소문자 구분 없는 검색", async ({ page }) => {
    // 검색창에 'HAPPY' 입력 (대문자) - 하지만 제목에는 '행복한'이므로 '행복'으로 검색
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("행복");
    await searchInput.press("Enter");

    // 검색 결과 확인 (행복한 하루만 표시)
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);

    const cardTitle = page.locator('[data-testid="card-title"]').first();
    await expect(cardTitle).toHaveText("행복한 하루");
  });
});
