/**
 * 타이포그래피 토큰 상수
 * Figma Foundation 기반으로 생성됨
 *
 * 폰트 사용:
 * - 국문(Korean): Pretendard
 * - 영문/숫자(English/Number): SUIT
 */

// 폰트 패밀리 정의
export const fontFamily = {
  korean:
    "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
  english:
    "'SUIT Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
} as const;

// 폰트 무게 정의
export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

// 타이포그래피 스타일 타입
type TypographyStyle = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
  letterSpacing?: number;
};

// 반응형 타이포그래피 타입
type ResponsiveTypography = {
  mobile: TypographyStyle;
  desktop: TypographyStyle;
};

/**
 * Web Headline (데스크톱 전용)
 */
export const webHeadline = {
  headline01: {
    fontFamily: fontFamily.korean,
    fontSize: 48,
    lineHeight: 60,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0,
  },
  headline02: {
    fontFamily: fontFamily.korean,
    fontSize: 36,
    lineHeight: 48,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0,
  },
  headline03: {
    fontFamily: fontFamily.korean,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0,
  },
} as const;

/**
 * Headline (모바일 & 데스크톱 공통)
 */
export const headline = {
  headline01: {
    fontFamily: fontFamily.korean,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: fontWeight.bold,
    letterSpacing: 0,
  },
  headline02: {
    fontFamily: fontFamily.korean,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: fontWeight.extrabold,
    letterSpacing: 0,
  },
  headline03: {
    fontFamily: fontFamily.korean,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: fontWeight.bold,
    letterSpacing: 0,
  },
} as const;

/**
 * Title
 */
export const title = {
  title01: {
    fontFamily: fontFamily.korean,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: fontWeight.bold,
    letterSpacing: 0,
  },
  title02: {
    fontFamily: fontFamily.korean,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: fontWeight.bold,
    letterSpacing: 0,
  },
  title03: {
    fontFamily: fontFamily.korean,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: fontWeight.bold,
    letterSpacing: 0,
  },
  subtitle01: {
    fontFamily: fontFamily.korean,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0,
  },
  subtitle02: {
    fontFamily: fontFamily.korean,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0,
  },
} as const;

/**
 * Body
 */
export const body = {
  // Medium weight
  body01: {
    fontFamily: fontFamily.korean,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: fontWeight.medium,
    letterSpacing: 0,
  },
  body02_m: {
    fontFamily: fontFamily.korean,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: fontWeight.medium,
    letterSpacing: 0,
  },
  body03: {
    fontFamily: fontFamily.korean,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: fontWeight.medium,
    letterSpacing: 0,
  },
  // Regular weight
  body01_r: {
    fontFamily: fontFamily.korean,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: fontWeight.regular,
    letterSpacing: 0,
  },
  body02_s: {
    fontFamily: fontFamily.korean,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: fontWeight.regular,
    letterSpacing: 0,
  },
  body03_r: {
    fontFamily: fontFamily.korean,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: fontWeight.regular,
    letterSpacing: 0,
  },
} as const;

/**
 * Caption
 */
export const caption = {
  caption01: {
    fontFamily: fontFamily.korean,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0,
  },
  caption02_m: {
    fontFamily: fontFamily.korean,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0,
  },
  caption02_s: {
    fontFamily: fontFamily.korean,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: fontWeight.medium,
    letterSpacing: 0,
  },
  caption03: {
    fontFamily: fontFamily.korean,
    fontSize: 8,
    lineHeight: 10,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0,
  },
} as const;

/**
 * 반응형 타이포그래피
 * 모바일과 데스크톱에서 다른 스타일이 필요한 경우
 */
export const responsive = {
  // 예시: 모바일에서는 headline, 데스크톱에서는 webHeadline 사용
  hero: {
    mobile: headline.headline01,
    desktop: webHeadline.headline01,
  },
  largeTitle: {
    mobile: headline.headline02,
    desktop: webHeadline.headline02,
  },
  mediumTitle: {
    mobile: headline.headline03,
    desktop: webHeadline.headline03,
  },
} as const;

/**
 * 전체 타이포그래피 export
 */
export const typography = {
  fontFamily,
  fontWeight,
  webHeadline,
  headline,
  title,
  body,
  caption,
  responsive,
} as const;

export type Typography = typeof typography;
export type TypographyKey = keyof Typography;

// 유틸리티 함수: 타이포그래피 스타일을 CSS 문자열로 변환
export const getTypographyStyle = (style: TypographyStyle): string => {
  return `
    font-family: ${style.fontFamily};
    font-size: ${style.fontSize}px;
    line-height: ${style.lineHeight}px;
    font-weight: ${style.fontWeight};
    ${
      style.letterSpacing !== undefined
        ? `letter-spacing: ${style.letterSpacing}px;`
        : ""
    }
  `.trim();
};

// 유틸리티 함수: 반응형 타이포그래피 스타일 CSS 생성
export const getResponsiveTypographyStyle = (
  responsive: ResponsiveTypography,
  mobileBreakpoint: string = "768px"
): string => {
  return `
    /* Mobile */
    ${getTypographyStyle(responsive.mobile)}
    
    /* Desktop */
    @media (min-width: ${mobileBreakpoint}) {
      ${getTypographyStyle(responsive.desktop)}
    }
  `.trim();
};
