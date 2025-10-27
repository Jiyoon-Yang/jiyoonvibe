import { useState, useCallback, useEffect } from "react";
import { useAuthGuard } from "@/commons/providers/auth/auth.guard.hook";
import { useModal } from "@/commons/providers/modal/modal.provider";
import Modal from "@/commons/components/modal";
import { Diary } from "@/commons/types/diary";

/**
 * 일기 목록 삭제 기능 훅의 반환 타입
 */
export interface UseDiaryDeleteReturn {
  /**
   * 삭제 모달 열림 여부
   */
  isDeleteModalOpen: boolean;

  /**
   * 삭제 대상 일기의 ID
   */
  deleteTargetId: number | null;

  /**
   * 삭제 모달을 여는 함수
   * @param id - 삭제할 일기의 ID
   */
  openDeleteModal: (id: number) => void;

  /**
   * 삭제 모달을 닫는 함수
   */
  closeDeleteModal: () => void;

  /**
   * 일기를 삭제하는 함수
   * @param id - 삭제할 일기의 ID
   */
  deleteDiary: (id: number) => void;

  /**
   * 삭제 버튼 클릭 핸들러
   * @param e - 클릭 이벤트
   * @param id - 삭제할 일기의 ID
   */
  handleDeleteClick: (e: React.MouseEvent, id: number) => void;
}

/**
 * 일기 목록 페이지에서 일기 삭제 기능을 제공하는 커스텀 훅
 *
 * 로컬스토리지에서 지정된 ID의 일기를 삭제하고,
 * 삭제 확인 모달을 표시합니다.
 * 삭제 완료 후 페이지를 새로고침합니다.
 *
 * @returns 삭제 기능 관련 함수들
 */
export const useDiaryDelete = (): UseDiaryDeleteReturn => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  useAuthGuard();
  const { openModal, closeModal } = useModal();

  const openDeleteModal = useCallback((id: number) => {
    setDeleteTargetId(id);
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setDeleteTargetId(null);
    closeModal();
  }, [closeModal]);

  const deleteDiary = useCallback(
    (id: number) => {
      try {
        const storedDiaries = localStorage.getItem("diaries");
        if (!storedDiaries) {
          console.warn("No diaries found in localStorage");
          return;
        }

        const diaries = JSON.parse(storedDiaries) as Diary[];
        if (!Array.isArray(diaries)) {
          console.warn("Invalid diaries data in localStorage");
          return;
        }

        const updatedDiaries = diaries.filter((diary) => diary.id !== id);
        localStorage.setItem("diaries", JSON.stringify(updatedDiaries));
        closeDeleteModal();
        window.location.reload();
      } catch (error) {
        console.error("Failed to delete diary:", error);
      }
    },
    [closeDeleteModal]
  );

  const handleDeleteClick = useCallback(
    (e: React.MouseEvent, id: number) => {
      e.stopPropagation();
      openDeleteModal(id);
    },
    [openDeleteModal]
  );

  useEffect(() => {
    if (isDeleteModalOpen && deleteTargetId) {
      openModal(
        <Modal
          variant="warning"
          actions="dual"
          title="일기 삭제"
          description="정말로 이 일기를 삭제하시겠습니까? 삭제된 일기는 복구할 수 없습니다."
          cancelAction={{
            label: "취소",
            onClick: closeDeleteModal,
          }}
          confirmAction={{
            label: "삭제",
            onClick: () => deleteTargetId && deleteDiary(deleteTargetId),
          }}
          data-testid="delete-modal"
        />
      );
    }
  }, [
    isDeleteModalOpen,
    deleteTargetId,
    openModal,
    closeDeleteModal,
    deleteDiary,
  ]);

  return {
    isDeleteModalOpen,
    deleteTargetId,
    openDeleteModal,
    closeDeleteModal,
    deleteDiary,
    handleDeleteClick,
  };
};
