import { useState, useEffect } from "react";

/**
 * 회고 데이터 타입
 */
export interface Retrospect {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
}

/**
 * 회고 데이터 바인딩 훅의 반환 타입
 */
export interface UseRetrospectBindingReturn {
  /**
   * 로컬스토리지에서 로드된 특정 일기의 회고 목록
   */
  retrospects: Retrospect[];

  /**
   * ISO 8601 형식의 날짜를 "YYYY. MM. DD" 형식으로 변환하는 함수
   * @param isoDate - ISO 8601 형식의 날짜 문자열
   * @returns "YYYY. MM. DD" 형식의 날짜 문자열
   */
  formatDate: (isoDate: string) => string;
}

/**
 * 로컬스토리지에서 특정 diaryId의 회고 데이터를 바인딩하는 커스텀 훅
 *
 * 로컬스토리지의 "retrospects" 키에 저장된 회고 데이터 중
 * 지정된 diaryId와 일치하는 회고들을 찾아 React 상태로 관리하며,
 * 데이터 변경 시 자동으로 업데이트합니다.
 * 날짜 형식 변환 기능을 포함합니다.
 *
 * @example
 * ```tsx
 * const { retrospects, formatDate } = useRetrospectBinding(1);
 *
 * return (
 *   <div>
 *     {retrospects.map((retrospect) => (
 *       <div key={retrospect.id}>
 *         <p>{retrospect.content}</p>
 *         <span>{formatDate(retrospect.createdAt)}</span>
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 *
 * @param diaryId - 조회할 일기의 ID
 * @returns 회고 데이터 및 유틸리티 함수들
 */
export const useRetrospectBinding = (
  diaryId: number
): UseRetrospectBindingReturn => {
  const [retrospects, setRetrospects] = useState<Retrospect[]>([]);

  useEffect(() => {
    // 로컬스토리지에서 특정 diaryId의 회고 데이터 읽기
    const loadRetrospects = () => {
      try {
        const storedRetrospects = localStorage.getItem("retrospects");
        if (storedRetrospects) {
          const parsedRetrospects = JSON.parse(
            storedRetrospects
          ) as Retrospect[];
          // 현재 일기와 연결된 회고만 필터링
          const filteredRetrospects = parsedRetrospects.filter(
            (retrospect) => retrospect.diaryId === diaryId
          );
          setRetrospects(filteredRetrospects);
        } else {
          setRetrospects([]);
        }
      } catch (error) {
        console.error("Failed to load retrospects from localStorage:", error);
        setRetrospects([]);
      }
    };

    loadRetrospects();

    // 로컬스토리지 변경 감지
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "retrospects") {
        loadRetrospects();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [diaryId]);

  /**
   * ISO 8601 형식의 날짜를 "YYYY. MM. DD" 형식으로 변환
   */
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}. ${month}. ${day}`;
  };

  return {
    retrospects,
    formatDate,
  };
};
