"use client";

import React, { useState, useCallback } from "react";
import styles from "./styles.module.css";

/**
 * Toggle 컴포넌트 Props 타입 정의
 */
export interface ToggleProps {
  /** 토글 상태 (제어 컴포넌트) */
  checked?: boolean;
  /** 기본 토글 상태 (비제어 컴포넌트) */
  defaultChecked?: boolean;
  /** 토글 상태 변경 콜백 */
  onChange?: (checked: boolean) => void;
  /** 토글 비활성화 여부 */
  disabled?: boolean;
  /** 토글 크기 */
  size?: "small" | "medium" | "large";
  /** 토글 변형 */
  variant?: "primary" | "secondary" | "tertiary";
  /** 테마 */
  theme?: "light" | "dark";
  /** 접근성을 위한 라벨 */
  "aria-label"?: string;
  /** 접근성을 위한 설명 */
  "aria-describedby"?: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
}

/**
 * Toggle 컴포넌트
 *
 * @description 사용자가 두 상태 간을 전환할 수 있는 토글 스위치 컴포넌트
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <Toggle onChange={(checked) => console.log(checked)} />
 *
 * // 제어 컴포넌트
 * <Toggle checked={isOn} onChange={setIsOn} />
 *
 * // 다양한 크기와 변형
 * <Toggle size="large" variant="primary" />
 * <Toggle size="small" variant="secondary" theme="dark" />
 * ```
 */
export const Toggle: React.FC<ToggleProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = "medium",
  variant = "primary",
  theme = "light",
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  className = "",
  style,
}) => {
  // 내부 상태 관리 (비제어 컴포넌트용)
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  // 제어/비제어 컴포넌트 처리
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  // 토글 상태 변경 핸들러
  const handleToggle = useCallback(() => {
    if (disabled) return;

    const newChecked = !checked;

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked);
  }, [checked, disabled, isControlled, onChange]);

  // 키보드 이벤트 핸들러
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  // CSS 클래스 생성
  const toggleClasses = [
    styles.toggle,
    styles[`toggle--${size}`],
    styles[`toggle--${variant}`],
    styles[`toggle--${theme}`],
    checked ? styles["toggle--checked"] : styles["toggle--unchecked"],
    disabled ? styles["toggle--disabled"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const thumbClasses = [
    styles.thumb,
    styles[`thumb--${size}`],
    checked ? styles["thumb--checked"] : styles["thumb--unchecked"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      disabled={disabled}
      className={toggleClasses}
      style={style}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}>
      <span className={thumbClasses} />
    </button>
  );
};

export default Toggle;
