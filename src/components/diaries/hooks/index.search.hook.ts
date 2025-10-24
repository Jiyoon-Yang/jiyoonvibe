import { useState, useCallback } from "react";
import { Diary } from "@/commons/types/diary";

/**
 * 검색 기능을 위한 hook
 */
export const useDiarySearch = (allDiaries: Diary[]) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  /**
   * 검색어에 따라 일기를 필터링하는 함수
   */
  const searchDiaries = useCallback(
    (query: string, diaries: Diary[]): Diary[] => {
      if (!query.trim()) {
        return diaries;
      }

      const searchTerm = query.toLowerCase().trim();

      return diaries.filter((diary) =>
        diary.title.toLowerCase().includes(searchTerm)
      );
    },
    []
  );

  /**
   * 검색 실행 함수
   */
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  /**
   * 검색 초기화 함수
   */
  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  /**
   * 현재 표시할 일기 목록 반환
   */
  const getDisplayDiaries = useCallback((): Diary[] => {
    return searchDiaries(searchQuery, allDiaries);
  }, [searchQuery, allDiaries, searchDiaries]);

  return {
    searchQuery,
    handleSearch,
    clearSearch,
    getDisplayDiaries,
    searchDiaries,
  };
};
