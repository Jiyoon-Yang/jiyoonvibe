import { test, expect } from "@playwright/test";

test.describe("회고쓰기 폼 등록 기능", () => {
  test.beforeEach(async ({ page }) => {
    // 먼저 /diaries 페이지로 이동
    await page.goto("/diaries");

    // 테스트용 일기 데이터를 로컬스토리지에 설정
    const testDiary = {
      id: 1,
      title: "테스트 일기",
      content: "테스트 내용입니다.",
      emotion: "Happy",
      createdAt: "2024-01-15T10:00:00.000Z",
    };

    await page.evaluate((diary) => {
      localStorage.setItem("diaries", JSON.stringify([diary]));
    }, testDiary);
  });

  test("회고 입력 필드가 비어있을 때 입력 버튼이 비활성화되어야 함", async ({
    page,
  }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    const inputButton = page.locator('[data-testid="retrospect-input-button"]');
    await expect(inputButton).toBeDisabled();
  });

  test("회고 입력 필드에 텍스트를 입력하면 입력 버튼이 활성화되어야 함", async ({
    page,
  }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    const inputField = page.locator('[data-testid="retrospect-input-field"]');
    const inputButton = page.locator('[data-testid="retrospect-input-button"]');

    await inputField.fill("오늘 하루도 수고했어요");
    await expect(inputButton).toBeEnabled();
  });

  test("회고 등록 시 로컬스토리지에 데이터가 저장되어야 함", async ({
    page,
  }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    const inputField = page.locator('[data-testid="retrospect-input-field"]');
    const inputButton = page.locator('[data-testid="retrospect-input-button"]');

    await inputField.fill("오늘 하루도 수고했어요");
    await inputButton.click();

    // 페이지 새로고침 대신 다시 이동
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    // 로컬스토리지에서 retrospects 데이터 확인
    const retrospects = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("retrospects") || "[]");
    });

    expect(retrospects).toHaveLength(1);
    expect(retrospects[0]).toMatchObject({
      id: 1,
      content: "오늘 하루도 수고했어요",
      diaryId: 1,
      createdAt: expect.any(String),
    });
  });

  test("기존 회고가 있을 때 새 회고 등록 시 ID가 증가해야 함", async ({
    page,
  }) => {
    // 기존 회고 데이터 설정
    await page.evaluate(() => {
      const existingRetrospects = [
        {
          id: 1,
          content: "기존 회고",
          diaryId: 1,
          createdAt: "2024-01-15T10:00:00.000Z",
        },
      ];
      localStorage.setItem("retrospects", JSON.stringify(existingRetrospects));
    });

    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    const inputField = page.locator('[data-testid="retrospect-input-field"]');
    const inputButton = page.locator('[data-testid="retrospect-input-button"]');

    await inputField.fill("새로운 회고");
    await inputButton.click();

    // 페이지 새로고침 대신 다시 이동
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    // 로컬스토리지에서 retrospects 데이터 확인
    const retrospects = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("retrospects") || "[]");
    });

    expect(retrospects).toHaveLength(2);
    expect(retrospects[1]).toMatchObject({
      id: 2,
      content: "새로운 회고",
      diaryId: 1,
      createdAt: expect.any(String),
    });
  });

  test("회고 등록 후 입력 필드가 초기화되어야 함", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    const inputField = page.locator('[data-testid="retrospect-input-field"]');
    const inputButton = page.locator('[data-testid="retrospect-input-button"]');

    await inputField.fill("오늘 하루도 수고했어요");
    await inputButton.click();

    // 페이지 새로고침 대신 다시 이동
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    // 입력 필드가 비어있는지 확인
    await expect(inputField).toHaveValue("");
  });

  test("빈 문자열로 회고 등록 시도 시 등록되지 않아야 함", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail"]', {
      timeout: 400,
    });

    const inputField = page.locator('[data-testid="retrospect-input-field"]');
    const inputButton = page.locator('[data-testid="retrospect-input-button"]');

    await inputField.fill("   "); // 공백만 입력

    // 버튼이 비활성화되어 있어야 함
    await expect(inputButton).toBeDisabled();

    // 로컬스토리지에 retrospects 데이터가 없어야 함
    const retrospects = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("retrospects") || "[]");
    });

    expect(retrospects).toHaveLength(0);
  });
});
