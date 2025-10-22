import { test, expect } from "@playwright/test";

test.describe("회원가입 폼 기능 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // 회원가입 페이지로 이동
    await page.goto("/auth/signup");

    // 페이지 로드 완료 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="signup-page"]', {
      timeout: 5000,
    });
  });

  test("모든 인풋이 입력되면 회원가입 버튼이 활성화된다", async ({ page }) => {
    // 초기에는 버튼이 비활성화되어 있어야 함
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();

    // 폼 입력
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "test1234");
    await page.fill('input[name="passwordConfirm"]', "test1234");
    await page.fill('input[name="name"]', "테스트");

    // 모든 입력 후 버튼이 활성화되어야 함
    await expect(submitButton).toBeEnabled();
  });

  test("이메일 형식이 올바르지 않으면 에러 메시지가 표시된다", async ({
    page,
  }) => {
    // 잘못된 이메일 입력
    await page.fill('input[name="email"]', "invalid-email");
    await page.fill('input[name="password"]', "test1234");

    // 다른 필드로 포커스 이동 (blur)
    await page.fill('input[name="passwordConfirm"]', "");

    // 에러 메시지 확인 (비네트워크 통신이므로 timeout 500ms 미만)
    const errorMessage = page.locator("text=@를 포함해야 합니다").first();
    await expect(errorMessage).toBeVisible({ timeout: 400 });
  });

  test("비밀번호가 8자 미만이거나 영문+숫자가 아니면 에러 메시지가 표시된다", async ({
    page,
  }) => {
    // 8자 미만 비밀번호
    await page.fill('input[name="password"]', "test12");
    await page.fill('input[name="name"]', "");

    // 에러 메시지 확인 (비네트워크 통신이므로 timeout 500ms 미만)
    const errorMessage = page.locator("text=/.*8자 이상.*/i").first();
    await expect(errorMessage).toBeVisible({ timeout: 400 });
  });

  test("비밀번호 확인이 일치하지 않으면 에러 메시지가 표시된다", async ({
    page,
  }) => {
    await page.fill('input[name="password"]', "test1234");
    await page.fill('input[name="passwordConfirm"]', "test5678");
    await page.fill('input[name="name"]', "");

    // 에러 메시지 확인 (비네트워크 통신이므로 timeout 500ms 미만)
    const errorMessage = page.locator("text=/.*비밀번호가 일치.*/i").first();
    await expect(errorMessage).toBeVisible({ timeout: 400 });
  });

  test("이름이 입력되지 않으면 에러 메시지가 표시된다", async ({ page }) => {
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="name"]', "");
    await page.fill('input[name="email"]', "test@example.com");

    // 에러 메시지 확인 (비네트워크 통신이므로 timeout 500ms 미만)
    const errorMessage = page.locator("text=/.*이름.*/i").first();
    await expect(errorMessage).toBeVisible({ timeout: 400 });
  });

  test("회원가입 성공 시나리오 - 실제 API 호출", async ({ page }) => {
    // timestamp를 포함한 고유한 이메일 생성
    const timestamp = Date.now();
    const email = `test${timestamp}@example.com`;

    // API 응답 가로채기 (모킹 아님, 응답 확인용)
    let apiResponseData: any = null;
    page.on("response", async (response) => {
      if (
        response.url() === "https://main-practice.codebootcamp.co.kr/graphql"
      ) {
        const responseBody = await response.json();
        if (responseBody.data?.createUser) {
          apiResponseData = responseBody.data.createUser;
        }
      }
    });

    // 폼 입력
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', "test1234");
    await page.fill('input[name="passwordConfirm"]', "test1234");
    await page.fill('input[name="name"]', "테스트사용자");

    // 제출 버튼 클릭
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // 성공 모달이 표시될 때까지 대기 (네트워크 통신이므로 timeout 2000ms 미만)
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible({ timeout: 1900 });

    // _id가 정상적으로 반환되었는지 확인
    expect(apiResponseData).toBeTruthy();
    expect(apiResponseData._id).toBeTruthy();
    expect(typeof apiResponseData._id).toBe("string");

    // 모달 제목 확인
    const modalTitle = page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toHaveText(/.*가입.*완료.*/i);

    // 확인 버튼 클릭
    const confirmButton = page.locator('[data-testid="modal-primary-button"]');
    await confirmButton.click();

    // 로그인 페이지로 이동 확인 (네트워크 통신이므로 timeout 2000ms 미만)
    await expect(page).toHaveURL("/auth/login", { timeout: 1900 });
  });

  test("회원가입 실패 시나리오 - API 모킹", async ({ page }) => {
    // GraphQL 요청을 가로채서 에러 응답 반환
    await page.route(
      "https://main-practice.codebootcamp.co.kr/graphql",
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            errors: [
              {
                message: "이미 사용 중인 이메일입니다.",
              },
            ],
          }),
        });
      }
    );

    // 폼 입력
    await page.fill('input[name="email"]', "duplicate@example.com");
    await page.fill('input[name="password"]', "test1234");
    await page.fill('input[name="passwordConfirm"]', "test1234");
    await page.fill('input[name="name"]', "테스트사용자");

    // 제출 버튼 클릭
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // 실패 모달이 표시될 때까지 대기 (네트워크 통신이므로 timeout 2000ms 미만)
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible({ timeout: 1900 });

    // 모달 제목 확인 (danger variant)
    const modalTitle = page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toHaveText(/.*가입.*실패.*/i);

    // 확인 버튼 클릭
    const confirmButton = page.locator('[data-testid="modal-primary-button"]');
    await confirmButton.click();

    // 모달이 닫혀야 하고, 여전히 회원가입 페이지에 있어야 함 (비네트워크 통신이므로 timeout 500ms 미만)
    await expect(modal).not.toBeVisible({ timeout: 400 });
    await expect(page).toHaveURL("/auth/signup");
  });

  test("모달은 한 번만 표시되고 닫힌 후 다시 나타나지 않는다", async ({
    page,
  }) => {
    // API 모킹 - 항상 에러 반환
    await page.route(
      "https://main-practice.codebootcamp.co.kr/graphql",
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            errors: [{ message: "테스트 에러" }],
          }),
        });
      }
    );

    // 폼 입력
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "test1234");
    await page.fill('input[name="passwordConfirm"]', "test1234");
    await page.fill('input[name="name"]', "테스트");

    // 첫 번째 제출
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // 모달 표시 확인 (네트워크 통신이므로 timeout 2000ms 미만)
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible({ timeout: 1900 });

    // 확인 버튼 클릭
    const confirmButton = page.locator('[data-testid="modal-primary-button"]');
    await confirmButton.click();

    // 모달이 닫힘 (비네트워크 통신이므로 timeout 500ms 미만)
    await expect(modal).not.toBeVisible({ timeout: 400 });

    // 두 번째 제출
    await submitButton.click();

    // 모달이 다시 표시되지 않아야 함 (비네트워크 통신이므로 timeout 500ms 미만)
    await expect(modal).not.toBeVisible({ timeout: 400 });
  });
});
