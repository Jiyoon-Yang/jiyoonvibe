import { useState, useCallback, useEffect } from "react";
import { useModal } from "@/commons/providers/modal/modal.provider";
import Modal from "@/commons/components/modal";
import { Diary } from "@/commons/types/diary";

/**
 * 일기 상세 삭제 기능 훅의 반환 타입
 */
export interface UseDiaryDetailDeleteReturn {
  /**
   * 삭제 모달 열림 여부
   */
  isDeleteModalOpen: boolean;

  /**
   * 삭제 모달을 여는 함수
   */
  openDeleteModal: () => void;

  /**
   * 삭제 모달을 닫는 함수
   */
  closeDeleteModal: () => void;

  /**
   * 일기를 삭제하는 함수
   * @param id - 삭제할 일기의 ID
   */
  deleteDiary: (id: number) => void;
}

/**
 * 일기 상세 페이지에서 일기 삭제 기능을 제공하는 커스텀 훅
 *
 * 로컬스토리지에서 지정된 ID의 일기를 삭제하고,
 * 삭제 확인 모달을 표시합니다.
 * 삭제 완료 후 /diaries 페이지로 이동합니다.
 *
 * @param diaryId - 삭제할 일기의 ID
 * @returns 삭제 기능 관련 함수들
 */
export const useDiaryDetailDelete = (
  diaryId: number
): UseDiaryDetailDeleteReturn => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { openModal, closeModal } = useModal();

  const openDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
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

        // /diaries로 페이지 이동
        window.location.href = "/diaries";
      } catch (error) {
        console.error("Failed to delete diary:", error);
      }
    },
    [closeDeleteModal]
  );

  useEffect(() => {
    if (isDeleteModalOpen) {
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
            onClick: () => deleteDiary(diaryId),
          }}
          data-testid="delete-modal"
        />
      );
    }
  }, [isDeleteModalOpen, diaryId, openModal, closeDeleteModal, deleteDiary]);

  return {
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    deleteDiary,
  };
};
