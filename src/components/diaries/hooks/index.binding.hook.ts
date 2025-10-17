import { useState, useEffect } from "react";
import { Diary } from "@/commons/types/diary";
import { EmotionType } from "@/commons/constants/enum";

/**
 * 일기 데이터 바인딩 훅의 반환 타입
 */
export interface UseDiaryBindingReturn {
  /**
   * 로컬스토리지에서 로드된 일기 목록
   */
  diaries: Diary[];

  /**
   * ISO 8601 형식의 날짜를 "YYYY. MM. DD" 형식으로 변환하는 함수
   * @param isoDate - ISO 8601 형식의 날짜 문자열
   * @returns "YYYY. MM. DD" 형식의 날짜 문자열
   */
  formatDate: (isoDate: string) => string;

  /**
   * Emotion 타입에 따른 이미지 경로를 반환하는 함수
   * @param emotion - 감정 타입
   * @returns 이미지 파일 경로
   */
  getEmotionImage: (emotion: EmotionType) => string;
}

/**
 * 로컬스토리지에서 일기 데이터를 바인딩하는 커스텀 훅
 *
 * 로컬스토리지의 "diaries" 키에 저장된 일기 데이터를 읽어와
 * React 상태로 관리하며, 데이터 변경 시 자동으로 업데이트합니다.
 * 날짜 형식 변환 및 감정 타입별 이미지 경로 제공 기능을 포함합니다.
 *
 * @example
 * ```tsx
 * const { diaries, formatDate, getEmotionImage } = useDiaryBinding();
 *
 * return (
 *   <div>
 *     {diaries.map((diary) => (
 *       <div key={diary.id}>
 *         <img src={getEmotionImage(diary.emotion)} />
 *         <span>{formatDate(diary.createdAt)}</span>
 *         <span>{diary.title}</span>
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 *
 * @returns 일기 데이터 및 유틸리티 함수들
 */
export const useDiaryBinding = (): UseDiaryBindingReturn => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    // 로컬스토리지에서 diaries 데이터 읽기
    const loadDiaries = () => {
      try {
        const storedDiaries = localStorage.getItem("diaries");
        if (storedDiaries) {
          const parsedDiaries = JSON.parse(storedDiaries) as Diary[];
          setDiaries(parsedDiaries);
        } else {
          setDiaries([]);
        }
      } catch (error) {
        console.error("Failed to load diaries from localStorage:", error);
        setDiaries([]);
      }
    };

    loadDiaries();

    // 로컬스토리지 변경 감지
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "diaries") {
        loadDiaries();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
   * Emotion 타입에 따른 이미지 경로 반환
   */
  const getEmotionImage = (emotion: EmotionType): string => {
    const emotionImageMap: Record<EmotionType, string> = {
      [EmotionType.Happy]: "/images/emotion-happy-m.png",
      [EmotionType.Sad]: "/images/emotion-sad-m.png",
      [EmotionType.Angry]: "/images/emotion-angry-m.png",
      [EmotionType.Surprise]: "/images/emotion-surprise-m.png",
      [EmotionType.Etc]: "/images/emotion-etc-m.png",
    };
    return emotionImageMap[emotion];
  };

  return {
    diaries,
    formatDate,
    getEmotionImage,
  };
};
