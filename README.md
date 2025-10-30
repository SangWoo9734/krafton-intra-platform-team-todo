# KRAFTON Intra Platform Team - TODO List

## 🚀 실행 방법

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 테스트

```bash
npm run test:unit
```

<br />

## 🛠️ 기술 스택

- **프레임워크**: Vue 3.5+ (Composition API 활용, `<script setup>`)
- **언어**: TypeScript
- **빌드 도구**: Vite
- **테스팅**: Vitest
- **린팅**: ESLint + Prettier
- **스타일**: SCSS

<br/>

## 📋 요구사항

### 기본 기능

- ✅ **TODO 등록**: 제목, 내용, 우선순위, 마감기한을 입력하여 새로운 TODO 추가
- ✅ **TODO 목록 조회**: 작성된 모든 TODO 목록 확인
- ✅ **TODO 수정**: 제목, 내용, 우선순위, 마감기한 편집
- ✅ **TODO 삭제**: 항목 삭제
- ✅ **마감 기한 설정**: 사용자 선택에 따라 마감일 추가
- ✅ **우선순위 설정**: TODO의 우선순위(높음/보통/낮음)를 설정 및 조정
- ✅ **완료 처리**: TODO 항목을 완료 상태로 변경

### 데이터 영구 저장

- LocalStorage를 활용하여 TODO 데이터가 새로고침 후에도 유지되도록 구현

<br />

## ✨ 구현 기능

**공통 컴포넌트**

- 기본 컴포넌트 (`common/basic/`)
  - `BasicButton` - 재사용 가능한 버튼 컴포넌트
  - `BasicChip` - 우선순위, 마감일 표시 칩 컴포넌트
  - `BasicToggle` - 완료/미완료 토글 컴포넌트
  - `BasicLayout` - 페이지 레이아웃 컴포넌트
- 폼 컴포넌트 (`common/form/`)
  - `DynamicForm` - 데이터 기반 동적 폼 생성
  - `FormInput` - 텍스트/텍스트영역 입력
  - `FormSelect` - 선택 입력
  - `FormDatePicker` - 날짜 선택
- 기타 (`common/`)
  - `IconButton` - 아이콘 버튼 컴포넌트
  - `LoadingSpinner` - 로딩 상태 표시 컴포넌트
  - `EmptyState` - 빈 상태 안내 컴포넌트

**Toast 시스템**

- `ToastContainer` - Toast 메시지 컨테이너
- `ToastItem` - 개별 Toast 메시지

**Todo 도메인 컴포넌트**

- `TodoPage` - Todo 목록 페이지
- `TodoItem` - Todo 항목 컴포넌트
- `TodoForm` - Todo 입력 폼 (순수 UI)
- `TodoAddForm` - Todo 추가 폼 컨테이너
- `TodoEditForm` - Todo 수정 폼 컨테이너
- `TodoAddButton` - Todo 추가 버튼

**Composables 로직**

- `useTodos` - Todo CRUD 로직
- `useModal` - 모달 상태 관리
- `useToast` - Toast 메시지 관리

**유틸리티**

- `storage.ts` - LocalStorage 래퍼 함수

<br />

## ✨ 추가 구현 사항

### 사용자 경험 개선

- **로딩 상태 표시**: 데이터 로딩 중 LoadingSpinner 컴포넌트 표시
- **빈 목록 UI**: 할 일이 없을 때 EmptyState 컴포넌트로 안내
- **에러 피드백**: Toast 메시지로 사용자에게 명확한 피드백 제공
- **입력 검증**: 제목과 내용 필수 입력 검증
- **실시간 폼 검증**: 필드별 에러 상태 표시 및 실시간 에러 초기화

### 접근성 (Accessibility)

- **폼 접근성**: label-input 연결 (`for`/`id`), `aria-invalid`, `aria-describedby`
- **모달 접근성**: `role="dialog"`, `aria-modal`, `aria-labelledby`
- **토글 접근성**: `role="checkbox"`, `aria-checked`
- **버튼 접근성**: 아이콘 버튼에 `aria-label`, 확장 버튼에 `aria-expanded`
- **Toast 접근성**: `aria-live`, `role="status"`, `role="alert"`

<br />

## 🏗️ 설계 고려사항

### 단일 책임 원칙 (SRP)

- **TodoForm 분리**: 순수 UI 컴포넌트(`TodoForm`)와 비즈니스 로직 컴포넌트(`TodoAddForm`, `TodoEditForm`) 분리
- 각 컴포넌트가 하나의 명확한 역할만 수행하도록 설계 및 리팩토링

### 컴포넌트 재사용성

- 도메인별 디렉토리 구조 (`common`, `todo`, `toast`)
- 공통 컴포넌트 세분화 (`basic/`, `form/`)로 역할별 명확한 분리
- Props 기반 설정으로 다양한 상황에서 재사용 가능한 컴포넌트 설계

### 데이터 기반 폼 시스템

- **DynamicForm 패턴**: 폼 필드를 데이터로 정의하여 UI 자동 생성
- **FormField 타입**: `{ name, label, type, required, placeholder?, options? }`로 필드 정의
- **자동 Validation**: required 필드를 formFields 배열에서 자동으로 검증
- **확장성**: 새 필드 추가 시 formFields 배열만 수정하면 템플릿/상태/validation 자동 처리
- **컴포넌트 분리**: FormInput, FormSelect, FormDatePicker 등 타입별 입력 컴포넌트

### 명확한 에러 피드백

- Toast 메시지로 사용자에게 명확한 피드백 제공

### 상태 관리

- Composables로 비즈니스 로직 중앙화
- Vue 3 Composition API 활용

### 상수 관리

- **색상 상수** (`constants/colors.ts`): 일관된 디자인 시스템 유지
- **Todo 상수** (`constants/todo.ts`): 폼 필드, 중요도 옵션, 레이블 등 중앙 관리
- 유지보수성 향상 및 향후 다국어 지원 준비

<br />

## 📂 프로젝트 구조

```
src/
├── apis/              # API 통신 로직 (LocalStorage 기반)
├── components/        # 컴포넌트 (도메인별 구조)
│   ├── common/        # 공통 컴포넌트
│   │   ├── basic/     # 기본 UI 컴포넌트 (Button, Chip, Toggle, Layout)
│   │   ├── form/      # 폼 관련 컴포넌트 (DynamicForm, Input, Select, DatePicker)
│   │   └── ...        # 기타 공통 컴포넌트 (IconButton, LoadingSpinner, EmptyState)
│   ├── todo/          # Todo 도메인 컴포넌트
│   └── toast/         # Toast 시스템
├── composables/       # Composition API 비즈니스 로직
├── constants/         # 상수 정의 (colors, todo 등)
├── types/             # TypeScript 타입 정의
├── utils/             # 유틸리티 함수
├── App.vue            # 루트 컴포넌트
└── main.ts            # 애플리케이션 엔트리
```

<br/>

## 🔍 참고 문서

- **AI 활용**: `ai-notes.md` 참고 (링크)
- **프로젝트 규칙**: `CLAUDE.md` 참고 (링크)
