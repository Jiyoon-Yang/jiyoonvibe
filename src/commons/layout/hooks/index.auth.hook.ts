"use client";

import { useAuth } from "@/commons/providers/auth/auth.provider";

/**
 * 사용자 정보 타입
 */
interface User {
  _id?: string;
  id?: string;
  email?: string;
  name?: string;
}

/**
 * useAuthStatus 훅의 반환 타입
 */
export interface UseAuthStatusReturn {
  /**
   * 로그인 여부
   */
  isLoggedIn: boolean;

  /**
   * 현재 로그인된 사용자 정보
   * 비로그인 상태일 경우 null
   */
  user: User | null;

  /**
   * 로그인 페이지로 이동하는 함수
   */
  handleLogin: () => void;

  /**
   * 로그아웃 처리 함수
   * - 로컬스토리지의 인증 정보 제거
   * - 로그인 페이지로 이동
   */
  handleLogout: () => void;
}

/**
 * Layout에서 인증 상태를 관리하는 훅
 *
 * AuthProvider의 기능을 활용하여 로그인 여부 확인, 유저 정보 조회,
 * 로그인/로그아웃 처리를 담당합니다.
 *
 * @returns {UseAuthStatusReturn} 인증 관련 상태 및 메서드
 *
 * @example
 * ```tsx
 * const { isLoggedIn, user, handleLogin, handleLogout } = useAuthStatus();
 *
 * if (isLoggedIn) {
 *   console.log('로그인 유저:', user?.name);
 * }
 * ```
 */
export const useAuthStatus = (): UseAuthStatusReturn => {
  const { isLoggedIn, user, login, logout } = useAuth();

  return {
    isLoggedIn,
    user,
    handleLogin: login,
    handleLogout: logout,
  };
};
