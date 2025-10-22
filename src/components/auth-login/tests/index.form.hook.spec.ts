import { test, expect } from "@playwright/test";

test.describe("로그인 폼 기능 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 페이지로 이동
    await page.goto("/auth/login");

    // 페이지 로드 완료 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="login-page"]', {
      timeout: 5000,
    });
  });

  test("모든 인풋이 입력되면 로그인 버튼이 활성화된다", async ({ page }) => {
    // 초기에는 버튼이 비활성화되어 있어야 함
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();

    // 폼 입력
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "1234");

    // 모든 입력 후 버튼이 활성화되어야 함
    await expect(submitButton).toBeEnabled();
  });

  test("이메일 형식이 올바르지 않으면 에러 메시지가 표시된다", async ({
    page,
  }) => {
    // 잘못된 이메일 입력
    await page.fill('input[name="email"]', "invalid-email");
    await page.fill('input[name="password"]', "");

    // 에러 메시지 확인 (비네트워크 통신이므로 timeout 500ms 미만)
    const errorMessage = page.locator("text=@를 포함해야 합니다").first();
    await expect(errorMessage).toBeVisible({ timeout: 400 });
  });

  test("비밀번호가 입력되지 않으면 에러 메시지가 표시된다", async ({
    page,
  }) => {
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "");
    await page.fill('input[name="email"]', "test@example.com");

    // 에러 메시지 확인 (비네트워크 통신이므로 timeout 500ms 미만)
    const errorMessage = page.locator("text=/.*비밀번호.*/i").first();
    await expect(errorMessage).toBeVisible({ timeout: 400 });
  });

  test("로그인 성공 시나리오 - 실제 API 호출", async ({ page }) => {
    // API 응답 가로채기 (모킹 아님, 응답 확인용)
    let loginResponseData: any = null;
    let userResponseData: any = null;

    page.on("response", async (response) => {
      if (
        response.url() === "https://main-practice.codebootcamp.co.kr/graphql"
      ) {
        const responseBody = await response.json();
        if (responseBody.data?.loginUser) {
          loginResponseData = responseBody.data.loginUser;
        }
        if (responseBody.data?.fetchUserLoggedIn) {
          userResponseData = responseBody.data.fetchUserLoggedIn;
        }
      }
    });

    // 폼 입력 (실제 데이터 사용)
    await page.fill('input[name="email"]', "a@c.com");
    await page.fill('input[name="password"]', "1234qwer");

    // 제출 버튼 클릭
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // 성공 모달이 표시될 때까지 대기 (네트워크 통신이므로 timeout 2000ms 미만)
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible({ timeout: 1900 });

    // loginUser API: accessToken이 정상적으로 반환되었는지 확인
    expect(loginResponseData).toBeTruthy();
    expect(loginResponseData.accessToken).toBeTruthy();
    expect(typeof loginResponseData.accessToken).toBe("string");

    // fetchUserLoggedIn API: _id, name이 정상적으로 반환되었는지 확인
    expect(userResponseData).toBeTruthy();
    expect(userResponseData._id).toBeTruthy();
    expect(userResponseData.name).toBeTruthy();
    expect(typeof userResponseData._id).toBe("string");
    expect(typeof userResponseData.name).toBe("string");

    // 로컬스토리지에 저장되었는지 확인
    const accessToken = await page.evaluate(() =>
      localStorage.getItem("accessToken")
    );
    const user = await page.evaluate(() => localStorage.getItem("user"));

    expect(accessToken).toBeTruthy();
    expect(user).toBeTruthy();

    if (user) {
      const userObj = JSON.parse(user);
      expect(userObj._id).toBeTruthy();
      expect(userObj.name).toBeTruthy();
    }

    // 모달 제목 확인
    const modalTitle = page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toHaveText(/.*로그인.*완료.*/i);

    // 확인 버튼 클릭
    const confirmButton = page.locator('[data-testid="modal-primary-button"]');
    await confirmButton.click();

    // 일기목록 페이지로 이동 확인 (네트워크 통신이므로 timeout 2000ms 미만)
    await expect(page).toHaveURL("/diaries", { timeout: 1900 });
  });

  test("로그인 실패 시나리오 - API 모킹", async ({ page }) => {
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
                message: "이메일 또는 비밀번호가 일치하지 않습니다.",
              },
            ],
          }),
        });
      }
    );

    // 폼 입력
    await page.fill('input[name="email"]', "wrong@example.com");
    await page.fill('input[name="password"]', "wrongpassword");

    // 제출 버튼 클릭
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // 실패 모달이 표시될 때까지 대기 (네트워크 통신이므로 timeout 2000ms 미만)
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible({ timeout: 1900 });

    // 모달 제목 확인 (danger variant)
    const modalTitle = page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toHaveText(/.*로그인.*실패.*/i);

    // 확인 버튼 클릭
    const confirmButton = page.locator('[data-testid="modal-primary-button"]');
    await confirmButton.click();

    // 모달이 닫혀야 하고, 여전히 로그인 페이지에 있어야 함 (비네트워크 통신이므로 timeout 500ms 미만)
    await expect(modal).not.toBeVisible({ timeout: 400 });
    await expect(page).toHaveURL("/auth/login");
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
