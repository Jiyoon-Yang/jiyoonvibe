"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

export type SearchbarVariant = "primary" | "secondary" | "tertiary";
export type SearchbarSize = "small" | "medium" | "large";
export type SearchbarTheme = "light" | "dark";

export interface SearchbarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * 검색바 variant
   * @default 'primary'
   */
  variant?: SearchbarVariant;

  /**
   * 검색바 크기
   * @default 'medium'
   */
  size?: SearchbarSize;

  /**
   * 테마
   * @default 'light'
   */
  theme?: SearchbarTheme;

  /**
   * 전체 너비 검색바 여부
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 검색 버튼 클릭 핸들러
   */
  onSearch?: (value: string) => void;

  /**
   * 검색어 초기화 버튼 표시 여부
   * @default true
   */
  showClearButton?: boolean;

  /**
   * 검색어 초기화 핸들러
   */
  onClear?: () => void;

  /**
   * 로딩 상태
   * @default false
   */
  loading?: boolean;
}

/**
 * Searchbar 공통 컴포넌트
 *
 * @example
 * ```tsx
 * // Primary 검색바
 * <Searchbar variant="primary" size="medium" placeholder="검색어를 입력해 주세요." />
 *
 * // Secondary 검색바
 * <Searchbar variant="secondary" size="large" placeholder="검색어를 입력해 주세요." />
 *
 * // Tertiary 검색바
 * <Searchbar variant="tertiary" size="small" placeholder="검색어를 입력해 주세요." />
 *
 * // 검색 이벤트가 있는 검색바
 * <Searchbar
 *   placeholder="검색어를 입력해 주세요."
 *   onSearch={(value) => console.log('검색:', value)}
 *   onClear={() => console.log('초기화')}
 * />
 *
 * // 전체 너비 검색바
 * <Searchbar fullWidth placeholder="검색어를 입력해 주세요." />
 *
 * // 로딩 상태 검색바
 * <Searchbar loading placeholder="검색 중..." />
 * ```
 */
export const Searchbar = React.forwardRef<HTMLInputElement, SearchbarProps>(
  (
    {
      variant = "primary",
      size = "medium",
      theme = "light",
      fullWidth = false,
      onSearch,
      showClearButton = true,
      onClear,
      loading = false,
      className = "",
      disabled = false,
      value,
      onChange,
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(value ?? "");

    // value prop이 변경되면 내부 상태 업데이트
    React.useEffect(() => {
      setInternalValue(value ?? "");
    }, [value]);

    // 검색 실행
    const handleSearch = () => {
      if (onSearch && !loading && !disabled) {
        onSearch(String(internalValue));
      }
    };

    // 검색어 초기화
    const handleClear = () => {
      setInternalValue("");
      if (onChange) {
        const event = {
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
      if (onClear) {
        onClear();
      }
    };

    // 입력값 변경
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    // 키보드 이벤트
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    // 클래스 이름 조합
    const wrapperClassName = [
      styles.searchbar__wrapper,
      fullWidth && styles["searchbar__wrapper--fullWidth"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const containerClassName = [
      styles.searchbar__container,
      styles[`searchbar__container--${variant}`],
      styles[`searchbar__container--${size}`],
      styles[`searchbar__container--${theme}`],
      disabled && styles["searchbar__container--disabled"],
      loading && styles["searchbar__container--loading"],
    ]
      .filter(Boolean)
      .join(" ");

    const inputClassName = [
      styles.searchbar__input,
      styles[`searchbar__input--${size}`],
      styles[`searchbar__input--${theme}`],
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={wrapperClassName}>
        <div className={containerClassName}>
          {/* 검색 아이콘 */}
          <button
            type="button"
            className={styles.searchbar__searchButton}
            onClick={handleSearch}
            disabled={disabled || loading}
            aria-label="검색">
            <Image
              src="/icons/search_outline_light_m.svg"
              alt=""
              width={24}
              height={24}
              className={styles.searchbar__searchIcon}
            />
          </button>

          {/* 입력 필드 */}
          <input
            ref={ref}
            type="text"
            className={inputClassName}
            value={internalValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-label="검색어 입력"
            data-testid="search-input"
            {...rest}
          />

          {/* 초기화 버튼 */}
          {showClearButton && internalValue && !loading && (
            <button
              type="button"
              className={styles.searchbar__clearButton}
              onClick={handleClear}
              disabled={disabled}
              aria-label="검색어 초기화">
              <Image
                src="/icons/close_outline_light_s.svg"
                alt=""
                width={20}
                height={20}
                className={styles.searchbar__clearIcon}
              />
            </button>
          )}

          {/* 로딩 스피너 */}
          {loading && (
            <div className={styles.searchbar__loading}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.searchbar__loadingIcon}>
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="31.416"
                  strokeDashoffset="31.416"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Searchbar.displayName = "Searchbar";

export default Searchbar;
