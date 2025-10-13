"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";

export type SelectboxVariant = "primary" | "secondary" | "tertiary";
export type SelectboxSize = "small" | "medium" | "large";
export type SelectboxTheme = "light" | "dark";

export interface SelectboxOption {
  /**
   * 옵션 값
   */
  value: string | number;

  /**
   * 옵션 라벨
   */
  label: string;

  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
}

export interface SelectboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * 셀렉트박스 variant
   * @default 'primary'
   */
  variant?: SelectboxVariant;

  /**
   * 셀렉트박스 크기
   * @default 'medium'
   */
  size?: SelectboxSize;

  /**
   * 테마
   * @default 'light'
   */
  theme?: SelectboxTheme;

  /**
   * 전체 너비 셀렉트박스 여부
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
   * 플레이스홀더
   */
  placeholder?: string;

  /**
   * 선택된 값
   */
  value?: string | number;

  /**
   * 기본 선택된 값
   */
  defaultValue?: string | number;

  /**
   * 옵션 목록
   */
  options: SelectboxOption[];

  /**
   * 값 변경 시 호출되는 함수
   */
  onChange?: (value: string | number) => void;

  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;

  /**
   * 검색 가능 여부
   * @default false
   */
  searchable?: boolean;

  /**
   * 다중 선택 여부
   * @default false
   */
  multiple?: boolean;

  /**
   * 아이콘 (왼쪽)
   */
  iconLeft?: React.ReactNode;
}

/**
 * Selectbox 공통 컴포넌트
 *
 * @example
 * ```tsx
 * // Primary 셀렉트박스
 * <Selectbox
 *   variant="primary"
 *   size="medium"
 *   placeholder="선택하세요"
 *   options={[
 *     { value: "option1", label: "옵션 1" },
 *     { value: "option2", label: "옵션 2" }
 *   ]}
 * />
 *
 * // Secondary 셀렉트박스
 * <Selectbox
 *   variant="secondary"
 *   size="large"
 *   placeholder="선택하세요"
 *   options={options}
 * />
 *
 * // Tertiary 셀렉트박스
 * <Selectbox
 *   variant="tertiary"
 *   size="small"
 *   placeholder="선택하세요"
 *   options={options}
 * />
 *
 * // 라벨과 에러 메시지가 있는 셀렉트박스
 * <Selectbox
 *   label="카테고리"
 *   required
 *   error
 *   errorMessage="카테고리를 선택하세요"
 *   options={options}
 * />
 *
 * // 검색 가능한 셀렉트박스
 * <Selectbox searchable placeholder="검색하여 선택" options={options} />
 *
 * // 전체 너비 셀렉트박스
 * <Selectbox fullWidth placeholder="전체 너비" options={options} />
 * ```
 */
export const Selectbox = React.forwardRef<HTMLDivElement, SelectboxProps>(
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
      placeholder = "선택하세요",
      value,
      defaultValue,
      options = [],
      onChange,
      disabled = false,
      searchable = false,
      // multiple = false, // TODO: 다중 선택 기능은 향후 구현 예정
      iconLeft,
      className = "",
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(
      value || defaultValue || ""
    );
    const [searchTerm, setSearchTerm] = useState("");
    const selectboxRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // 외부에서 value가 변경될 때 내부 상태 업데이트
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    // 외부 클릭 감지하여 드롭다운 닫기
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectboxRef.current &&
          !selectboxRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchTerm("");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // 선택된 옵션 찾기
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );

    // 필터링된 옵션들
    const filteredOptions = searchable
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

    // 옵션 선택 핸들러
    const handleOptionSelect = (optionValue: string | number) => {
      if (disabled) return;

      setSelectedValue(optionValue);
      setIsOpen(false);
      setSearchTerm("");
      onChange?.(optionValue);
    };

    // 드롭다운 토글 핸들러
    const handleToggle = () => {
      if (disabled) return;
      setIsOpen(!isOpen);
      if (searchable && !isOpen) {
        // 드롭다운이 열릴 때 검색 입력에 포커스
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }
    };

    // 키보드 이벤트 핸들러
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return;

      switch (event.key) {
        case "Enter":
        case " ":
          if (!searchable) {
            event.preventDefault();
            handleToggle();
          }
          break;
        case "Escape":
          setIsOpen(false);
          setSearchTerm("");
          break;
        case "ArrowDown":
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            // Focus first option when dropdown is open
            const firstOption = selectboxRef.current?.querySelector(
              `.${styles.selectbox__option}:not(.${styles["selectbox__option--disabled"]})`
            ) as HTMLElement;
            firstOption?.focus();
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          if (isOpen) {
            setIsOpen(false);
          }
          break;
        case "Tab":
          if (isOpen) {
            setIsOpen(false);
            setSearchTerm("");
          }
          break;
      }
    };

    // 클래스 이름 조합
    const wrapperClassName = [
      styles.selectbox__wrapper,
      fullWidth && styles["selectbox__wrapper--fullWidth"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const selectboxClassName = [
      styles.selectbox,
      styles[`selectbox--${variant}`],
      styles[`selectbox--${size}`],
      styles[`selectbox--${theme}`],
      error && styles["selectbox--error"],
      disabled && styles["selectbox--disabled"],
      isOpen && styles["selectbox--open"],
    ]
      .filter(Boolean)
      .join(" ");

    const dropdownClassName = [
      styles.selectbox__dropdown,
      styles[`selectbox__dropdown--${size}`],
      styles[`selectbox__dropdown--${theme}`],
      isOpen && styles["selectbox__dropdown--open"],
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={wrapperClassName} {...rest}>
        {label && (
          <label className={styles.selectbox__label}>
            {label}
            {required && <span className={styles.selectbox__required}>*</span>}
          </label>
        )}
        <div
          ref={selectboxRef}
          className={selectboxClassName}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="selectbox-dropdown"
          aria-invalid={error}
          aria-describedby={
            error && errorMessage
              ? "error-message"
              : helperText
              ? "helper-text"
              : undefined
          }>
          <div className={styles.selectbox__container}>
            {iconLeft && (
              <span className={styles.selectbox__iconLeft}>{iconLeft}</span>
            )}
            {searchable && isOpen ? (
              <input
                ref={inputRef}
                type="text"
                className={styles.selectbox__searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
              />
            ) : (
              <span className={styles.selectbox__value}>
                {selectedOption ? selectedOption.label : placeholder}
              </span>
            )}
            <span className={styles.selectbox__arrow}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
              </svg>
            </span>
          </div>

          {isOpen && (
            <div id="selectbox-dropdown" className={dropdownClassName}>
              <ul className={styles.selectbox__optionList} role="listbox">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <li
                      key={option.value}
                      className={[
                        styles.selectbox__option,
                        option.value === selectedValue &&
                          styles["selectbox__option--selected"],
                        option.disabled &&
                          styles["selectbox__option--disabled"],
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() =>
                        !option.disabled && handleOptionSelect(option.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (!option.disabled) {
                            handleOptionSelect(option.value);
                          }
                        } else if (e.key === "ArrowDown") {
                          e.preventDefault();
                          const nextOption = (e.target as HTMLElement)
                            .nextElementSibling as HTMLElement;
                          nextOption?.focus();
                        } else if (e.key === "ArrowUp") {
                          e.preventDefault();
                          const prevOption = (e.target as HTMLElement)
                            .previousElementSibling as HTMLElement;
                          prevOption?.focus();
                        }
                      }}
                      role="option"
                      aria-selected={option.value === selectedValue}
                      tabIndex={option.disabled ? -1 : 0}>
                      {option.label}
                    </li>
                  ))
                ) : (
                  <li className={styles.selectbox__noOptions}>
                    검색 결과가 없습니다
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        {error && errorMessage && (
          <span id="error-message" className={styles.selectbox__errorMessage}>
            {errorMessage}
          </span>
        )}
        {!error && helperText && (
          <span id="helper-text" className={styles.selectbox__helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Selectbox.displayName = "Selectbox";

export default Selectbox;
