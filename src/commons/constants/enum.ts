/**
 * Enum 상수
 * 프로젝트에서 사용되는 열거형 타입 정의
 */

import { colors } from "./color";

/**
 * 감정(Emotion) 타입 정의
 */
export enum EmotionType {
  Happy = "Happy",
  Sad = "Sad",
  Angry = "Angry",
  Surprise = "Surprise",
  Etc = "Etc",
}

/**
 * 감정별 상세 정보
 */
export interface EmotionData {
  type: EmotionType;
  label: string;
  iconM: string;
  iconS: string;
  color: string;
}

/**
 * 감정(Emotion) 데이터 맵
 */
export const emotions: Record<EmotionType, EmotionData> = {
  [EmotionType.Happy]: {
    type: EmotionType.Happy,
    label: "행복해요",
    iconM: "/icons/emotion-happy-m.svg",
    iconS: "/icons/emotion-happy-s.svg",
    color: colors.red[60],
  },
  [EmotionType.Sad]: {
    type: EmotionType.Sad,
    label: "슬퍼요",
    iconM: "/icons/emotion-sad-m.svg",
    iconS: "/icons/emotion-sad-s.svg",
    color: colors.blue[60],
  },
  [EmotionType.Angry]: {
    type: EmotionType.Angry,
    label: "화나요",
    iconM: "/icons/emotion-angry-m.svg",
    iconS: "/icons/emotion-angry-s.svg",
    color: colors.gray[60],
  },
  [EmotionType.Surprise]: {
    type: EmotionType.Surprise,
    label: "놀랐어요",
    iconM: "/icons/emotion-surprise-m.svg",
    iconS: "/icons/emotion-surprise-s.svg",
    color: colors.yellow[60],
  },
  [EmotionType.Etc]: {
    type: EmotionType.Etc,
    label: "기타",
    iconM: "/icons/emotion-etc-m.svg",
    iconS: "/icons/emotion-etc-s.svg",
    color: colors.green[60],
  },
};

/**
 * 모든 감정 타입 배열
 */
export const emotionTypes = Object.values(EmotionType);

/**
 * 감정 타입으로 데이터 가져오기
 */
export const getEmotionData = (type: EmotionType): EmotionData => {
  return emotions[type];
};

/**
 * 감정 타입 배열 (순서대로)
 */
export const emotionList: EmotionData[] = [
  emotions[EmotionType.Happy],
  emotions[EmotionType.Sad],
  emotions[EmotionType.Angry],
  emotions[EmotionType.Surprise],
  emotions[EmotionType.Etc],
];
