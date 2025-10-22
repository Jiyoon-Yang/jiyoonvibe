"use client";

import React, { ReactNode, useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth.provider";
import { useModal } from "../modal/modal.provider";
import { Modal } from "@/commons/components/modal";
import { getPageMetadata, URL_PATHS } from "@/commons/constants/url";

/**
 * AuthGuard Props 타입
 */
interface AuthGuardProps {
  children: ReactNode;
}

/**
 * 인증 가드 컴포넌트
 *
 * 페이지 접근 권한을 검증하고, 권한이 없는 경우 로그인 유도 모달을 표시합니다.
 *
 * 주요 기능:
 * - memberOnly 페이지: 로그인 필수
 * - anyone 페이지: 로그인 불필요
 * - 테스트 환경: 모든 페이지 접근 가능 (NEXT_PUBLIC_TEST_ENV=test)
 * - 권한 없을 시 빈 화면 표시 및 로그인 유도 모달 노출
 *
 * @param {AuthGuardProps} props - children 컴포넌트
 * @returns {JSX.Element} Auth Guard Provider
 *
 * @example
 * ```tsx
 * <AuthGuard>
 *   <YourApp />
 * </AuthGuard>
 * ```
 */
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { openModal, closeModal } = useModal();

  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const hasShownModalRef = useRef(false);

  /**
   * AuthProvider 초기화 대기
   * 클라이언트 사이드에서만 실행되며, 다음 틱에서 초기화 완료로 설정하여
   * AuthProvider가 먼저 마운트되도록 보장합니다.
   */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        setIsInitialized(true);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, []);

  /**
   * 페이지 접근 권한 검증
   * - 테스트 환경에서는 모든 페이지 접근 허용
   * - url.ts의 메타데이터 기반으로 권한 검증
   * - memberOnly 페이지에서 비로그인 시 모달 표시
   */
  useEffect(() => {
    if (!isInitialized) return;

    const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === "test";
    if (isTestEnv) {
      setIsAuthorized(true);
      return;
    }

    const metadata = getPageMetadata(pathname);

    if (!metadata) {
      setIsAuthorized(true);
      return;
    }

    if (metadata.accessType === "anyone") {
      setIsAuthorized(true);
      hasShownModalRef.current = false;
      return;
    }

    if (metadata.accessType === "memberOnly") {
      if (isLoggedIn) {
        setIsAuthorized(true);
        hasShownModalRef.current = false;
      } else {
        // 초기 렌더 시점에 AuthProvider가 아직 로그인 상태를 반영하기 전일 수 있으므로,
        // localStorage의 accessToken을 확인하여 보정한다.
        const accessToken =
          typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : null;

        if (accessToken) {
          setIsAuthorized(true);
          hasShownModalRef.current = false;
          return;
        }

        setIsAuthorized(false);

        if (!hasShownModalRef.current) {
          openModal(
            <Modal
              variant="info"
              actions="single"
              title="로그인해주세요"
              description="회원 전용 페이지입니다. 로그인 후 이용해주세요."
              primaryAction={{
                label: "확인",
                onClick: () => {
                  closeModal();
                  router.push(URL_PATHS.AUTH.LOGIN);
                },
              }}
            />
          );
          hasShownModalRef.current = true;
        }
      }
    } else {
      setIsAuthorized(true);
    }
  }, [isInitialized, pathname, isLoggedIn, openModal, closeModal, router]);

  if (!isInitialized || !isAuthorized) {
    return <div style={{ minHeight: "100vh" }} />;
  }

  return <>{children}</>;
};
