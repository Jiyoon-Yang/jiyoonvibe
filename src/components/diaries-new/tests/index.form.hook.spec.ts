import { test, expect } from "@playwright/test";

/**
 * DiariesNew Form Hook E2E Tests
 *
 * 테스트 대상:
 * - 일기 작성 폼의 유효성 검증 및 버튼 활성화
 * - 로컬스토리지에 일기 데이터 저장 (신규/추가)
 * - 등록완료 모달 노출 및 상세페이지 이동
 *
 * 사용 라이브러리:
 * - Playwright (jest, @testing-library/react 제외)
 * - react-hook-form, zod
 *
 * 테스트 조건:
 * - data-testid를 사용한 페이지 로드 식별
 * - 실제 로컬스토리지 사용 (Mock 미사용)
 * - timeout: 500ms 미만 또는 기본값
 */

test.describe("DiariesNew Form 기능", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto("/diaries");

    // 페이지 로드 대기 (data-testid로 식별)
    await expect(page.locator('[data-testid="diaries-list"]')).toBeVisible();

    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="write-diary-button"]');

    // 일기쓰기 모달 로드 대기
    await expect(
      page.locator('[data-testid="diaries-new-modal"]')
    ).toBeVisible();
  });

  test("모든 인풋이 입력되면 등록하기 버튼이 활성화된다", async ({ page }) => {
    // Given: 등록하기 버튼 초기 상태 확인
    const submitButton = page.locator('[data-testid="submit-diary-button"]');
    await expect(submitButton).toBeDisabled();

    // When: 감정 선택
    await page.click('label:has(input[name="emotion"][value="Happy"])');
    await expect(submitButton).toBeDisabled();

    // When: 제목 입력
    await page.fill(
      'input[placeholder="제목을 입력해 주세요."]',
      "테스트 제목"
    );
    await expect(submitButton).toBeDisabled();

    // When: 내용 입력
    await page.fill(
      'textarea[placeholder="내용을 입력해 주세요."]',
      "테스트 내용"
    );

    // Then: 등록하기 버튼 활성화
    await expect(submitButton).toBeEnabled();
  });

  test("등록하기 버튼 클릭 시 로컬스토리지에 새로운 일기가 등록된다 (기존 데이터 없음)", async ({
    page,
  }) => {
    // Given: 로컬스토리지 초기화
    await page.evaluate(() => localStorage.removeItem("diaries"));

    // When: 폼 입력
    await page.click('label:has(input[name="emotion"][value="Happy"])');
    await page.fill(
      'input[placeholder="제목을 입력해 주세요."]',
      "첫 번째 일기"
    );
    await page.fill(
      'textarea[placeholder="내용을 입력해 주세요."]',
      "첫 번째 일기 내용"
    );

    // When: 등록하기 버튼 클릭
    await page.click('[data-testid="submit-diary-button"]');

    // Then: 등록완료 모달 노출
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();
    await expect(page.locator('[data-testid="modal-title"]')).toHaveText(
      "일기 등록 완료"
    );

    // Then: 로컬스토리지에 저장 확인
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem("diaries");
      return data ? JSON.parse(data) : null;
    });

    expect(diaries).not.toBeNull();
    expect(diaries).toHaveLength(1);
    expect(diaries[0]).toMatchObject({
      id: 1,
      title: "첫 번째 일기",
      content: "첫 번째 일기 내용",
      emotion: "Happy",
    });
    expect(diaries[0].createdAt).toBeDefined();
  });

  test("등록하기 버튼 클릭 시 로컬스토리지에 새로운 일기가 추가된다 (기존 데이터 있음)", async ({
    page,
  }) => {
    // Given: 기존 데이터 설정
    await page.evaluate(() => {
      const existingDiaries = [
        {
          id: 1,
          title: "기존 일기 1",
          content: "기존 내용 1",
          emotion: "Happy",
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          title: "기존 일기 2",
          content: "기존 내용 2",
          emotion: "Sad",
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem("diaries", JSON.stringify(existingDiaries));
    });

    // When: 폼 입력
    await page.click('label:has(input[name="emotion"][value="Angry"])');
    await page.fill(
      'input[placeholder="제목을 입력해 주세요."]',
      "새로운 일기"
    );
    await page.fill(
      'textarea[placeholder="내용을 입력해 주세요."]',
      "새로운 일기 내용"
    );

    // When: 등록하기 버튼 클릭
    await page.click('[data-testid="submit-diary-button"]');

    // Then: 등록완료 모달 노출
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();

    // Then: 로컬스토리지에 추가 확인
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem("diaries");
      return data ? JSON.parse(data) : null;
    });

    expect(diaries).toHaveLength(3);
    expect(diaries[2]).toMatchObject({
      id: 4, // 가장 큰 id(3) + 1
      title: "새로운 일기",
      content: "새로운 일기 내용",
      emotion: "Angry",
    });
  });

  test("등록완료 모달의 확인 버튼 클릭 시 상세페이지로 이동하고 모달이 닫힌다", async ({
    page,
  }) => {
    // Given: 로컬스토리지 초기화
    await page.evaluate(() => localStorage.removeItem("diaries"));

    // When: 폼 입력 및 등록
    await page.click('label:has(input[name="emotion"][value="Happy"])');
    await page.fill(
      'input[placeholder="제목을 입력해 주세요."]',
      "테스트 일기"
    );
    await page.fill(
      'textarea[placeholder="내용을 입력해 주세요."]',
      "테스트 내용"
    );
    await page.click('[data-testid="submit-diary-button"]');

    // Then: 등록완료 모달 노출 확인
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();

    // When: 모달 확인 버튼 클릭
    await page.click('[data-testid="modal-primary-button"]');

    // Then: 상세페이지로 이동 확인
    await expect(page).toHaveURL(/\/diaries\/1/);

    // Then: 모든 모달이 닫혔는지 확인
    const modals = page.locator('[data-testid="modal"]');
    await expect(modals).toHaveCount(0);
  });

  test("다양한 감정 타입으로 일기를 등록할 수 있다", async ({ page }) => {
    // Given: 로컬스토리지 초기화
    await page.evaluate(() => localStorage.removeItem("diaries"));

    // When: Sad 감정으로 등록
    await page.click('label:has(input[name="emotion"][value="Sad"])');
    await page.fill(
      'input[placeholder="제목을 입력해 주세요."]',
      "슬픈 일기"
    );
    await page.fill(
      'textarea[placeholder="내용을 입력해 주세요."]',
      "슬픈 내용"
    );
    await page.click('[data-testid="submit-diary-button"]');

    // Then: 로컬스토리지에 Sad 감정으로 저장 확인
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem("diaries");
      return data ? JSON.parse(data) : null;
    });

    expect(diaries[0].emotion).toBe("Sad");
  });

  test("createdAt이 ISO 8601 형식으로 저장된다", async ({ page }) => {
    // Given: 로컬스토리지 초기화
    await page.evaluate(() => localStorage.removeItem("diaries"));

    // When: 일기 등록
    await page.click('label:has(input[name="emotion"][value="Happy"])');
    await page.fill(
      'input[placeholder="제목을 입력해 주세요."]',
      "날짜 테스트"
    );
    await page.fill(
      'textarea[placeholder="내용을 입력해 주세요."]',
      "날짜 검증"
    );
    await page.click('[data-testid="submit-diary-button"]');

    // Then: createdAt이 유효한 ISO 8601 형식인지 확인
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem("diaries");
      return data ? JSON.parse(data) : null;
    });

    const createdAt = diaries[0].createdAt;
    const date = new Date(createdAt);

    // ISO 8601 형식 검증
    expect(createdAt).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    );
    expect(date.toISOString()).toBe(createdAt);
    expect(date.getTime()).toBeGreaterThan(0);
  });

  test("연속으로 여러 일기를 등록할 수 있다", async ({ page }) => {
    // Given: 로컬스토리지 초기화
    await page.evaluate(() => localStorage.removeItem("diaries"));

    // When: 첫 번째 일기 등록
    await page.click('label:has(input[name="emotion"][value="Happy"])');
    await page.fill(
      'input[placeholder="제목을 입력해 주세요."]',
      "첫 번째"
    );
    await page.fill(
      'textarea[placeholder="내용을 입력해 주세요."]',
      "첫 번째 내용"
    );
    await page.click('[data-testid="submit-diary-button"]');

    // 모달 확인 버튼 클릭 (상세페이지로 이동)
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();
    await page.click('[data-testid="modal-primary-button"]');

    // 다시 일기목록으로 이동
    await page.goto("/diaries");
    await expect(page.locator('[data-testid="diaries-list"]')).toBeVisible();
    await page.click('[data-testid="write-diary-button"]');
    await expect(
      page.locator('[data-testid="diaries-new-modal"]')
    ).toBeVisible();

    // When: 두 번째 일기 등록
    await page.click('label:has(input[name="emotion"][value="Sad"])');
    await page.fill(
      'input[placeholder="제목을 입력해 주세요."]',
      "두 번째"
    );
    await page.fill(
      'textarea[placeholder="내용을 입력해 주세요."]',
      "두 번째 내용"
    );
    await page.click('[data-testid="submit-diary-button"]');

    // Then: 로컬스토리지에 2개의 일기가 저장되어야 함
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem("diaries");
      return data ? JSON.parse(data) : null;
    });

    expect(diaries).toHaveLength(2);
    expect(diaries[0].id).toBe(1);
    expect(diaries[1].id).toBe(2);
    expect(diaries[0].emotion).toBe("Happy");
    expect(diaries[1].emotion).toBe("Sad");
  });

  test("필드가 하나라도 비어있으면 등록하기 버튼이 비활성화된다", async ({
    page,
  }) => {
    const submitButton = page.locator('[data-testid="submit-diary-button"]');

    // 초기 상태: 모두 비어있음
    await expect(submitButton).toBeDisabled();

    // Case 1: 감정만 선택
    await page.click('label:has(input[name="emotion"][value="Happy"])');
    await expect(submitButton).toBeDisabled();

    // Case 2: 감정 + 제목
    await page.fill(
      'input[placeholder="제목을 입력해 주세요."]',
      "제목만"
    );
    await expect(submitButton).toBeDisabled();

    // Case 3: 내용 추가 -> 활성화
    await page.fill(
      'textarea[placeholder="내용을 입력해 주세요."]',
      "내용 추가"
    );
    await expect(submitButton).toBeEnabled();

    // Case 4: 제목 삭제 -> 다시 비활성화
    await page.fill('input[placeholder="제목을 입력해 주세요."]', "");
    await expect(submitButton).toBeDisabled();
  });

  test("등록 후 생성된 ID로 정확한 상세페이지로 이동한다", async ({
    page,
  }) => {
    // Given: 기존 데이터 설정 (id: 5, 10이 있는 상태)
    await page.evaluate(() => {
      const existingDiaries = [
        {
          id: 5,
          title: "일기 5",
          content: "내용 5",
          emotion: "Happy",
          createdAt: new Date().toISOString(),
        },
        {
          id: 10,
          title: "일기 10",
          content: "내용 10",
          emotion: "Sad",
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem("diaries", JSON.stringify(existingDiaries));
    });

    // When: 새 일기 등록
    await page.click('label:has(input[name="emotion"][value="Angry"])');
    await page.fill(
      'input[placeholder="제목을 입력해 주세요."]',
      "일기 11"
    );
    await page.fill(
      'textarea[placeholder="내용을 입력해 주세요."]',
      "내용 11"
    );
    await page.click('[data-testid="submit-diary-button"]');

    // 모달 확인
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();
    await page.click('[data-testid="modal-primary-button"]');

    // Then: id 11로 이동해야 함 (가장 큰 id 10 + 1)
    await expect(page).toHaveURL(/\/diaries\/11$/);
  });
});
