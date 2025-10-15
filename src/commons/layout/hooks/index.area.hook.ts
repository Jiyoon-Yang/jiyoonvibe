"use client";

import { usePathname } from "next/navigation";
import { getPageMetadata } from "@/commons/constants/url";

/**
 * Layout 영역 노출 여부를 관리하는 Hook
 *
 * url.ts의 페이지 메타데이터를 기반으로 각 Layout 영역의
 * 노출 여부를 결정합니다. 페이지 경로에 따라 header, banner,
 * navigation, footer 영역을 동적으로 표시하거나 숨깁니다.
 *
 * @returns {Object} 각 영역의 노출 여부
 * - showHeader: header 영역 전체 노출 여부
 * - showLogo: header 내 logo 노출 여부
 * - showBanner: banner 영역 노출 여부
 * - showNavigation: navigation 영역 노출 여부
 * - showFooter: footer 영역 노출 여부
 *
 * @example
 * ```tsx
 * const {
 *   showHeader,
 *   showBanner,
 *   showNavigation,
 *   showFooter
 * } = useAreaVisibility();
 *
 * return (
 *   <>
 *     {showHeader && <header>...</header>}
 *     {showBanner && <div>...</div>}
 *   </>
 * );
 * ```
 */
export const useAreaVisibility = () => {
  const pathname = usePathname();

  // 현재 경로의 메타데이터 가져오기
  const metadata = getPageMetadata(pathname);

  // 기본값 (메타데이터가 없는 경우 모든 영역 노출)
  const defaultLayout = {
    header: { visible: true, logo: true, darkModeToggle: false },
    banner: true,
    navigation: true,
    footer: true,
  };

  const layout = metadata?.layout ?? defaultLayout;

  return {
    showHeader: layout.header.visible,
    showLogo: layout.header.logo,
    showBanner: layout.banner,
    showNavigation: layout.navigation,
    showFooter: layout.footer,
  };
};
