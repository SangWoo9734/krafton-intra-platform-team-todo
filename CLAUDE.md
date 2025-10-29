# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + TypeScript + Vite project for Krafton's intra-platform team todo application. The project uses modern Vue 3 Composition API with `<script setup>` syntax.

## Node Version Requirements

- Node.js: `^20.19.0` or `>=22.12.0`

## Development Commands

### Setup

```bash
npm install
```

### Development

```bash
npm run dev              # Start dev server with hot-reload
```

### Building

```bash
npm run build            # Type-check + build for production
npm run build-only       # Build without type-checking
npm run type-check       # Run TypeScript type checking only
npm run preview          # Preview production build locally
```

### Testing

```bash
npm run test:unit        # Run all unit tests with Vitest
vitest src/**/__tests__/ComponentName.spec.ts  # Run single test file
```

### Code Quality

```bash
npm run lint             # Run ESLint with auto-fix
npm run format           # Format code with Prettier
```

## Project Architecture

### Tech Stack

- **Framework**: Vue 3.5+ with Composition API
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 7
- **Router**: Vue Router 4
- **Testing**: Vitest + @vue/test-utils + jsdom
- **Linting**: ESLint 9 (flat config) + Prettier
- **Dev Tools**: Vue DevTools plugin enabled

### Key Configuration Files

- **vite.config.ts**: Vite configuration with Vue, JSX, and DevTools plugins. Defines `@` alias pointing to `./src`
- **vitest.config.ts**: Vitest configuration using jsdom environment, excludes e2e tests
- **eslint.config.ts**: ESLint flat config with Vue essential rules, TypeScript support, and Vitest plugin for test files
- **tsconfig.json**: Project references configuration using composite TypeScript projects
- **tsconfig.app.json**: Main app TypeScript config with `@/*` path alias (requires `baseUrl: "."`)
- **tsconfig.node.json**: Config for build tooling files (vite.config.ts, etc.)
- **tsconfig.vitest.json**: Config for test files, extends tsconfig.app.json

### Directory Structure

```
src/
├── router/          # Vue Router configuration
├── __tests__/       # Unit tests (Vitest)
├── App.vue          # Root component
└── main.ts          # Application entry point
```

### IDE Setup

Recommended extensions:

- Vue (Official) - formerly Volar
- Disable Vetur if installed
- Enable Custom Object Formatter in browser DevTools for better Vue debugging

### Important Notes

- **Path Alias**: The `@` alias is configured in both vite.config.ts (runtime) and tsconfig.app.json (TypeScript). When modifying path aliases, update both files.
- **TypeScript**: This project uses TypeScript project references for better performance. The main tsconfig.json references three sub-configs: app, node, and vitest.
- **Vue Components**: All components should use `<script setup lang="ts">` syntax with TypeScript.
- **Test Location**: Unit tests go in `src/**/__tests__/` and automatically get Vitest ESLint rules applied.
- **Type Checking**: The build command runs type-checking in parallel with the build using `npm-run-all2`.

- **NOT USE ANY**: any 타입은 사용하지 않는다.

- **Commit Messag**: 아래 규칙에 맞게 커밋 메세지 헤더를 선택하고, 현재 Changes의 변경점을 관련있는 Task 별로 구분해 커밋 메세지를 작성한다. 커밋 본문과 author를 추가하지 않으며, Commit Message만 작성한다.
  - feat : 새로운 기능 추가
  - fix : 버그 수정
  - docs : 문서, README 작성 및 수정
  - refactor : 코드 리팩토링, 주석 삭제
  - chore : 그 외 기타 수정 (ex. 오타 등)
  - rename : 파일 또는 폴더명을 수정하는 작업일 경우
  - remove : 파일을 삭제하는 작업만 수행한 경우
  - test : 테스트 코드 추가, 삭제
  - move: 코드나 파일을 이동하는 경우

- **Code Convention and Quality** : 아래 규칙을 참
  - 명확하고 이해하기 쉬운 JavaScript 코드 작성
  - 오류 발생 시 사용자에게 명확한 피드백 제공 ( Toast 컴포넌트 활용 )
  - 일관된 네이밍, 코드 스타일, 주석 가이드라인 준수
  - 접근성(Accessibility) 및 사용 편의성 고려
