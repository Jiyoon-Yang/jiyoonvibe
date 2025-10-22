"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { URL_PATHS } from "@/commons/constants/url";

/**
 * 사용자 정보 타입
 */
interface User {
  id: string;
  email?: string;
  name?: string;
}

/**
 * Auth Context 타입 정의
 * 인증 관련 상태 및 메서드를 제공
 */
interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  getUser: () => User | null;
}

/**
 * Auth Context 생성
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Context를 사용하기 위한 Custom Hook
 *
 * @returns {AuthContextType} 인증 상태 및 메서드
 * @throws {Error} AuthProvider 외부에서 사용 시 에러 발생
 *
 * @example
 * ```tsx
 * const { isLoggedIn, user, login, logout } = useAuth();
 *
 * if (isLoggedIn) {
 *   console.log('로그인 상태:', user);
 * }
 * ```
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

/**
 * AuthProvider Props 타입
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * 인증 상태 관리 Provider
 *
 * 로컬스토리지 기반 인증 상태를 관리하며, 다음 기능을 제공합니다:
 * - 로그인/로그아웃
 * - 로그인 상태 검증 (accessToken 기반)
 * - 로그인 유저 정보 조회
 * - 실시간 인증 상태 감지 (storage event)
 *
 * @param {AuthProviderProps} props - children 컴포넌트
 * @returns {JSX.Element} Auth Context Provider
 *
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  /**
   * 로컬스토리지에서 인증 상태를 확인하는 함수
   * accessToken 유무로 로그인 상태를 판단하고,
   * user 정보를 가져옵니다.
   */
  const checkAuthStatus = useCallback(() => {
    if (typeof window === "undefined") return;

    const accessToken = localStorage.getItem("accessToken");
    const userStr = localStorage.getItem("user");

    setIsLoggedIn(!!accessToken);

    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  /**
   * 컴포넌트 마운트 시 인증 상태 확인
   */
  useEffect(() => {
    setIsMounted(true);
    checkAuthStatus();
  }, [checkAuthStatus]);

  /**
   * 로컬스토리지 변경을 실시간으로 감지
   * - storage 이벤트: 다른 탭에서의 변경 감지
   * - localStorageChange 이벤트: 같은 탭에서의 변경 감지
   */
  useEffect(() => {
    if (!isMounted) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "accessToken" || e.key === "user") {
        checkAuthStatus();
      }
    };

    const handleCustomStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "localStorageChange",
        handleCustomStorageChange
      );
    };
  }, [isMounted, checkAuthStatus]);

  /**
   * 로그인 페이지로 이동
   */
  const login = useCallback(() => {
    router.push(URL_PATHS.AUTH.LOGIN);
  }, [router]);

  /**
   * 로그아웃 처리
   * - localStorage에서 accessToken 제거
   * - localStorage에서 user 제거
   * - 로그인 페이지로 이동
   */
  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("localStorageChange"));

    setIsLoggedIn(false);
    setUser(null);
    router.push(URL_PATHS.AUTH.LOGIN);
  }, [router]);

  /**
   * 로그인 유저 정보 조회
   *
   * @returns {User | null} 현재 로그인된 사용자 정보
   */
  const getUser = useCallback(() => {
    return user;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        getUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
