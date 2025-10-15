"use client";

import { usePathname, useRouter } from "next/navigation";
import { URL_PATHS } from "@/commons/constants/url";

/**
 * Layout 링크 라우팅 훅
 * - 현재 경로를 확인하여 네비게이션 active 상태 관리
 * - 클릭 이벤트를 통한 페이지 이동 처리
 */
export function useLinkRouting() {
  const pathname = usePathname();
  const router = useRouter();

  // 현재 경로가 일기보관함인지 확인
  const isDiariesActive =
    pathname === URL_PATHS.DIARIES.LIST || pathname.startsWith("/diaries/");

  // 현재 경로가 사진보관함인지 확인
  const isPicturesActive = pathname === URL_PATHS.PICTURES.LIST;

  // 로고 클릭 핸들러
  const handleLogoClick = () => {
    router.push(URL_PATHS.DIARIES.LIST);
  };

  // 일기보관함 탭 클릭 핸들러
  const handleDiariesClick = () => {
    router.push(URL_PATHS.DIARIES.LIST);
  };

  // 사진보관함 탭 클릭 핸들러
  const handlePicturesClick = () => {
    router.push(URL_PATHS.PICTURES.LIST);
  };

  return {
    isDiariesActive,
    isPicturesActive,
    handleLogoClick,
    handleDiariesClick,
    handlePicturesClick,
  };
}
