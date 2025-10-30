/**
 * 프로젝트 전체에서 사용되는 색상 상수
 * 일관된 디자인 시스템을 유지하기 위해 이 파일의 색상을 사용하세요.
 */

export const COLORS = {
  // Primary (Blue)
  PRIMARY: '#3b82f6', // 버튼, 링크, 포커스
  PRIMARY_HOVER: '#2563eb',
  PRIMARY_LIGHT: 'rgb(59 130 246 / 10%)', // 포커스 링

  // Error (Red)
  ERROR: '#ef4444', // 에러 상태, 삭제 버튼
  ERROR_HOVER: '#dc2626',
  ERROR_LIGHT: 'rgb(239 68 68 / 10%)', // 포커스 링
  ERROR_BG: '#fee2e2',

  // Success (Green)
  SUCCESS: '#10b981', // 성공 토스트

  // Neutral (Gray)
  GRAY_900: '#1f2937', // 진한 텍스트
  GRAY_800: '#374151', // 일반 텍스트
  GRAY_700: '#4b5563',
  GRAY_600: '#6b7280', // 보조 텍스트
  GRAY_500: '#9ca3af',
  GRAY_400: '#9e9e9e', // 완료된 Todo
  GRAY_300: '#d1d5db', // 테두리
  GRAY_200: '#e5e7eb',
  GRAY_100: '#f3f4f6', // 배경
  GRAY_50: '#f5f7f9', // 연한 배경

  // Special
  WHITE: '#ffffff',
  TOGGLE_BLUE: '#007fff', // BasicToggle
  TOGGLE_BORDER: '#c6cfdc',

  // 중요도 레벨 색상
  IMPORTANCE_HIGH: '#ff5656',
  IMPORTANCE_MEDIUM: '#8a8a8a',
  IMPORTANCE_LOW: '#4e83da',

  // 기타
  OVERLAY: 'rgba(0, 0, 0, 0.5)', // 모달 배경
  SHADOW: 'rgba(0, 0, 0, 0.1)', // 그림자
} as const;

export type ColorKey = keyof typeof COLORS;
