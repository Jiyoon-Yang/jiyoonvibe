import { useState, useCallback } from "react";
import { Diary } from "@/commons/types/diary";
import { EmotionType, emotions } from "@/commons/constants/enum";

/**
 * 필터 타입 정의
 */
export type FilterType = "all" | EmotionType;

/**
 * 필터 옵션 인터페이스
 */
export interface FilterOption {
  value: FilterType;
  label: string;
}

/**
 * 필터 기능 훅의 반환 타입
 */
export interface UseDiaryFilterReturn {
  /**
   * 현재 선택된 필터
   */
  selectedFilter: FilterType;

  /**
   * 필터 옵션 목록
   */
  filterOptions: FilterOption[];

  /**
   * 필터 변경 핸들러
   * @param filter - 선택할 필터 타입
   */
  handleFilterChange: (filter: FilterType) => void;

  /**
   * 필터 초기화 함수
   */
  clearFilter: () => void;

  /**
   * 현재 필터가 적용된 일기 목록 반환
   */
  getFilteredDiaries: () => Diary[];

  /**
   * 필터링 함수 (직접 호출용)
   * @param filter - 적용할 필터
   * @param diaries - 필터링할 일기 목록
   */
  filterDiaries: (filter: FilterType, diaries: Diary[]) => Diary[];
}

/**
 * 일기 필터링 기능을 위한 커스텀 훅
 *
 * 감정별로 일기를 필터링할 수 있는 기능을 제공합니다.
 * 전체, 행복해요, 슬퍼요, 놀랐어요, 화나요, 기타 등의 옵션으로 필터링 가능합니다.
 *
 * @example
 * ```tsx
 * const { selectedFilter, filterOptions, handleFilterChange, getFilteredDiaries } = useDiaryFilter(diaries);
 *
 * return (
 *   <Selectbox
 *     options={filterOptions}
 *     value={selectedFilter}
 *     onChange={handleFilterChange}
 *   />
 * );
 * ```
 *
 * @param allDiaries - 필터링할 전체 일기 목록
 * @returns 필터링 관련 상태와 함수들
 */
export const useDiaryFilter = (allDiaries: Diary[]): UseDiaryFilterReturn => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");

  /**
   * 필터 옵션 목록 생성
   */
  const getFilterOptions = useCallback((): FilterOption[] => {
    return [
      { value: "all", label: "전체" },
      ...Object.values(emotions).map((emotion) => ({
        value: emotion.type as FilterType,
        label: emotion.label,
      })),
    ];
  }, []);

  /**
   * 선택된 필터에 따라 일기를 필터링하는 함수
   */
  const filterDiaries = useCallback(
    (filter: FilterType, diaries: Diary[]): Diary[] => {
      if (filter === "all") {
        return diaries;
      }

      return diaries.filter((diary) => diary.emotion === filter);
    },
    []
  );

  /**
   * 필터 변경 핸들러
   */
  const handleFilterChange = useCallback((filter: FilterType) => {
    setSelectedFilter(filter);
  }, []);

  /**
   * 필터 초기화 함수
   */
  const clearFilter = useCallback(() => {
    setSelectedFilter("all");
  }, []);

  /**
   * 현재 필터가 적용된 일기 목록 반환
   */
  const getFilteredDiaries = useCallback((): Diary[] => {
    return filterDiaries(selectedFilter, allDiaries);
  }, [selectedFilter, allDiaries, filterDiaries]);

  return {
    selectedFilter,
    filterOptions: getFilterOptions(),
    handleFilterChange,
    clearFilter,
    getFilteredDiaries,
    filterDiaries,
  };
};
