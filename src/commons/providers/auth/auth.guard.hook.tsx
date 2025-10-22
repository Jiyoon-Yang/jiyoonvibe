"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth.provider";
import { useModal } from "../modal/modal.provider";
import { URL_PATHS } from "@/commons/constants/url";
import Modal from "@/commons/components/modal";

// 전역 테스트 우회 플래그 타입 정의
declare global {
  interface Window {
    __TEST_BYPASS__?: boolean;
  }
}

/**
 * useAuthGuard 훅의 반환 타입
 */
export interface UseAuthGuardReturn {
  /**
   * 회원 전용 액션 권한 검증 함수
   * 로그인되어 있으면 true, 비로그인이면 모달 표시 후 false 반환
   */
  checkMemberAction: () => boolean;
}

/**
 * 액션 권한 검증을 관리하는 커스텀 훅
 *
 * 회원 전용 기능 실행 시 로그인 여부를 검증하고,
 * 비로그인 사용자에게 로그인 모달을 표시합니다.
 *
 * 동작 방식:
 * 1. 회원 전용 액션 실행 시 checkMemberAction() 호출
 * 2. 로그인 상태 검증
 * 3. 로그인되어 있으면 true 반환 (액션 실행 허용)
 * 4. 비로그인이면 모달 표시 후 false 반환 (액션 실행 차단)
 *
 * 테스트 환경:
 * - NEXT_PUBLIC_TEST_ENV=test 일 때 항상 로그인 유저로 간주 (검사 패스)
 * - window.__TEST_BYPASS__ = false 로 설정하면 테스트 환경에서도 비로그인으로 테스트 가능
 * - 실제 환경에서는 항상 로그인 검사 수행
 *
 * @example
 * ```tsx
 * const { checkMemberAction } = useAuthGuard();
 *
 * const handleSubmit = async () => {
 *   // 회원 전용 기능 실행 전 권한 검증
 *   if (!checkMemberAction()) {
 *     return; // 비로그인 시 중단
 *   }
 *
 *   // 로그인 상태이면 실행
 *   await submitDiary();
 * };
 * ```
 *
 * @returns 액션 권한 검증 함수
 */
export const useAuthGuard = (): UseAuthGuardReturn => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { openModal, closeModal } = useModal();

  /**
   * 모달 중복 표시 방지 플래그
   * 한 번 표시된 후에는 같은 상황에서 다시 나타나지 않도록 관리
   */
  const modalShownRef = useRef(false);

  /**
   * 회원 전용 액션 권한 검증
   *
   * 로그인 상태를 확인하고, 비로그인 시 로그인 모달을 표시합니다.
   * 모달은 한 번만 표시되며, 닫힌 후에도 다시 나타나지 않습니다.
   *
   * @returns {boolean} 권한 검증 결과 (true: 권한 있음, false: 권한 없음)
   */
  const checkMemberAction = useCallback((): boolean => {
    // 테스트 환경 체크
    const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === "test";

    // 테스트 환경이고 테스트 우회 플래그가 명시적으로 false가 아니면 검사 패스
    if (isTestEnv) {
      // window.__TEST_BYPASS__가 명시적으로 false인 경우에만 검사 수행
      if (typeof window !== "undefined" && window.__TEST_BYPASS__ === false) {
        // 비로그인 가드 테스트를 위해 검사 수행
      } else {
        // 기본적으로 로그인 유저로 간주하여 검사 패스
        return true;
      }
    }

    // 로그인 상태 검증
    if (isLoggedIn) {
      return true; // 권한 있음
    }

    // 비로그인 상태 - 로그인 모달 표시
    if (!modalShownRef.current) {
      modalShownRef.current = true;

      /**
       * 로그인 요청 모달 표시
       * - 취소 클릭 시: 모든 모달 닫기
       * - 로그인하러가기 클릭 시: 모든 모달 닫기 → 로그인 페이지로 이동
       */
      openModal(
        <Modal
          variant="info"
          actions="dual"
          title="로그인이 필요합니다"
          description="이 기능은 로그인 후 이용하실 수 있습니다."
          cancelAction={{
            label: "취소",
            onClick: () => {
              closeModal();
            },
          }}
          confirmAction={{
            label: "로그인하러가기",
            onClick: () => {
              closeModal();
              router.push(URL_PATHS.AUTH.LOGIN);
            },
          }}
        />
      );
    }

    return false; // 권한 없음
  }, [isLoggedIn, openModal, closeModal, router]);

  return {
    checkMemberAction,
  };
};
