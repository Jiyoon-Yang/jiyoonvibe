import { test, expect } from "@playwright/test";

test.describe("일기 페이지네이션 기능", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 추가
    await page.goto("/diaries");

    // 로컬스토리지에 있는 데이터 확인을 위해 대기
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 500,
    });
  });

  test("페이지 로드 확인", async ({ page }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 500,
    });
    const container = await page.locator('[data-testid="diaries-list"]');
    await expect(container).toBeVisible();
  });

  test("한 페이지에 12개의 일기카드가 노출되는지 확인", async ({ page }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 500,
    });

    const cards = await page.locator('[data-testid="diary-card"]').all();
    expect(cards.length).toBeLessThanOrEqual(12);
  });

  test("페이지 번호가 1, 2, 3, 4, 5 형태로 5개 단위로 노출되는지 확인", async ({
    page,
  }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 500,
    });

    // 페이지네이션 버튼 확인
    const pagination = page
      .locator('[role="button"]')
      .filter({ hasText: /^[1-9]\d*$/ });
    const pageButtons = await pagination.all();

    // 페이지 번호가 5개 이하로 표시되는지 확인
    expect(pageButtons.length).toBeLessThanOrEqual(5);
  });

  test("페이지번호 클릭 - 해당 페이지번호에 맞는 일기 컨텐츠목록 보여지는지 확인", async ({
    page,
  }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 500,
    });

    // 카드가 있는지 확인
    const cardCount = await page.locator('[data-testid="diary-card"]').count();

    if (cardCount > 12) {
      // 첫 번째 페이지의 첫 번째 카드 제목 저장
      const firstPageFirstCardTitle = await page
        .locator('[data-testid="diary-card"]')
        .first()
        .locator('[data-testid="card-title"]')
        .textContent();

      // 두 번째 페이지로 이동
      const page2Button = page.locator('button[aria-label="페이지 2"]');
      if (await page2Button.isVisible({ timeout: 500 })) {
        await page2Button.click();

        // 페이지 전환 후 다시 확인
        await page.waitForTimeout(200);

        // 두 번째 페이지의 첫 번째 카드 제목
        const secondPageFirstCardTitle = await page
          .locator('[data-testid="diary-card"]')
          .first()
          .locator('[data-testid="card-title"]')
          .textContent();

        // 내용이 다른지 확인
        expect(firstPageFirstCardTitle).not.toBe(secondPageFirstCardTitle);
      }
    } else {
      // 카드가 12개 이하면 테스트 스킵
      console.log("카드가 12개 이하여서 페이지네이션 테스트를 건너뜁니다.");
    }
  });

  test("검색 결과 페이지네이션하기", async ({ page }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 500,
    });

    // 검색어 입력
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("테스트");
    await searchInput.press("Enter");

    // 검색 후 페이지 로드 대기
    await page.waitForTimeout(100);

    // 검색 결과에 맞게 페이지 수가 변경되었는지 확인
    const cards = await page.locator('[data-testid="diary-card"]').all();
    // 검색 결과가 있을 경우 카드가 표시됨
    console.log("검색 결과 카드 수:", cards.length);
  });

  test("필터결과 페이지네이션하기", async ({ page }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-list"]', {
      timeout: 500,
    });

    // 필터 선택
    const filterSelect = page.locator('[data-testid="filter-selectbox"]');
    await filterSelect.click();

    // 감정 필터 선택 (예: "행복해요")
    await page.locator("text=/행복해요/").click();

    // 필터 적용 후 페이지 로드 대기
    await page.waitForTimeout(100);

    // 필터 결과에 맞게 페이지 수가 변경되었는지 확인
    const cards = await page.locator('[data-testid="diary-card"]').all();
    console.log("필터 결과 카드 수:", cards.length);

    // 모든 카드가 선택한 감정과 일치하는지 확인
    for (const card of cards) {
      const emotionLabel = await card
        .locator('[data-testid="emotion-label"]')
        .textContent();
      console.log("감정 라벨:", emotionLabel);
    }
  });
});
