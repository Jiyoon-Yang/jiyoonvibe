"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";

export interface SelectboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectboxProps {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  theme?: "light" | "dark";
  options: SelectboxOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  searchable?: boolean;
  iconLeft?: React.ReactNode;
  onChange?: (value: string) => void;
  className?: string;
  "data-testid"?: string;
}

export const Selectbox: React.FC<SelectboxProps> = ({
  variant = "primary",
  size = "medium",
  theme = "light",
  options,
  value,
  defaultValue,
  placeholder = "선택하세요",
  label,
  helperText,
  errorMessage,
  fullWidth = false,
  disabled = false,
  error = false,
  required = false,
  searchable = false,
  iconLeft,
  onChange,
  className,
  "data-testid": dataTestId,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    value || defaultValue
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 제어 컴포넌트 지원
  const currentValue = value !== undefined ? value : selectedValue;

  // 선택된 옵션 찾기
  const selectedOption = options.find((opt) => opt.value === currentValue);

  // 필터링된 옵션
  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 드롭다운 열릴 때 검색 입력에 포커스
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (isOpen) {
        setSearchQuery("");
      }
    }
  };

  const handleSelect = (optionValue: string) => {
    if (!disabled) {
      const option = options.find((opt) => opt.value === optionValue);
      if (option && !option.disabled) {
        setSelectedValue(optionValue);
        setIsOpen(false);
        setSearchQuery("");
        onChange?.(optionValue);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const containerClasses = [
    styles.container,
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const triggerClasses = [
    styles.trigger,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`theme-${theme}`],
    disabled && styles.disabled,
    error && styles.error,
    isOpen && styles.open,
  ]
    .filter(Boolean)
    .join(" ");

  const dropdownClasses = [
    styles.dropdown,
    styles[`theme-${theme}`],
    isOpen && styles.open,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div ref={containerRef} className={styles.selectWrapper}>
        <button
          type="button"
          className={triggerClasses}
          onClick={handleToggle}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          data-testid={dataTestId}>
          {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
          <span className={styles.value}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span
            className={`${styles.iconRight} ${
              isOpen ? styles.iconRotate : ""
            }`}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className={dropdownClasses}>
            {searchable && (
              <div className={styles.searchWrapper}>
                <input
                  ref={searchInputRef}
                  type="text"
                  className={styles.searchInput}
                  placeholder="검색..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <ul className={styles.optionList} role="listbox">
              {filteredOptions.length === 0 ? (
                <li className={styles.noResults}>검색 결과가 없습니다</li>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = option.value === currentValue;
                  const optionClasses = [
                    styles.option,
                    isSelected && styles.selected,
                    option.disabled && styles.optionDisabled,
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <li
                      key={option.value}
                      className={optionClasses}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(option.value)}>
                      <span className={styles.optionLabel}>{option.label}</span>
                      {isSelected && (
                        <span className={styles.checkIcon}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M6.00001 10.7803L3.21968 8L2.27002 8.94967L6.00001 12.6797L13.7267 4.953L12.777 4.00333L6.00001 10.7803Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>

      {helperText && !error && (
        <p className={styles.helperText}>{helperText}</p>
      )}
      {error && errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
    </div>
  );
};
