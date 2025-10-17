"use client";

import React from "react";
import { Button, type ButtonVariant } from "../button";
import styles from "./styles.module.css";

export type ModalVariant = "info" | "danger";
export type ModalActions = "single" | "dual";
export type ModalTheme = "light" | "dark";

export interface ModalAction {
  /**
   * 버튼 텍스트
   */
  label: string;

  /**
   * 버튼 클릭 핸들러
   */
  onClick: () => void;

  /**
   * 버튼 variant (미지정 시 자동 결정)
   */
  variant?: ButtonVariant;
}

export interface ModalProps {
  /**
   * 모달 variant
   * @default 'info'
   */
  variant?: ModalVariant;

  /**
   * 액션 타입
   * @default 'single'
   */
  actions?: ModalActions;

  /**
   * 테마
   * @default 'light'
   */
  theme?: ModalTheme;

  /**
   * 모달 제목
   */
  title: string;

  /**
   * 모달 설명
   */
  description: string;

  /**
   * 단일 액션 버튼 (actions: 'single'일 때 사용)
   */
  primaryAction?: ModalAction;

  /**
   * 취소 버튼 (actions: 'dual'일 때 사용)
   */
  cancelAction?: ModalAction;

  /**
   * 확인 버튼 (actions: 'dual'일 때 사용)
   */
  confirmAction?: ModalAction;

  /**
   * 모달 열림 여부
   */
  isOpen?: boolean;
}

/**
 * Modal 공통 컴포넌트
 *
 * @example
 * ```tsx
 * // Single action 모달
 * <Modal
 *   variant="info"
 *   actions="single"
 *   title="일기 등록 완료"
 *   description="등록이 완료 되었습니다."
 *   primaryAction={{ label: "확인", onClick: handleClose }}
 * />
 *
 * // Dual actions 모달
 * <Modal
 *   variant="info"
 *   actions="dual"
 *   title="일기 등록 취소"
 *   description="일기 등록을 취소 하시겠어요?"
 *   cancelAction={{ label: "계속 작성", onClick: handleCancel }}
 *   confirmAction={{ label: "등록 취소", onClick: handleConfirm }}
 * />
 * ```
 */
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      variant = "info",
      actions = "single",
      theme = "light",
      title,
      description,
      primaryAction,
      cancelAction,
      confirmAction,
      isOpen = true,
    },
    ref
  ) => {
    if (!isOpen) return null;

    // 모달 컨테이너 클래스
    const modalClassName = [
      styles.modal,
      styles[`modal--${variant}`],
      styles[`modal--${theme}`],
    ]
      .filter(Boolean)
      .join(" ");

    // 버튼 영역 클래스
    const actionsClassName = [
      styles.modal__actions,
      styles[`modal__actions--${actions}`],
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={modalClassName} data-testid="modal">
        {/* 콘텐츠 영역 */}
        <div className={styles.modal__content}>
          <h2 className={styles.modal__title} data-testid="modal-title">
            {title}
          </h2>
          <p className={styles.modal__description}>{description}</p>
        </div>

        {/* 버튼 영역 */}
        <div className={actionsClassName}>
          {actions === "single" ? (
            // Single action: 버튼 1개 (전체 너비)
            <Button
              variant={primaryAction?.variant || "primary"}
              size="medium"
              theme={theme}
              onClick={primaryAction?.onClick}
              data-testid="modal-primary-button"
              fullWidth>
              {primaryAction?.label || "확인"}
            </Button>
          ) : (
            // Dual actions: 버튼 2개 (각 104px 고정)
            <>
              <Button
                variant={cancelAction?.variant || "tertiary"}
                size="medium"
                theme={theme}
                onClick={cancelAction?.onClick}
                data-testid="modal-cancel-button"
                className={styles.modal__buttonFixed}>
                {cancelAction?.label || "취소"}
              </Button>
              <Button
                variant={confirmAction?.variant || "primary"}
                size="medium"
                theme={theme}
                onClick={confirmAction?.onClick}
                data-testid="modal-confirm-button"
                className={styles.modal__buttonFixed}>
                {confirmAction?.label || "확인"}
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
