"use client";

import { useState, useCallback, useMemo } from "react";

/**
 * 필터 타입 정의
 */
export enum FilterType {
  Default = "default",
  Horizontal = "horizontal",
  Vertical = "vertical",
}

/**
 * 필터 옵션 타입
 */
export interface FilterOption {
  value: FilterType;
  label: string;
}

/**
 * 이미지 크기 타입
 */
export interface ImageSize {
  width: number;
  height: number;
}

/**
 * 필터별 이미지 크기 매핑
 */
const FILTER_IMAGE_SIZES: Record<FilterType, ImageSize> = {
  [FilterType.Default]: { width: 640, height: 640 },
  [FilterType.Horizontal]: { width: 640, height: 480 },
  [FilterType.Vertical]: { width: 480, height: 640 },
};

/**
 * 필터 옵션 목록
 */
export const FILTER_OPTIONS: FilterOption[] = [
  { value: FilterType.Default, label: "기본" },
  { value: FilterType.Horizontal, label: "가로형" },
  { value: FilterType.Vertical, label: "세로형" },
];

/**
 * 필터 hook 반환 타입
 */
export interface UseFilterReturn {
  selectedFilter: FilterType;
  filterOptions: FilterOption[];
  imageSize: ImageSize;
  handleFilterChange: (filter: FilterType) => void;
}

/**
 * 필터 기능을 관리하는 hook
 */
export function useFilter(): UseFilterReturn {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(
    FilterType.Default
  );

  const imageSize = useMemo(() => {
    return FILTER_IMAGE_SIZES[selectedFilter];
  }, [selectedFilter]);

  const handleFilterChange = useCallback((filter: FilterType) => {
    setSelectedFilter(filter);
  }, []);

  return {
    selectedFilter,
    filterOptions: FILTER_OPTIONS,
    imageSize,
    handleFilterChange,
  };
}
