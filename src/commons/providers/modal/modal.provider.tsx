"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";

interface Modal {
  id: string;
  content: ReactNode;
}

interface ModalContextType {
  isOpen: boolean;
  modalContent: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalStack, setModalStack] = useState<Modal[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 모달이 1개라도 열려 있으면 body 스크롤 제거
  useEffect(() => {
    if (modalStack.length > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalStack.length]);

  const openModal = useCallback((content: ReactNode) => {
    const id = `modal-${Date.now()}-${Math.random()}`;
    setModalStack((prev) => [...prev, { id, content }]);
  }, []);

  const closeModal = useCallback(() => {
    setModalStack((prev) => prev.slice(0, -1));
  }, []);

  const modalRoot = isMounted ? document.body : null;

  // 하위 호환성을 위한 값
  const isOpen = modalStack.length > 0;
  const modalContent =
    modalStack.length > 0 ? modalStack[modalStack.length - 1].content : null;

  return (
    <ModalContext.Provider
      value={{ isOpen, modalContent, openModal, closeModal }}>
      {children}
      {modalRoot &&
        modalStack.map((modal, index) =>
          createPortal(
            <div
              key={modal.id}
              className={styles.modalWrapper}
              style={{ zIndex: 50 + index }}
              onClick={closeModal}>
              {/* 오버레이 배경 - 각 모달마다 독립적으로 렌더링 */}
              <div className={styles.backdrop} />

              {/* 모달 컨텐츠 */}
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}>
                {modal.content}
              </div>
            </div>,
            modalRoot
          )
        )}
    </ModalContext.Provider>
  );
};
