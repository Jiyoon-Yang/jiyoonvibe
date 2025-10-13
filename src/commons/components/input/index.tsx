"use client";

import React from "react";
import styles from "./styles.module.css";

export type InputVariant = "primary" | "secondary" | "tertiary";
export type InputSize = "small" | "medium" | "large";
export type InputTheme = "light" | "dark";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * 인풋 variant
   * @default 'primary'
   */
  variant?: InputVariant;

  /**
   * 인풋 크기
   * @default 'medium'
   */
  size?: InputSize;

  /**
   * 테마
   * @default 'light'
   */
  theme?: InputTheme;

  /**
   * 전체 너비 인풋 여부
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 에러 상태
   * @default false
   */
  error?: boolean;

  /**
   * 에러 메시지
   */
  errorMessage?: string;

  /**
   * 헬퍼 텍스트
   */
  helperText?: string;

  /**
   * 라벨
   */
  label?: string;

  /**
   * 필수 입력 여부
   * @default false
   */
  required?: boolean;

  /**
   * 아이콘 (왼쪽)
   */
  iconLeft?: React.ReactNode;

  /**
   * 아이콘 (오른쪽)
   */
  iconRight?: React.ReactNode;
}

/**
 * Input 공통 컴포넌트
 *
 * @example
 * ```tsx
 * // Primary 인풋
 * <Input variant="primary" size="medium" placeholder="입력하세요" />
 *
 * // Secondary 인풋
 * <Input variant="secondary" size="large" placeholder="입력하세요" />
 *
 * // Tertiary 인풋
 * <Input variant="tertiary" size="small" placeholder="입력하세요" />
 *
 * // 라벨과 에러 메시지가 있는 인풋
 * <Input
 *   label="이메일"
 *   required
 *   error
 *   errorMessage="올바른 이메일을 입력하세요"
 * />
 *
 * // 아이콘이 있는 인풋
 * <Input iconLeft={<SearchIcon />} placeholder="검색" />
 *
 * // 전체 너비 인풋
 * <Input fullWidth placeholder="전체 너비" />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "primary",
      size = "medium",
      theme = "light",
      fullWidth = false,
      error = false,
      errorMessage,
      helperText,
      label,
      required = false,
      iconLeft,
      iconRight,
      className = "",
      disabled = false,
      ...rest
    },
    ref
  ) => {
    // 클래스 이름 조합
    const wrapperClassName = [
      styles.input__wrapper,
      fullWidth && styles["input__wrapper--fullWidth"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const inputClassName = [
      styles.input,
      styles[`input--${variant}`],
      styles[`input--${size}`],
      styles[`input--${theme}`],
      error && styles["input--error"],
      disabled && styles["input--disabled"],
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={wrapperClassName}>
        {label && (
          <label className={styles.input__label}>
            {label}
            {required && <span className={styles.input__required}>*</span>}
          </label>
        )}
        <div className={styles.input__container}>
          {iconLeft && (
            <span className={styles.input__iconLeft}>{iconLeft}</span>
          )}
          <input
            ref={ref}
            className={inputClassName}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={
              error && errorMessage
                ? "error-message"
                : helperText
                ? "helper-text"
                : undefined
            }
            {...rest}
          />
          {iconRight && (
            <span className={styles.input__iconRight}>{iconRight}</span>
          )}
        </div>
        {error && errorMessage && (
          <span id="error-message" className={styles.input__errorMessage}>
            {errorMessage}
          </span>
        )}
        {!error && helperText && (
          <span id="helper-text" className={styles.input__helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
