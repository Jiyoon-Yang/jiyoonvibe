import { useState, useEffect } from "react";
import { Diary } from "@/commons/types/diary";
import { EmotionType, getEmotionData } from "@/commons/constants/enum";

/**
 * 일기 상세 데이터 바인딩 훅의 반환 타입
 */
export interface UseDiaryDetailBindingReturn {
  /**
   * 로컬스토리지에서 로드된 특정 일기
   */
  diary: Diary | null;

  /**
   * ISO 8601 형식의 날짜를 "YYYY. MM. DD" 형식으로 변환하는 함수
   * @param isoDate - ISO 8601 형식의 날짜 문자열
   * @returns "YYYY. MM. DD" 형식의 날짜 문자열
   */
  formatDate: (isoDate: string) => string;

  /**
   * Emotion 타입에 따른 감정 아이콘 이미지 경로를 반환하는 함수
   * iconS를 /images 경로의 .png 파일로 변환
   * @param emotion - 감정 타입
   * @returns 이미지 파일 경로
   */
  getEmotionIconPath: (emotion: EmotionType) => string;
}

/**
 * 로컬스토리지에서 특정 id의 일기 데이터를 바인딩하는 커스텀 훅
 *
 * 로컬스토리지의 "diaries" 키에 저장된 일기 데이터 중
 * 지정된 id와 일치하는 일기를 찾아 React 상태로 관리하며,
 * 데이터 변경 시 자동으로 업데이트합니다.
 * 날짜 형식 변환 및 감정 타입별 아이콘 경로 제공 기능을 포함합니다.
 *
 * @example
 * ```tsx
 * const { diary, formatDate, getEmotionIconPath } = useDiaryDetailBinding("1");
 *
 * if (!diary) {
 *   return <div>일기를 찾을 수 없습니다.</div>;
 * }
 *
 * return (
 *   <div>
 *     <h1>{diary.title}</h1>
 *     <img src={getEmotionIconPath(diary.emotion)} />
 *     <span>{formatDate(diary.createdAt)}</span>
 *     <p>{diary.content}</p>
 *   </div>
 * );
 * ```
 *
 * @param id - 조회할 일기의 ID
 * @returns 일기 데이터 및 유틸리티 함수들
 */
export const useDiaryDetailBinding = (
  id: string,
): UseDiaryDetailBindingReturn => {
  const [diary, setDiary] = useState<Diary | null>(null);

  useEffect(() => {
    // 로컬스토리지에서 특정 id의 diary 데이터 읽기
    const loadDiary = () => {
      try {
        const storedDiaries = localStorage.getItem("diaries");
        if (storedDiaries) {
          const parsedDiaries = JSON.parse(storedDiaries) as Diary[];
          const foundDiary = parsedDiaries.find((d) => d.id === Number(id));
          setDiary(foundDiary || null);
        } else {
          setDiary(null);
        }
      } catch (error) {
        console.error("Failed to load diary from localStorage:", error);
        setDiary(null);
      }
    };

    loadDiary();

    // 로컬스토리지 변경 감지
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "diaries") {
        loadDiary();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [id]);

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

  /**
   * Emotion 타입에 따른 감정 아이콘 이미지 경로 반환
   * enum의 iconS를 /images 경로의 .png 파일로 변환
   */
  const getEmotionIconPath = (emotion: EmotionType): string => {
    const emotionData = getEmotionData(emotion);
    return emotionData.iconS
      .replace("/icons/", "/images/")
      .replace(".svg", ".png");
  };

  return {
    diary,
    formatDate,
    getEmotionIconPath,
  };
};
