import { EmotionType } from "@/commons/constants/enum";

/**
 * 일기 데이터 인터페이스
 *
 * 사용자가 작성한 일기의 기본 구조를 정의합니다.
 * 로컬스토리지에 저장되는 일기 데이터의 타입입니다.
 */
export interface Diary {
  /**
   * 일기 고유 ID
   */
  id: number;

  /**
   * 일기 제목
   */
  title: string;

  /**
   * 일기 내용
   */
  content: string;

  /**
   * 일기 작성 시 감정 상태
   */
  emotion: EmotionType;

  /**
   * 일기 작성 일시 (ISO 8601 형식)
   */
  createdAt: string;
}
