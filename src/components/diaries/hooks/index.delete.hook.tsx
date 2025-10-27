import { useState, useCallback, useEffect } from "react";
import { useAuthGuard } from "@/commons/providers/auth/auth.guard.hook";
import { useModal } from "@/commons/providers/modal/modal.provider";
import Modal from "@/commons/components/modal";
import { Diary } from "@/commons/types/diary";

export interface UseDiaryDeleteReturn {
  isDeleteModalOpen: boolean;
  deleteTargetId: number | null;
  openDeleteModal: (id: number) => void;
  closeDeleteModal: () => void;
  deleteDiary: (id: number) => void;
  handleDeleteClick: (e: React.MouseEvent, id: number) => void;
}

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
