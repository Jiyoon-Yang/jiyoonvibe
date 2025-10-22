"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { Modal } from "@/commons/components/modal";
import { URL_PATHS } from "@/commons/constants/url";
import { useRef } from "react";
import { FieldErrors } from "react-hook-form";

/**
 * 로그인 폼 데이터 검증 스키마
 * - email: '@' 포함 필수
 * - password: 최소 1글자 이상
 */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .refine((val) => val.includes("@"), {
      message: "이메일은 @를 포함해야 합니다",
    }),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

/**
 * 로그인 폼 데이터 타입
 */
type LoginFormData = z.infer<typeof loginSchema>;

/**
 * 로그인 사용자 정보 타입
 */
interface UserInfo {
  _id: string;
  name: string;
}

/**
 * GraphQL loginUser mutation 함수
 *
 * @param input - 로그인 입력 데이터 (email, password)
 * @returns accessToken
 * @throws 로그인 실패 시 에러 발생
 */
const loginUser = async (input: { email: string; password: string }) => {
  const response = await fetch(
    "https://main-practice.codebootcamp.co.kr/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation loginUser($email: String!, $password: String!) {
            loginUser(email: $email, password: $password) {
              accessToken
            }
          }
        `,
        variables: {
          email: input.email,
          password: input.password,
        },
      }),
    }
  );

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0]?.message || "로그인에 실패했습니다");
  }

  return result.data.loginUser.accessToken;
};

/**
 * GraphQL fetchUserLoggedIn query 함수
 *
 * @param accessToken - 인증 토큰
 * @returns 로그인한 사용자 정보 (_id, name)
 * @throws 사용자 조회 실패 시 에러 발생
 */
const fetchUserLoggedIn = async (accessToken: string): Promise<UserInfo> => {
  const response = await fetch(
    "https://main-practice.codebootcamp.co.kr/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: `
          query {
            fetchUserLoggedIn {
              _id
              name
            }
          }
        `,
      }),
    }
  );

  const result = await response.json();

  if (result.errors) {
    throw new Error(
      result.errors[0]?.message || "사용자 정보 조회에 실패했습니다"
    );
  }

  return result.data.fetchUserLoggedIn;
};

/**
 * 로그인 폼 훅의 반환 타입
 */
export interface UseLoginFormReturn {
  /**
   * 폼 필드 등록 함수
   */
  register: ReturnType<typeof useForm<LoginFormData>>["register"];

  /**
   * 폼 제출 핸들러
   */
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;

  /**
   * 폼 검증 에러
   */
  errors: FieldErrors<LoginFormData>;

  /**
   * 로그인 버튼 활성화 여부
   */
  isButtonEnabled: boolean;

  /**
   * API 요청 로딩 상태
   */
  isLoading: boolean;
}

/**
 * 로그인 폼을 관리하는 커스텀 훅
 *
 * react-hook-form과 zod를 사용하여 로그인 폼의 유효성 검증,
 * 제출 처리, API 요청, 모달 표시를 담당합니다.
 *
 * @example
 * ```tsx
 * const { register, handleSubmit, errors, isButtonEnabled, isLoading } = useLoginForm();
 *
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <Input
 *       {...register("email")}
 *       error={!!errors.email}
 *       errorMessage={errors.email?.message}
 *     />
 *     <Button type="submit" disabled={!isButtonEnabled} loading={isLoading}>
 *       로그인
 *     </Button>
 *   </form>
 * );
 * ```
 *
 * @returns 로그인 폼 제어 함수들
 */
export const useLoginForm = (): UseLoginFormReturn => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  /**
   * 모달 중복 표시 방지 플래그
   * 같은 제출 시도에서 모달이 한 번만 표시되도록 관리
   */
  const hasShownModalRef = useRef(false);

  /**
   * react-hook-form 설정
   * - resolver: zod 스키마 기반 유효성 검증
   * - mode: onChange로 실시간 검증
   */
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * react-query mutation 설정
   * 로그인 API 요청 및 성공/실패 처리
   */
  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      // 1. loginUser API 호출
      const accessToken = await loginUser({
        email: data.email,
        password: data.password,
      });

      // 2. fetchUserLoggedIn API 호출
      const userInfo = await fetchUserLoggedIn(accessToken);

      return { accessToken, userInfo };
    },
    onSuccess: ({ accessToken, userInfo }) => {
      // 모달이 이미 표시되었으면 무시
      if (hasShownModalRef.current) return;
      hasShownModalRef.current = true;

      // 3. 로컬스토리지에 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(userInfo));

      // 4. 로컬스토리지 변경 이벤트 발생
      window.dispatchEvent(new Event("localStorageChange"));

      /**
       * 성공 모달 표시
       * 확인 클릭 시: 모든 모달 닫기 → 일기목록 페이지로 이동
       */
      openModal(
        <Modal
          variant="info"
          actions="single"
          title="로그인 완료"
          description="로그인에 성공했습니다."
          primaryAction={{
            label: "확인",
            onClick: () => {
              closeModal();
              router.push(URL_PATHS.DIARIES.LIST);
            },
          }}
        />
      );
    },
    onError: (error: Error) => {
      // 모달이 이미 표시되었으면 무시
      if (hasShownModalRef.current) return;
      hasShownModalRef.current = true;

      /**
       * 실패 모달 표시
       * 확인 클릭 시: 모든 모달 닫기
       */
      openModal(
        <Modal
          variant="danger"
          actions="single"
          title="로그인 실패"
          description={error.message || "로그인에 실패했습니다."}
          primaryAction={{
            label: "확인",
            onClick: () => {
              closeModal();
            },
          }}
        />
      );
    },
  });

  /**
   * 폼 제출 핸들러
   * 검증된 데이터로 로그인 API 요청
   *
   * @param data - 검증된 로그인 폼 데이터
   */
  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  /**
   * 모든 필드의 값 확인
   */
  const formValues = watch();
  const isFormFilled = Boolean(formValues.email && formValues.password);

  /**
   * 버튼 활성화 조건
   * - 모든 필드가 입력되어야 함
   * - 유효성 검사를 통과해야 함
   */
  const isButtonEnabled = isFormFilled && isValid;

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isButtonEnabled,
    isLoading: mutation.isPending,
  };
};
