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
 * 회원가입 폼 데이터 검증 스키마
 * - email: '@' 포함 필수
 * - password: 영문 + 숫자 포함 8자 이상
 * - passwordConfirm: password와 동일
 * - name: 최소 1글자 이상
 */
const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요")
      .refine((val) => val.includes("@"), {
        message: "이메일은 @를 포함해야 합니다",
      }),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다")
      .refine(
        (val) => {
          // 영문과 숫자를 모두 포함하는지 확인
          const hasLetter = /[a-zA-Z]/.test(val);
          const hasNumber = /[0-9]/.test(val);
          return hasLetter && hasNumber;
        },
        {
          message: "비밀번호는 영문과 숫자를 포함해야 합니다",
        }
      ),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요"),
    name: z.string().min(1, "이름을 입력해주세요"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

/**
 * 회원가입 폼 데이터 타입
 */
type SignupFormData = z.infer<typeof signupSchema>;

/**
 * GraphQL createUser mutation 함수
 *
 * @param input - 회원가입 입력 데이터 (email, password, name)
 * @returns 생성된 사용자의 _id
 * @throws 회원가입 실패 시 에러 발생
 */
const createUser = async (input: {
  email: string;
  password: string;
  name: string;
}) => {
  const response = await fetch(
    "https://main-practice.codebootcamp.co.kr/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation createUser($createUserInput: CreateUserInput!) {
            createUser(createUserInput: $createUserInput) {
              _id
            }
          }
        `,
        variables: {
          createUserInput: {
            email: input.email,
            password: input.password,
            name: input.name,
          },
        },
      }),
    }
  );

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0]?.message || "회원가입에 실패했습니다");
  }

  return result.data.createUser;
};

/**
 * 회원가입 폼 훅의 반환 타입
 */
export interface UseSignupFormReturn {
  /**
   * 폼 필드 등록 함수
   */
  register: ReturnType<typeof useForm<SignupFormData>>["register"];

  /**
   * 폼 제출 핸들러
   */
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;

  /**
   * 폼 검증 에러
   */
  errors: FieldErrors<SignupFormData>;

  /**
   * 회원가입 버튼 활성화 여부
   */
  isButtonEnabled: boolean;

  /**
   * API 요청 로딩 상태
   */
  isLoading: boolean;
}

/**
 * 회원가입 폼을 관리하는 커스텀 훅
 *
 * react-hook-form과 zod를 사용하여 회원가입 폼의 유효성 검증,
 * 제출 처리, API 요청, 모달 표시를 담당합니다.
 *
 * @example
 * ```tsx
 * const { register, handleSubmit, errors, isButtonEnabled, isLoading } = useSignupForm();
 *
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <Input
 *       {...register("email")}
 *       error={!!errors.email}
 *       errorMessage={errors.email?.message}
 *     />
 *     <Button type="submit" disabled={!isButtonEnabled} loading={isLoading}>
 *       회원가입
 *     </Button>
 *   </form>
 * );
 * ```
 *
 * @returns 회원가입 폼 제어 함수들
 */
export const useSignupForm = (): UseSignupFormReturn => {
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
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
    },
  });

  /**
   * react-query mutation 설정
   * 회원가입 API 요청 및 성공/실패 처리
   */
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // 모달이 이미 표시되었으면 무시
      if (hasShownModalRef.current) return;
      hasShownModalRef.current = true;

      /**
       * 성공 모달 표시
       * 확인 클릭 시: 모든 모달 닫기 → 로그인 페이지로 이동
       */
      openModal(
        <Modal
          variant="info"
          actions="single"
          title="가입 완료"
          description="회원가입이 완료되었습니다."
          primaryAction={{
            label: "확인",
            onClick: () => {
              closeModal();
              router.push(URL_PATHS.AUTH.LOGIN);
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
          title="가입 실패"
          description={error.message || "회원가입에 실패했습니다."}
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
   * 검증된 데이터로 회원가입 API 요청
   *
   * @param data - 검증된 회원가입 폼 데이터
   */
  const onSubmit = (data: SignupFormData) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  };

  /**
   * 모든 필드의 값 확인
   */
  const formValues = watch();
  const isFormFilled = Boolean(
    formValues.email &&
      formValues.password &&
      formValues.passwordConfirm &&
      formValues.name
  );

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
