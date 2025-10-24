import { useState, useEffect } from "react";
import { useForm, Control, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
 * 회고 폼 데이터 타입
 */
export interface RetrospectFormData {
  content: string;
}

/**
 * 회고쓰기 폼 훅의 반환 타입
 */
export interface UseRetrospectFormReturn {
  /**
   * 폼 제어 객체
   */
  control: Control<RetrospectFormData>;

  /**
   * 폼 핸들러
   */
  handleSubmit: (
    onSubmit: (data: RetrospectFormData) => void
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;

  /**
   * 폼 상태
   */
  formState: {
    isValid: boolean;
    errors: FieldErrors<RetrospectFormData>;
  };

  /**
   * 회고 등록 함수
   */
  onSubmit: (data: RetrospectFormData) => void;

  /**
   * 로컬스토리지에서 로드된 회고 목록
   */
  retrospects: Retrospect[];

  /**
   * 회고 등록 후 페이지 새로고침 함수
   */
  refreshPage: () => void;
}

/**
 * 회고 폼 검증 스키마
 */
const retrospectFormSchema = z.object({
  content: z
    .string()
    .min(1, "회고 내용을 입력해주세요.")
    .max(500, "회고 내용은 500자 이하로 입력해주세요.")
    .trim(),
});

/**
 * 회고쓰기 폼 등록을 위한 커스텀 훅
 *
 * react-hook-form과 zod를 사용하여 회고 폼을 관리하고,
 * 로컬스토리지에 회고 데이터를 저장/로드합니다.
 *
 * @param diaryId - 연결된 일기 ID
 * @returns 폼 제어 객체 및 회고 데이터
 */
export const useRetrospectForm = (diaryId: number): UseRetrospectFormReturn => {
  const [retrospects, setRetrospects] = useState<Retrospect[]>([]);

  // react-hook-form 설정
  const { control, handleSubmit, formState, reset, watch } =
    useForm<RetrospectFormData>({
      resolver: zodResolver(retrospectFormSchema),
      defaultValues: {
        content: "",
      },
      mode: "onChange",
    });

  // 폼 입력값 감시
  const watchedContent = watch("content");

  // 로컬스토리지에서 회고 데이터 로드
  useEffect(() => {
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
   * 회고 등록 처리 함수
   */
  const onSubmit = (data: RetrospectFormData) => {
    try {
      // 기존 회고 데이터 가져오기
      const existingRetrospects = localStorage.getItem("retrospects");
      let retrospectsArray: Retrospect[] = [];

      if (existingRetrospects) {
        retrospectsArray = JSON.parse(existingRetrospects);
      }

      // 새로운 회고 ID 생성 (기존 ID 중 가장 큰 값 + 1)
      const maxId =
        retrospectsArray.length > 0
          ? Math.max(...retrospectsArray.map((r) => r.id))
          : 0;
      const newId = maxId + 1;

      // 새로운 회고 데이터 생성
      const newRetrospect: Retrospect = {
        id: newId,
        content: data.content.trim(),
        diaryId,
        createdAt: new Date().toISOString(),
      };

      // 회고 데이터 추가
      retrospectsArray.push(newRetrospect);

      // 로컬스토리지에 저장
      localStorage.setItem("retrospects", JSON.stringify(retrospectsArray));

      // 폼 초기화
      reset();

      // 페이지 새로고침
      window.location.reload();
    } catch (error) {
      console.error("Failed to save retrospect:", error);
    }
  };

  /**
   * 페이지 새로고침 함수
   */
  const refreshPage = () => {
    window.location.reload();
  };

  return {
    control,
    handleSubmit,
    formState: {
      isValid: formState.isValid && watchedContent?.trim().length > 0,
      errors: formState.errors,
    },
    onSubmit,
    retrospects,
    refreshPage,
  };
};
