"use client";

import React, { ReactNode, useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth.provider";
import { useModal } from "../modal/modal.provider";
import { getPageMetadata, URL_PATHS } from "@/commons/constants/url";
import Modal from "@/commons/components/modal";

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * 권한 검증 Guard 컴포넌트
 *
 * 페이지 접근 권한을 검증하고, 비인가 사용자에게 로그인 모달을 표시합니다.
 *
 * 동작 방식:
 * 1. 페이지 로드 시 빈 화면을 먼저 보여줌
 * 2. AuthProvider 초기화 완료 후 인가 검증 시작
 * 3. 인가 성공 시 children 렌더링
 * 4. 인가 실패 시 로그인 모달 표시 및 빈 화면 유지
 *
 * 테스트 환경:
 * - NEXT_PUBLIC_TEST_ENV=test 일 때 모든 페이지 접근 가능 (로그인 유저로 간주)
 * - 실제 환경에서는 accessType에 따라 권한 검증
 */
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { openModal, closeModal } = useModal();

  // 인가 완료 여부
  const [isAuthorized, setIsAuthorized] = useState(false);
  // AuthProvider 초기화 완료 여부 (hydration 대기)
  const [isAuthReady, setIsAuthReady] = useState(false);
  // 모달 표시 여부 (한 번만 보여주기 위한 플래그)
  const modalShownRef = useRef(false);

  // AuthProvider 초기화 대기 (hydration 완료 대기)
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== "undefined") {
      // 다음 틱에서 초기화 완료로 설정 (AuthProvider의 초기 상태 업데이트 대기)
      const timer = setTimeout(() => {
        setIsAuthReady(true);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, []);

  // 페이지 권한 검증
  useEffect(() => {
    // AuthProvider 초기화가 완료될 때까지 대기
    if (!isAuthReady) {
      return;
    }

    // 모달 표시 플래그 초기화 (경로 변경 시)
    modalShownRef.current = false;

    // 테스트 환경에서는 항상 로그인 유저로 간주 (모든 페이지 접근 가능)
    const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === "test";
    if (isTestEnv) {
      setIsAuthorized(true);
      return;
    }

    // 현재 페이지의 메타데이터 가져오기
    const pageMetadata = getPageMetadata(pathname);

    // 메타데이터가 없는 경우 접근 허용 (정의되지 않은 페이지)
    if (!pageMetadata) {
      setIsAuthorized(true);
      return;
    }

    // 접근 권한 검증
    const { accessType } = pageMetadata;

    // anyone: 누구나 접근 가능
    if (accessType === "anyone") {
      setIsAuthorized(true);
      return;
    }

    // memberOnly: 로그인 사용자만 접근 가능
    if (accessType === "memberOnly") {
      if (isLoggedIn) {
        // 로그인 상태면 접근 허용
        setIsAuthorized(true);
      } else {
        // 비로그인 상태면 접근 거부 및 모달 표시
        setIsAuthorized(false);

        // 모달이 이미 표시되었으면 중복 표시 방지
        if (!modalShownRef.current) {
          modalShownRef.current = true;

          // 로그인 요청 모달 표시
          openModal(
            <Modal
              variant="info"
              actions="single"
              title="로그인이 필요합니다"
              description="이 페이지는 로그인 후 이용하실 수 있습니다."
              primaryAction={{
                label: "확인",
                onClick: () => {
                  // 모든 모달 닫기
                  closeModal();
                  // 로그인 페이지로 이동
                  router.push(URL_PATHS.AUTH.LOGIN);
                },
              }}
            />
          );
        }
      }
    }
  }, [pathname, isLoggedIn, isAuthReady, openModal, closeModal, router]);

  // AuthProvider 초기화 대기 중이거나 권한 검증 실패 시 빈 화면 표시
  if (!isAuthReady || !isAuthorized) {
    return null;
  }

  // 권한 검증 성공 시 children 렌더링
  return <>{children}</>;
};

export default AuthGuard;
