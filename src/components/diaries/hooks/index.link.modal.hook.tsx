import { useModal } from "@/commons/providers/modal/modal.provider";
import DiariesNew from "@/components/diaries-new";

/**
 * 일기쓰기 모달 훅의 반환 타입
 */
export interface UseDiaryModalReturn {
  /**
   * 일기쓰기 모달을 여는 함수
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
 * @example
 * ```tsx
 * const { openDiaryModal, closeModal } = useDiaryModal();
 *
 * // 모달 열기
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

  /**
   * 일기쓰기 모달을 엽니다
   */
  const openDiaryModal = () => {
    openModal(<DiariesNew />);
  };

  return {
    openDiaryModal,
    closeModal,
  };
};
