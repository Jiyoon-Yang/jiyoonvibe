"use client";

import { useModal } from "@/commons/providers/modal/modal.provider";
import { Modal } from "@/commons/components/modal";

/**
 * 일기 쓰기 모달 닫기 훅의 반환 타입
 */
export interface UseLinkModalCloseReturn {
  /**
   * 닫기 버튼 클릭 시 등록취소 확인 모달을 여는 함수
   */
  handleClose: () => void;
}

/**
 * 일기 쓰기 모달의 닫기 버튼 핸들러를 제공하는 커스텀 훅
 *
 * 닫기 버튼 클릭 시 등록취소 확인 모달을 2중 모달로 띄우며,
 * 사용자는 계속 작성하거나 모두 닫을 수 있습니다.
 *
 * @example
 * ```tsx
 * const { handleClose } = useLinkModalClose();
 *
 * // 닫기 버튼에 연결
 * <Button onClick={handleClose}>닫기</Button>
 * ```
 *
 * @returns 일기 쓰기 모달 닫기 핸들러
 */
export const useLinkModalClose = (): UseLinkModalCloseReturn => {
  const { openModal, closeModal } = useModal();

  /**
   * 닫기 버튼 클릭 핸들러
   * 등록취소 확인 모달을 현재 모달 위에 겹쳐서 표시합니다.
   */
  const handleClose = () => {
    openModal(
      <Modal
        variant="info"
        actions="dual"
        theme="light"
        title="일기 등록 취소"
        description="일기 등록을 취소 하시겠어요?"
        cancelAction={{
          label: "계속 작성",
          onClick: () => {
            // 등록취소모달(자식)만 닫기
            closeModal();
          },
        }}
        confirmAction={{
          label: "등록 취소",
          onClick: () => {
            // 등록취소모달(자식) 닫기
            closeModal();
            // 일기쓰기폼모달(부모) 닫기
            closeModal();
          },
        }}
      />
    );
  };

  return {
    handleClose,
  };
};
