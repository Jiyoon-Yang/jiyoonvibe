"use client";

import { useModal } from "@/commons/providers/modal/modal.provider";
import { useAuthGuard } from "@/commons/providers/auth/auth.guard.hook";
import DiariesNew from "@/components/diaries-new";

/**
 * 일기쓰기 모달 훅의 반환 타입
 */
export interface UseDiaryModalReturn {
  /**
   * 일기쓰기 모달을 여는 함수 (권한 검사 포함)
   */
  openDiaryModal: () => void;

  /**
   * 모달을 닫는 함수
   */
  closeModal: () => void;
}

/**
 * 일기쓰기 모달을 열고 닫는 커스텀 훅
 *
 * 권한 검사 기능:
 * - 로그인 유저: 일기쓰기 모달 노출
 * - 비로그인 유저: 로그인 요청 모달 노출
 *
 * @example
 * ```tsx
 * const { openDiaryModal, closeModal } = useDiaryModal();
 *
 * // 모달 열기 (권한 검사 자동 수행)
 * openDiaryModal();
 *
 * // 모달 닫기
 * closeModal();
 * ```
 *
 * @returns 일기쓰기 모달 제어 함수들
 */
export const useDiaryModal = (): UseDiaryModalReturn => {
  const { openModal, closeModal } = useModal();
  const { checkMemberAction } = useAuthGuard();

  /**
   * 일기쓰기 모달을 엽니다 (권한 검사 포함)
   *
   * 로그인 유저: 일기쓰기 모달을 엽니다
   * 비로그인 유저: 로그인 요청 모달을 auth.guard.hook에서 자동으로 표시합니다
   */
  const openDiaryModal = () => {
    // 액션 가드: 회원 전용 기능 검증
    if (!checkMemberAction()) {
      return; // 비로그인 유저 - 로그인 요청 모달 표시 후 중단
    }

    // 로그인 유저 - 일기쓰기 모달 열기
    openModal(<DiariesNew />);
  };

  return {
    openDiaryModal,
    closeModal,
  };
};
