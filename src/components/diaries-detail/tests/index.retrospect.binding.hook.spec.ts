import { test, expect } from "@playwright/test";

/**
 * 회고 데이터 바인딩 훅 테스트
 *
 * 로컬스토리지의 "retrospects" 데이터를 사용하여
 * 특정 diaryId와 연결된 회고 데이터가 올바르게 바인딩되는지 테스트합니다.
 */
test.describe("회고 데이터 바인딩 훅 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // 먼저 /diaries 페이지로 이동
    await page.goto("/diaries");

    // 테스트용 일기 데이터 설정
    const testDiaries = [
      {
        id: 1,
        title: "테스트 일기",
        content: "테스트 일기 내용입니다.",
        emotion: "Happy",
        createdAt: "2024-01-15T10:00:00.000Z",
      },
    ];

    // 테스트용 회고 데이터 설정
    const testRetrospects = [
      {
        id: 1,
        content: "첫 번째 회고입니다.",
        diaryId: 1,
        createdAt: "2024-01-15T10:00:00.000Z",
      },
      {
        id: 2,
        content: "두 번째 회고입니다.",
        diaryId: 1,
        createdAt: "2024-01-16T11:00:00.000Z",
      },
      {
        id: 3,
        content: "다른 일기의 회고입니다.",
        diaryId: 2,
        createdAt: "2024-01-17T12:00:00.000Z",
      },
    ];

    // 로컬스토리지에 테스트 데이터 설정
    await page.evaluate(
      ({ diaries, retrospects }) => {
        localStorage.setItem("diaries", JSON.stringify(diaries));
        localStorage.setItem("retrospects", JSON.stringify(retrospects));
      },
      { diaries: testDiaries, retrospects: testRetrospects }
    );
  });

  test("특정 일기의 회고 데이터가 올바르게 바인딩되는지 확인", async ({
    page,
  }) => {
    // /diaries/1 페이지로 이동
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    // 회고 목록이 표시되는지 확인
    const retrospectList = page.locator('[data-testid="retrospect-list"]');
    await expect(retrospectList).toBeVisible();

    // diaryId가 1인 회고만 표시되는지 확인 (2개)
    const retrospectItems = page.locator('[data-testid="retrospect-item"]');
    await expect(retrospectItems).toHaveCount(2);

    // 첫 번째 회고 내용 확인
    const firstRetrospect = retrospectItems.nth(0);
    await expect(
      firstRetrospect.locator('[data-testid="retrospect-text"]')
    ).toHaveText("첫 번째 회고입니다.");

    // 두 번째 회고 내용 확인
    const secondRetrospect = retrospectItems.nth(1);
    await expect(
      secondRetrospect.locator('[data-testid="retrospect-text"]')
    ).toHaveText("두 번째 회고입니다.");
  });

  test("회고 날짜가 올바른 형식으로 표시되는지 확인", async ({ page }) => {
    // /diaries/1 페이지로 이동
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    const retrospectItems = page.locator('[data-testid="retrospect-item"]');

    // 첫 번째 회고 날짜 확인 (2024. 01. 15)
    const firstRetrospectDate = retrospectItems
      .nth(0)
      .locator('[data-testid="retrospect-date"]');
    await expect(firstRetrospectDate).toHaveText("2024. 01. 15");

    // 두 번째 회고 날짜 확인 (2024. 01. 16)
    const secondRetrospectDate = retrospectItems
      .nth(1)
      .locator('[data-testid="retrospect-date"]');
    await expect(secondRetrospectDate).toHaveText("2024. 01. 16");
  });

  test("다른 일기의 회고는 표시되지 않는지 확인", async ({ page }) => {
    // /diaries/1 페이지로 이동
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    const retrospectItems = page.locator('[data-testid="retrospect-item"]');

    // diaryId가 2인 회고("다른 일기의 회고입니다.")가 표시되지 않는지 확인
    const retrospectTexts = await retrospectItems
      .locator('[data-testid="retrospect-text"]')
      .allTextContents();
    expect(retrospectTexts).not.toContain("다른 일기의 회고입니다.");
  });

  test("회고가 없는 경우 빈 상태 메시지가 표시되는지 확인", async ({
    page,
  }) => {
    // /diaries/1 페이지로 이동
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    // 로컬스토리지에서 모든 회고 데이터 제거
    await page.evaluate(() => {
      localStorage.removeItem("retrospects");
    });

    // 페이지 새로고침
    await page.reload();
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    // 빈 상태 메시지 확인
    const retrospectList = page.locator('[data-testid="retrospect-list"]');
    await expect(
      retrospectList.locator('[data-testid="retrospect-text"]')
    ).toHaveText("아직 등록된 회고가 없습니다.");
  });

  test("로컬스토리지 변경 시 회고 목록이 자동으로 업데이트되는지 확인", async ({
    page,
  }) => {
    // /diaries/1 페이지로 이동
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    // 새로운 회고 데이터 추가
    const newRetrospect = {
      id: 4,
      content: "새로 추가된 회고입니다.",
      diaryId: 1,
      createdAt: "2024-01-18T13:00:00.000Z",
    };

    // 로컬스토리지에 새 회고 추가
    await page.evaluate((retrospect) => {
      const existingRetrospects = JSON.parse(
        localStorage.getItem("retrospects") || "[]"
      );
      existingRetrospects.push(retrospect);
      localStorage.setItem("retrospects", JSON.stringify(existingRetrospects));

      // storage 이벤트 수동 발생
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "retrospects",
          newValue: JSON.stringify(existingRetrospects),
        })
      );
    }, newRetrospect);

    // 새 회고가 목록에 추가되었는지 확인
    const retrospectItems = page.locator('[data-testid="retrospect-item"]');
    await expect(retrospectItems).toHaveCount(3);

    // 새로 추가된 회고 내용 확인
    const newRetrospectItem = retrospectItems.nth(2);
    await expect(
      newRetrospectItem.locator('[data-testid="retrospect-text"]')
    ).toHaveText("새로 추가된 회고입니다.");
  });
});
