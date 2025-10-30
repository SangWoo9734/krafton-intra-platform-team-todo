import type { FormField } from '@/types/form';

/**
 * Todo 관련 상수
 */

// 중요도 레벨
export const IMPORTANCE_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

export type ImportanceLevel =
  (typeof IMPORTANCE_LEVELS)[keyof typeof IMPORTANCE_LEVELS];

// 중요도 선택 옵션
export const IMPORTANCE_OPTIONS = [
  { label: '높음', value: IMPORTANCE_LEVELS.HIGH },
  { label: '보통', value: IMPORTANCE_LEVELS.MEDIUM },
  { label: '낮음', value: IMPORTANCE_LEVELS.LOW },
] as const;

// Todo ID 접두사
export const TODO_ID_PREFIX = 'td-';

// Todo 폼 필드 설정
export const TODO_FORM_FIELDS: Omit<FormField, 'invalid' | 'message'>[] = [
  {
    name: 'title',
    label: '제목',
    type: 'text',
    required: true,
    placeholder: 'Todo 제목을 입력하세요',
  },
  {
    name: 'content',
    label: '내용',
    type: 'textarea',
    required: true,
    placeholder: 'Todo 내용을 입력하세요',
  },
  {
    name: 'importantLabel',
    label: '중요도',
    type: 'select',
    required: false,
    options: IMPORTANCE_OPTIONS,
  },
  {
    name: 'deadlineString',
    label: '마감기한',
    type: 'date',
    required: false,
  },
];

// Todo 아이템 레이블
export const TODO_ITEM_LABELS = {
  CONTENT: '내용',
  UPDATED: '수정',
  CREATED: '생성',
} as const;

// 기본 중요도
export const DEFAULT_IMPORTANCE = IMPORTANCE_LEVELS.MEDIUM;
