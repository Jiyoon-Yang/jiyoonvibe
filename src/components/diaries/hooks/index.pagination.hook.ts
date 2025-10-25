import { useMemo, useCallback } from "react";
import { Diary } from "@/commons/types/diary";

/**
 * 페이지네이션 관련 상수
 */
const ITEMS_PER_PAGE = 12; // 3행 4열 = 12개

/**
 * 페이지네이션 기능 훅의 반환 타입
 */
export interface UseDiaryPaginationReturn {
  /**
   * 현재 페이지
   */
  currentPage: number;

  /**
   * 총 페이지 수
   */
  totalPages: number;

  /**
   * 현재 페이지에 표시할 일기 목록
   */
  paginatedDiaries: Diary[];

  /**
   * 페이지 변경 핸들러
   * @param page - 이동할 페이지 번호
   */
  handlePageChange: (page: number) => void;

  /**
   * 페이지 초기화 함수 (검색/필터 변경 시 호출)
   */
  resetPagination: () => void;
}

/**
 * 일기 목록 페이지네이션 기능을 위한 커스텀 훅
 *
 * 일기 목록을 페이지당 12개씩 표시하며, 페이지 번호를 관리합니다.
 * 검색 및 필터가 변경되면 자동으로 총 페이지 수를 재계산합니다.
 *
 * @example
 * ```tsx
 * const { currentPage, totalPages, paginatedDiaries, handlePageChange } = useDiaryPagination(diaries);
 *
 * return (
 *   <Pagination
 *     currentPage={currentPage}
 *     totalPages={totalPages}
 *     onPageChange={handlePageChange}
 *   />
 * );
 * ```
 *
 * @param diaries - 페이지네이션을 적용할 일기 목록
 * @returns 페이지네이션 관련 상태와 함수들
 */
export const useDiaryPagination = (
  diaries: Diary[],
  initialPage: number = 1
): UseDiaryPaginationReturn => {
  // 현재 페이지 상태는 부모 컴포넌트에서 관리하므로 삭제
  // const [currentPage, setCurrentPage] = useState<number>(initialPage);

  /**
   * 총 페이지 수 계산
   */
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(diaries.length / ITEMS_PER_PAGE));
  }, [diaries.length]);

  /**
   * 현재 페이지에 표시할 일기 목록
   */
  const paginatedDiaries = useMemo(() => {
    const startIndex = (initialPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return diaries.slice(startIndex, endIndex);
  }, [diaries, initialPage]);

  /**
   * 페이지 변경 핸들러 (placeholder - 부모 컴포넌트에서 구현)
   */
  const handlePageChange = useCallback(() => {
    // 부모 컴포넌트의 setCurrentPage를 호출
  }, []);

  /**
   * 페이지 초기화 함수
   */
  const resetPagination = useCallback(() => {
    // 부모 컴포넌트의 setCurrentPage(1)를 호출
  }, []);

  return {
    currentPage: initialPage,
    totalPages,
    paginatedDiaries,
    handlePageChange,
    resetPagination,
  };
};
