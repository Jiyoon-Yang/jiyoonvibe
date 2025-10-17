"use client";

import { useRouter } from "next/navigation";
import { URL_PATHS } from "@/commons/constants/url";

/**
 * 일기 카드 라우팅 훅의 반환 타입
 */
export interface UseDiaryRoutingReturn {
  /**
   * 일기 카드 클릭 시 상세 페이지로 이동하는 함수
   * @param id - 일기 ID
   */
  handleCardClick: (id: number) => void;
}

/**
 * 일기 카드 클릭 시 상세 페이지로 라우팅하는 커스텀 훅
 *
 * 일기 카드를 클릭하면 해당 일기의 상세 페이지(/diaries/[id])로 이동합니다.
 * URL 경로는 url.ts에 정의된 상수를 사용하여 하드코딩을 방지합니다.
 *
 * @example
 * ```tsx
 * const { handleCardClick } = useDiaryRouting();
 *
 * return (
 *   <div onClick={() => handleCardClick(diary.id)}>
 *     {diary.title}
 *   </div>
 * );
 * ```
 *
 * @returns 일기 카드 라우팅 핸들러
 */
export const useDiaryRouting = (): UseDiaryRoutingReturn => {
  const router = useRouter();

  /**
   * 일기 카드 클릭 핸들러
   * @param id - 일기 ID
   */
  const handleCardClick = (id: number) => {
    router.push(URL_PATHS.DIARIES.DETAIL(id));
  };

  return {
    handleCardClick,
  };
};
