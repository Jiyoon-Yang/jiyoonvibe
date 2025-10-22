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

interface User {
  id: string;
  email?: string;
  name?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  getUser: () => User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // 로컬스토리지에서 인증 상태를 확인하는 함수
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

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    setIsMounted(true);
    checkAuthStatus();
  }, [checkAuthStatus]);

  // 로컬스토리지 변경을 실시간으로 감지
  useEffect(() => {
    if (!isMounted) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "accessToken" || e.key === "user") {
        checkAuthStatus();
      }
    };

    // storage 이벤트 리스너 등록 (다른 탭에서의 변경 감지)
    window.addEventListener("storage", handleStorageChange);

    // 커스텀 이벤트 리스너 등록 (같은 탭에서의 변경 감지)
    const handleCustomStorageChange = () => {
      checkAuthStatus();
    };
    window.addEventListener("localStorageChange", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "localStorageChange",
        handleCustomStorageChange
      );
    };
  }, [isMounted, checkAuthStatus]);

  // 로그인 - 로그인 페이지로 이동
  const login = useCallback(() => {
    router.push(URL_PATHS.AUTH.LOGIN);
  }, [router]);

  // 로그아웃 - accessToken과 user 제거 후 로그인 페이지로 이동
  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    // 커스텀 이벤트 디스패치 (같은 탭에서의 변경 감지용)
    window.dispatchEvent(new Event("localStorageChange"));

    setIsLoggedIn(false);
    setUser(null);
    router.push(URL_PATHS.AUTH.LOGIN);
  }, [router]);

  // 로그인 유저 정보 조회
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
