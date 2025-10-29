# 과제간 AI 활용 방식

## 🛠️ 사용한 AI/도구

- **Claude (Anthropic)**: 아키텍처 설계 자문, 리팩토링 전략 논의

<br />

## 🛠️ 주요 활용 방식

### 1. 디렉토리 구조 설계 논의

**상황**: 컴포넌트가 증가하면서 `Component` 디렉토리 구조가 체계적이지 않음

**프롬프트**:

> "컴포넌트 디렉토리를 나눈 기준이 기능 중심인지 도메인 중심인지 궁금하다. TodoFormModal의 위치를 예로 들어, 구조 개선 방안을 제시해달라"

**AI 제안**:

- 기능 중심 vs 도메인 중심 구조의 장단점 비교

**직접 결정 및 구현**:

- 도메인 중심 구조 채택
- components/common (범용 UI), components/todo (Todo 도메인), components/toast (Toast 시스템)로 분리
- 모든 컴포넌트 파일 이동 및 import 경로 수정

<br />

### 2. 단일 책임 원칙 적용

**상황**: TodoFormModal이 추가/수정 두 가지 역할을 수행하여 내부 분기 로직 복잡

**프롬프트**:

> "TodoFormModal이 추가와 수정 두 가지 역할을 한다. 내부 분기 로직을 제거하고 컴포넌트별로 하나의 명확한 역할을 갖도록 리팩토링하고 싶다"

**AI 제안**:

- 옵션 1: 컴포넌트 완전 분리 (TodoAddModal, TodoEditModal)
- 옵션 2: 공통 UI와 비즈니스 로직 분리 (TodoForm + Container)
- 옵션 3: Props로 mode 명시

**내 제안 및 최종 구현**:

- TodoForm(공통 UI)이 props로 initialData를 받도록 설계
- TodoAddForm: 빈 값을 전달, addTodo 호출
- TodoEditForm: 기존 todo 데이터 전달, updateTodo 호출
- 내부 if (modalData) 분기 로직 완전 제거

**구현 결과**:

```
TodoForm.vue         - 순수 폼 UI (initialData, modalTitle, submitLabel props)
TodoAddForm.vue      - TodoForm을 감싸서 빈 값 + addTodo 로직
TodoEditForm.vue     - TodoForm을 감싸서 todo 데이터 + updateTodo 로직
```

### 3. 모달 타입 명시적 구분

**상황**: useModal에서 modalData 유무로 암묵적 판단

**프롬프트**:

> "modalData가 있으면 Edit, 없으면 Add로 판단하는 암묵적 로직 대신, 모달 타입을 명시적으로 구분할 수 있는 방법이 있을까?"

**AI 제안**:

- useModal에 modalType 상태 추가
- openModal(type, data?) 시그니처로 변경

**직접 구현**:

- useModal.ts에 modalType: ref<string | null> 추가
- openModal('add') / openModal('edit', todo) 형태로 호출
- 각 Form에서 modalType 확인하여 조건부 렌더링

### 4. 불필요한 추상화 제거

**상황**: ModalContainer가 TodoFormModal을 렌더링만 함

**프롬프트**:

> "ModalContainer 로직을 범용성있게 만들까 고민중인데, 지금 단계에서 확장성을 고려할 필요가 있을까?"

**AI 제안**:

- 옵션 1: Slot 기반으로 변경
- 옵션 2: 동적 컴포넌트 등록 시스템
- 옵션 3: 완전히 제거 (YAGNI 원칙)

**직접 결정**:

- YAGNI(You Aren't Gonna Need It) 원칙 적용
- ModalContainer 완전 제거
- TodoFormModal을 TodoPage에 직접 배치
- 현재 요구사항에 맞는 단순한 구조 선택

### 5. 프로젝트 규칙 수립 (CLAUDE.md)

**상황**: AI와 협업 시 일관된 코드 품질 유지 필요

**작성 내용**:

- **코드 컨벤션**: any 타입 금지, 절대 경로 import 사용
- **커밋 메시지 규칙**: feat, refactor, remove 등 prefix 사용, 본문/author 제외
- **개발 명령어**: 테스트, 빌드, 린트 등 표준화
- **프로젝트 아키텍처**: 디렉토리 구조, 기술 스택 명시

**효과**:

- AI가 프로젝트 규칙을 이해하고 일관된 제안 제공
- 커밋 메시지, 코드 스타일이 자동으로 프로젝트 규칙 준수
- 불필요한 주석이나 any 타입 사용을 AI가 자동으로 회피

### 6. CodeRabbit 코드 리뷰 피드백 반영

**상황**: PR을 통한 자동 코드 리뷰로 발견하지 못한 개선 사항 확인

**발견 및 수정 내역**:

- storage.ts 에러 핸들링에 console.error 추가
- v-if 구문 최적화
- 불필요한 Props 제거
- null 병합 연산자(??) vs OR 연산자(||) 사용 개선

<br />

## AI 생성 코드 반영 범위

- 아키텍처 설계 방향 논의
- 여러 구현 옵션 비교 및 Trade-off 검토
- 디자인 패턴 및 원칙 적용 방법 제안
- Vue 3 Composition API 문법 및 구현 방식에 대해 AI 자문 활용

## 직접 수정·검증한 내용

### 1. 아키텍처 결정

- AI의 여러 옵션 중 프로젝트에 맞는 방향 선택
- Trade-off 고려 (확장성 vs 단순성, 추상화 vs 명확성)
- YAGNI, KISS, SRP 원칙 적용 여부 판단

### 2. 타입 안정성

- TypeScript strict 모드에서 모든 타입 검증
- Props interface 설계 및 타입 충돌 해결
- any 타입 사용 금지 준수

### 3. 코드 품질

- ESLint 규칙 준수 확인
- 불필요한 주석 제거
- 네이밍 일관성 유지
- 절대 경로 import 일관성

### 4. Git 관리

- 의미 있는 단위로 커밋 분리
- Conventional Commits 메시지 규칙 적용
- Task별 커밋 분리 (디렉토리 구조화, Toast duration, 폼 리팩토링 등)
