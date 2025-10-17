"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EmotionType } from "@/commons/constants/enum";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { Modal } from "@/commons/components/modal";
import { useRouter } from "next/navigation";
import { URL_PATHS } from "@/commons/constants/url";
import { Diary } from "@/commons/types/diary";

/**
 * 일기 폼 데이터 검증 스키마
 */
const diaryFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해 주세요."),
  content: z.string().min(1, "내용을 입력해 주세요."),
  emotion: z.nativeEnum(EmotionType),
});

/**
 * 일기 폼 데이터 타입
 */
type DiaryFormData = z.infer<typeof diaryFormSchema>;

/**
 * 일기 폼 훅의 반환 타입
 */
export interface UseDiaryFormReturn {
  /**
   * 폼 제출 핸들러
   */
  handleSubmit: () => void;

  /**
   * 폼 필드 값을 설정하는 함수
   */
  setValue: (
    name: "title" | "content" | "emotion",
    value: string | EmotionType
  ) => void;
}

/**
 * 일기 작성 폼을 관리하는 커스텀 훅
 *
 * react-hook-form과 zod를 사용하여 일기 작성 폼의 유효성 검증,
 * 제출 처리, 로컬스토리지 저장을 담당합니다.
 *
 * @example
 * ```tsx
 * const { handleSubmit, setValue } = useDiaryForm();
 *
 * // 폼 필드 값 설정
 * setValue("title", "오늘의 일기");
 * setValue("emotion", EmotionType.Happy);
 *
 * // 폼 제출
 * <Button onClick={handleSubmit}>등록하기</Button>
 * ```
 *
 * @returns 일기 폼 제어 함수들
 */
export const useDiaryForm = (): UseDiaryFormReturn => {
  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const { handleSubmit, setValue } = useForm<DiaryFormData>({
    resolver: zodResolver(diaryFormSchema),
    mode: "onChange",
  });

  /**
   * 폼 제출 핸들러
   * 일기 데이터를 로컬스토리지에 저장하고 등록완료 모달을 표시합니다.
   *
   * @param data - 검증된 일기 폼 데이터
   */
  const onSubmit = (data: DiaryFormData) => {
    try {
      // 로컬스토리지 사용 가능 여부 확인
      if (typeof window === "undefined" || !window.localStorage) {
        throw new Error("로컬스토리지를 사용할 수 없습니다.");
      }

      // 로컬스토리지에서 기존 데이터 가져오기
      const existingDiariesStr = localStorage.getItem("diaries");
      const existingDiaries: Diary[] = existingDiariesStr
        ? JSON.parse(existingDiariesStr)
        : [];

      // 새 일기 ID 계산
      const newId =
        existingDiaries.length > 0
          ? Math.max(...existingDiaries.map((d) => d.id)) + 1
          : 1;

      // 새 일기 생성
      const newDiary: Diary = {
        id: newId,
        title: data.title,
        content: data.content,
        emotion: data.emotion,
        createdAt: new Date().toISOString(),
      };

      // 로컬스토리지에 저장
      const updatedDiaries = [...existingDiaries, newDiary];
      localStorage.setItem("diaries", JSON.stringify(updatedDiaries));

      // 등록완료 모달 열기
      openModal(
        <Modal
          variant="info"
          actions="single"
          title="일기 등록 완료"
          description="등록이 완료 되었습니다."
          primaryAction={{
            label: "확인",
            onClick: () => {
              closeModal();
              // 상세페이지로 이동
              router.push(URL_PATHS.DIARIES.DETAIL(newId));
            },
          }}
        />
      );
    } catch (error) {
      console.error("일기 등록 중 오류가 발생했습니다:", error);

      // 에러 모달 표시
      openModal(
        <Modal
          variant="danger"
          actions="single"
          title="등록 실패"
          description="일기 등록 중 오류가 발생했습니다. 다시 시도해 주세요."
          primaryAction={{
            label: "확인",
            onClick: () => {
              closeModal();
            },
          }}
        />
      );
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    setValue,
  };
};
