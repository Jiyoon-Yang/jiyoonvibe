import { test, expect } from "@playwright/test";

test.describe("Pictures Filter Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pictures");
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="pictures-list"]', {
      timeout: 2000,
    });
  });

  test("필터 선택박스가 올바르게 렌더링되어야 함", async ({ page }) => {
    // 필터 선택박스가 존재하는지 확인
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    await expect(filterSelectbox).toBeVisible();

    // 기본 옵션들이 올바르게 표시되는지 확인
    await filterSelectbox.click();

    // 기본, 가로형, 세로형 옵션이 있는지 확인
    await expect(
      page.locator('[role="listbox"]').locator("text=기본")
    ).toBeVisible();
    await expect(
      page.locator('[role="listbox"]').locator("text=가로형")
    ).toBeVisible();
    await expect(
      page.locator('[role="listbox"]').locator("text=세로형")
    ).toBeVisible();
  });

  test("기본 필터가 선택되어야 함", async ({ page }) => {
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    await expect(filterSelectbox).toHaveText("기본");
  });

  test("기본 필터에서 이미지 크기가 640x640이어야 함", async ({ page }) => {
    // 이미지 컨테이너의 크기 확인
    const imageContainer = page
      .locator('[data-testid="image-container"]')
      .first();
    await expect(imageContainer).toBeVisible();

    // CSS 스타일로 크기 확인 (640x640)
    const boundingBox = await imageContainer.boundingBox();
    expect(boundingBox?.width).toBe(640);
    expect(boundingBox?.height).toBe(640);
  });

  test("가로형 필터 선택시 이미지 크기가 640x480으로 변경되어야 함", async ({
    page,
  }) => {
    // 가로형 필터 선택
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    await filterSelectbox.click();
    await page.locator("text=가로형").click();

    // 필터 변경 확인
    await expect(filterSelectbox).toHaveText("가로형");

    // 이미지 크기 변경 확인
    const imageContainer = page
      .locator('[data-testid="image-container"]')
      .first();
    const boundingBox = await imageContainer.boundingBox();
    expect(boundingBox?.width).toBe(640);
    expect(boundingBox?.height).toBe(480);
  });

  test("세로형 필터 선택시 이미지 크기가 480x640으로 변경되어야 함", async ({
    page,
  }) => {
    // 세로형 필터 선택
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    await filterSelectbox.click();
    await page.locator("text=세로형").click();

    // 필터 변경 확인
    await expect(filterSelectbox).toHaveText("세로형");

    // 이미지 크기 변경 확인
    const imageContainer = page
      .locator('[data-testid="image-container"]')
      .first();
    const boundingBox = await imageContainer.boundingBox();
    expect(boundingBox?.width).toBe(480);
    expect(boundingBox?.height).toBe(640);
  });

  test("필터 변경시 모든 이미지가 동일한 크기로 변경되어야 함", async ({
    page,
  }) => {
    // 가로형 필터 선택
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    await filterSelectbox.click();
    await page.locator("text=가로형").click();

    // 모든 이미지 컨테이너의 크기 확인
    const imageContainers = page.locator('[data-testid="image-container"]');
    const count = await imageContainers.count();

    for (let i = 0; i < count; i++) {
      const container = imageContainers.nth(i);
      const boundingBox = await container.boundingBox();
      expect(boundingBox?.width).toBe(640);
      expect(boundingBox?.height).toBe(480);
    }
  });

  test("필터 변경시 이미지가 다시 로드되어야 함", async ({ page }) => {
    // 이미지가 로드될 때까지 대기
    await page.waitForSelector('[data-testid="image-container"]', {
      timeout: 2000,
    });

    // 기본 필터에서 이미지 확인
    const initialImages = page.locator('[data-testid="image-container"]');
    const initialCount = await initialImages.count();

    // 가로형 필터로 변경
    const filterSelectbox = page.locator('[data-testid="filter-selectbox"]');
    await filterSelectbox.click();
    await page.locator('[role="listbox"]').locator("text=가로형").click();

    // 이미지가 여전히 표시되는지 확인
    await expect(initialImages.first()).toBeVisible();

    // 이미지 개수가 유지되는지 확인 (초기 개수가 0이 아닌 경우에만)
    if (initialCount > 0) {
      const finalCount = await initialImages.count();
      expect(finalCount).toBe(initialCount);
    }
  });
});
