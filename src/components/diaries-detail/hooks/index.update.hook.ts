"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EmotionType } from "@/commons/constants/enum";

// 수정 폼 스키마 정의
const updateFormSchema = z.object({
  emotion: z.nativeEnum(EmotionType, {
    message: "감정을 선택해주세요.",
  }),
  title: z
    .string()
    .min(1, "제목을 입력해주세요.")
    .max(100, "제목은 100자 이하로 입력해주세요."),
  content: z
    .string()
    .min(1, "내용을 입력해주세요.")
    .max(1000, "내용은 1000자 이하로 입력해주세요."),
});

export type UpdateFormData = z.infer<typeof updateFormSchema>;

interface Diary {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

export function useUpdateForm(diaryId: number) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // react-hook-form 설정
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateFormSchema),
    mode: "onChange",
    defaultValues: {
      emotion: EmotionType.Happy,
      title: "",
      content: "",
    },
  });

  // 수정 모드 시작
  const startEdit = (diary: Diary) => {
    setValue("emotion", diary.emotion);
    setValue("title", diary.title);
    setValue("content", diary.content);
    setIsEditing(true);
  };

  // 수정 취소
  const cancelEdit = () => {
    setIsEditing(false);
    reset();
  };

  // 수정 완료
  const submitUpdate = async (data: UpdateFormData) => {
    setIsSubmitting(true);

    try {
      // 로컬스토리지에서 일기 데이터 가져오기
      const diariesData = localStorage.getItem("diaries");
      if (!diariesData) {
        throw new Error("일기 데이터를 찾을 수 없습니다.");
      }

      const diaries: Diary[] = JSON.parse(diariesData);
      const diaryIndex = diaries.findIndex((diary) => diary.id === diaryId);

      if (diaryIndex === -1) {
        throw new Error("수정할 일기를 찾을 수 없습니다.");
      }

      // 일기 데이터 업데이트
      const updatedDiary = {
        ...diaries[diaryIndex],
        emotion: data.emotion,
        title: data.title,
        content: data.content,
      };

      diaries[diaryIndex] = updatedDiary;
      localStorage.setItem("diaries", JSON.stringify(diaries));

      // 커스텀 이벤트 발생시켜 다른 컴포넌트에 알림
      window.dispatchEvent(
        new CustomEvent("diaryUpdated", {
          detail: { diaryId, updatedDiary },
        })
      );

      // 수정 모드 종료
      setIsEditing(false);
      reset();

      // 성공 알림
      alert("일기가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("일기 수정 중 오류가 발생했습니다:", error);
      alert("일기 수정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isEditing,
    isSubmitting,
    control,
    handleSubmit,
    formState: { errors, isValid },
    startEdit,
    cancelEdit,
    submitUpdate,
    watch,
  };
}
