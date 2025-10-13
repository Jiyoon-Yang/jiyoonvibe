"use client";

import React from "react";
import styles from "./styles.module.css";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonTheme = "light" | "dark";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 variant
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * 버튼 크기
   * @default 'medium'
   */
  size?: ButtonSize;

  /**
   * 테마
   * @default 'light'
   */
  theme?: ButtonTheme;

  /**
   * 버튼 텍스트 또는 자식 요소
   */
  children: React.ReactNode;

  /**
   * 전체 너비 버튼 여부
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 아이콘 (왼쪽)
   */
  iconLeft?: React.ReactNode;

  /**
   * 아이콘 (오른쪽)
   */
  iconRight?: React.ReactNode;

  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;

  /**
   * 로딩 상태
   * @default false
   */
  loading?: boolean;
}

/**
 * Button 공통 컴포넌트
 *
 * @example
 * ```tsx
 * // Primary 버튼
 * <Button variant="primary" size="medium">확인</Button>
 *
 * // Secondary 버튼
 * <Button variant="secondary" size="large">취소</Button>
 *
 * // Tertiary 버튼
 * <Button variant="tertiary" size="small">더보기</Button>
 *
 * // 아이콘이 있는 버튼
 * <Button iconLeft={<PlusIcon />}>추가하기</Button>
 *
 * // 전체 너비 버튼
 * <Button fullWidth>저장</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      theme = "light",
      children,
      fullWidth = false,
      iconLeft,
      iconRight,
      disabled = false,
      loading = false,
      className = "",
      type = "button",
      ...rest
    },
    ref
  ) => {
    // 클래스 이름 조합
    const buttonClassName = [
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      styles[`button--${theme}`],
      fullWidth && styles["button--fullWidth"],
      disabled && styles["button--disabled"],
      loading && styles["button--loading"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClassName}
        disabled={disabled || loading}
        {...rest}>
        {loading ? (
          <span className={styles.button__loader}>
            <span className={styles.button__spinner}></span>
          </span>
        ) : (
          <>
            {iconLeft && (
              <span className={styles.button__iconLeft}>{iconLeft}</span>
            )}
            <span className={styles.button__text}>{children}</span>
            {iconRight && (
              <span className={styles.button__iconRight}>{iconRight}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
