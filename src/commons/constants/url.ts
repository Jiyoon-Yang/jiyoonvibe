/**
 * URL 경로 및 페이지 메타데이터 관리
 * 다이나믹 라우팅을 지원하며, 각 페이지의 접근 권한 및 UI 노출 설정을 포함
 */

// 접근 권한 타입
export type AccessType = "anyone" | "memberOnly";

// 페이지 레이아웃 노출 설정 타입
export interface PageLayout {
  header: {
    visible: boolean;
    logo: boolean;
    darkModeToggle: boolean;
  };
  headerGap: boolean;
  banner: boolean;
  navigation: boolean;
  footer: boolean;
}

// 페이지 메타데이터 타입
export interface PageMetadata {
  path: string;
  accessType: AccessType;
  layout: PageLayout;
}

// URL 경로 상수
export const URL_PATHS = {
  // 인증 관련
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
  },
  // 일기 관련
  DIARIES: {
    LIST: "/diaries",
    DETAIL: (id: string | number) => `/diaries/${id}`,
    DETAIL_TEMPLATE: "/diaries/[id]", // 라우팅 템플릿
  },
  // 사진 관련
  PICTURES: {
    LIST: "/pictures",
  },
} as const;

// 페이지 메타데이터 설정
export const PAGE_METADATA: Record<string, PageMetadata> = {
  // 로그인
  [URL_PATHS.AUTH.LOGIN]: {
    path: URL_PATHS.AUTH.LOGIN,
    accessType: "anyone",
    layout: {
      header: {
        visible: false,
        logo: false,
        darkModeToggle: false,
      },
      headerGap: false,
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  // 회원가입
  [URL_PATHS.AUTH.SIGNUP]: {
    path: URL_PATHS.AUTH.SIGNUP,
    accessType: "anyone",
    layout: {
      header: {
        visible: false,
        logo: false,
        darkModeToggle: false,
      },
      headerGap: false,
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  // 일기목록
  [URL_PATHS.DIARIES.LIST]: {
    path: URL_PATHS.DIARIES.LIST,
    accessType: "anyone",
    layout: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      headerGap: true,
      banner: true,
      navigation: true,
      footer: true,
    },
  },
  // 일기상세
  [URL_PATHS.DIARIES.DETAIL_TEMPLATE]: {
    path: URL_PATHS.DIARIES.DETAIL_TEMPLATE,
    accessType: "memberOnly",
    layout: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      headerGap: false,
      banner: false,
      navigation: false,
      footer: true,
    },
  },
  // 사진목록
  [URL_PATHS.PICTURES.LIST]: {
    path: URL_PATHS.PICTURES.LIST,
    accessType: "anyone",
    layout: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      headerGap: true,
      banner: true,
      navigation: true,
      footer: true,
    },
  },
};

/**
 * 현재 경로에 대한 메타데이터를 반환
 * 다이나믹 라우팅 경로의 경우 템플릿으로 매칭
 */
export const getPageMetadata = (pathname: string): PageMetadata | undefined => {
  // 정확히 일치하는 경로 찾기
  if (PAGE_METADATA[pathname]) {
    return PAGE_METADATA[pathname];
  }

  // 다이나믹 라우팅 경로 매칭
  if (pathname.startsWith("/diaries/") && pathname !== "/diaries") {
    return PAGE_METADATA[URL_PATHS.DIARIES.DETAIL_TEMPLATE];
  }

  return undefined;
};

/**
 * 모든 URL 경로를 평면화한 배열로 반환
 */
export const getAllPaths = (): string[] => {
  return [
    URL_PATHS.AUTH.LOGIN,
    URL_PATHS.AUTH.SIGNUP,
    URL_PATHS.DIARIES.LIST,
    URL_PATHS.DIARIES.DETAIL_TEMPLATE,
    URL_PATHS.PICTURES.LIST,
  ];
};
