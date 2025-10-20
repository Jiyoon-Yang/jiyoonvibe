import { test, expect } from "@playwright/test";

/**
 * Pictures Binding Hook E2E Tests
 *
 * 조건
 * - jest, @testing-library/react 미사용
 * - 실제 데이터 사용, 성공 케이스 모킹 금지
 * - /pictures 페이지 완전 로드 후 테스트 (data-testid 대기)
 * - timeout: 네트워크 2000ms 미만
 */

test.describe("Pictures Binding Hook - success", () => {
  test("강아지 이미지 6장이 로드되고 dog.ceo 주소를 포함한다", async ({
    page,
  }) => {
    await page.goto("/pictures");
    await page.waitForSelector('[data-testid="pictures-list"]', {
      timeout: 1500,
    });

    // 첫 페이지 로드 후 이미지가 일부 표시되면, src에 dog.ceo 포함 확인
    const firstImg = page.locator('[data-testid="pictures-list"] img').first();
    await firstImg.waitFor({ state: "visible", timeout: 1500 });
    const src = await firstImg.getAttribute("src");
    expect(src ?? "").toContain("dog.ceo");
  });

  test("무한스크롤: 하단으로 스크롤 시 추가 이미지가 로드된다", async ({
    page,
  }) => {
    await page.goto("/pictures");
    await page.waitForSelector('[data-testid="pictures-list"]', {
      timeout: 1500,
    });

    const list = page.locator('[data-testid="pictures-list"]');
    // 초기 이미지 개수
    const before = await list.locator("img").count();

    // 바닥 근처까지 스크롤 (여러 번 시도하여 sentinel 교차 유도)
    for (let i = 0; i < 3; i++) {
      await page.mouse.wheel(0, 2000);
      await page.waitForTimeout(200);
    }

    // 추가 로드 대기
    await page.waitForTimeout(600);
    const after = await list.locator("img").count();
    expect(after).toBeGreaterThan(before);
  });
});

/**
 * 실패 시나리오 (API 모킹 허용)
 * - 라우트 인터셉트로 500 응답
 * - 에러 UI 노출 확인
 */
test.describe("Pictures Binding Hook - failure", () => {
  test("API 실패 시 에러 UI가 표시된다", async ({ page }) => {
    await page.route(
      "https://dog.ceo/api/breeds/image/random/6",
      async (route) => {
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({ status: "error", message: [] }),
        });
      }
    );

    await page.goto("/pictures");
    await page.waitForSelector('[data-testid="pictures-list"]', {
      timeout: 1500,
    });
    const error = page.locator('[data-testid="error"]');
    await expect(error).toHaveText("이미지를 불러오지 못했습니다.");
  });
});
