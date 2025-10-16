import { useModal } from "@/commons/providers/modal/modal.provider";
import DiariesNew from "@/components/diaries-new";

/**
 * 일기쓰기 모달을 열고 닫는 커스텀 훅
 * @returns {object} openDiaryModal - 일기쓰기 모달을 여는 함수
 */
export const useDiaryModal = () => {
  const { openModal, closeModal } = useModal();

  const openDiaryModal = () => {
    openModal(<DiariesNew />);
  };

  return {
    openDiaryModal,
    closeModal,
  };
};
