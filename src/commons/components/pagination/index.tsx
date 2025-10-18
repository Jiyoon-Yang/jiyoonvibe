"use client";

import React from "react";
import styles from "./styles.module.css";

export type PaginationVariant = "primary" | "secondary" | "tertiary";
export type PaginationSize = "small" | "medium" | "large";
export type PaginationTheme = "light" | "dark";

export interface PaginationProps {
  /**
   * Pagination variant
   * @default 'primary'
   */
  variant?: PaginationVariant;

  /**
   * Pagination 크기
   * @default 'medium'
   */
  size?: PaginationSize;

  /**
   * 테마
   * @default 'light'
   */
  theme?: PaginationTheme;

  /**
   * 현재 페이지
   * @default 1
   */
  currentPage?: number;

  /**
   * 전체 페이지 수
   * @default 1
   */
  totalPages?: number;

  /**
   * 표시할 페이지 버튼 개수
   * @default 5
   */
  pageRangeDisplayed?: number;

  /**
   * 페이지 변경 콜백
   */
  onPageChange?: (page: number) => void;

  /**
   * 이전 버튼 비활성화
   * @default false
   */
  disablePrevious?: boolean;

  /**
   * 다음 버튼 비활성화
   * @default false
   */
  disableNext?: boolean;

  /**
   * 이전 버튼 아이콘
   */
  previousIcon?: React.ReactNode;

  /**
   * 다음 버튼 아이콘
   */
  nextIcon?: React.ReactNode;

  /**
   * 추가 클래스명
   */
  className?: string;
}

/**
 * Pagination 공통 컴포넌트
 *
 * @example
 * ```tsx
 * // Primary Pagination
 * <Pagination
 *   variant="primary"
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => console.log(page)}
 * />
 *
 * // Secondary Pagination
 * <Pagination
 *   variant="secondary"
 *   size="large"
 *   currentPage={5}
 *   totalPages={20}
 * />
 *
 * // Tertiary Pagination with custom icons
 * <Pagination
 *   variant="tertiary"
 *   size="small"
 *   previousIcon={<PrevIcon />}
 *   nextIcon={<NextIcon />}
 * />
 * ```
 */
export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      variant = "primary",
      size = "medium",
      theme = "light",
      currentPage = 1,
      totalPages = 1,
      pageRangeDisplayed = 5,
      onPageChange,
      disablePrevious = false,
      disableNext = false,
      previousIcon,
      nextIcon,
      className = "",
    },
    ref
  ) => {
    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
      if (page < 1 || page > totalPages) return;
      if (page === currentPage) return;
      onPageChange?.(page);
    };

    // 이전 버튼 핸들러
    const handlePrevious = () => {
      if (currentPage > 1) {
        handlePageChange(currentPage - 1);
      }
    };

    // 다음 버튼 핸들러
    const handleNext = () => {
      if (currentPage < totalPages) {
        handlePageChange(currentPage + 1);
      }
    };

    // 페이지 번호 배열 생성
    const getPageNumbers = (): number[] => {
      const pages: number[] = [];
      const halfRange = Math.floor(pageRangeDisplayed / 2);

      let startPage = Math.max(1, currentPage - halfRange);
      const endPage = Math.min(totalPages, startPage + pageRangeDisplayed - 1);

      // startPage 조정 (끝 페이지에 가까울 때)
      if (endPage - startPage < pageRangeDisplayed - 1) {
        startPage = Math.max(1, endPage - pageRangeDisplayed + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    };

    const pageNumbers = getPageNumbers();

    // 클래스명 조합
    const paginationClassName = [
      styles.pagination,
      styles[`pagination--${variant}`],
      styles[`pagination--${size}`],
      styles[`pagination--${theme}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const isPreviousDisabled = disablePrevious || currentPage <= 1;
    const isNextDisabled = disableNext || currentPage >= totalPages;

    return (
      <div ref={ref} className={paginationClassName}>
        {/* 이전 버튼 */}
        <button
          type="button"
          className={[
            styles.pagination__arrow,
            styles.pagination__arrow__previous,
            isPreviousDisabled && styles["pagination__arrow--disabled"],
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
          aria-label="이전 페이지">
          {previousIcon || (
            <img
              src={
                currentPage === 1
                  ? "/icons/leftdisabled_outline_light_m.svg"
                  : "/icons/leftenable_outline_light_m.svg"
              }
              alt="이전 페이지"
            />
          )}
        </button>

        {/* 페이지 번호 */}
        <div className={styles.pagination__pages}>
          {pageNumbers.map((page) => (
            <button
              key={page}
              type="button"
              className={[
                styles.pagination__page,
                page === currentPage && styles["pagination__page--active"],
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handlePageChange(page)}
              aria-label={`페이지 ${page}`}
              aria-current={page === currentPage ? "page" : undefined}>
              {page}
            </button>
          ))}
        </div>

        {/* 다음 버튼 */}
        <button
          type="button"
          className={[
            styles.pagination__arrow,
            styles.pagination__arrow__next,
            isNextDisabled && styles["pagination__arrow--disabled"],
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={handleNext}
          disabled={isNextDisabled}
          aria-label="다음 페이지">
          {nextIcon || (
            <img
              src={
                currentPage === 5
                  ? "/icons/rightdisabled_outline_light_m.svg"
                  : "/icons/rightenable_outline_light_m.svg"
              }
              alt="다음 페이지"
            />
          )}
        </button>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";

export default Pagination;
