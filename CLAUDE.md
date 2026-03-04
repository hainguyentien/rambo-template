# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Expo SDK 55 (React Native 0.83) mobile app template using file-based routing (expo-router), New Architecture enabled, TypeScript strict mode. Package manager is **bun**.

## Commands

- `bun start` — Start Expo dev server
- `bun run ios` / `bun run android` / `bun run web` — Platform-specific start
- `bun run lint` — ESLint (runs `expo lint`)
- `bun run test` — Jest in watch mode (`jest --watchAll`)

## Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json). All source imports should use `@/` prefix.

## Architecture

### Routing (`src/app/`)
File-based routing via expo-router with typed routes enabled. Tab navigation lives in `src/app/(tabs)/`.

### Root Layout (`src/app/_layout.tsx`)
Bootstraps the app in this order:
1. Initializes i18n (`initI18n()`)
2. Prevents splash screen auto-hide (hidden after Suspense resolves)
3. Loads Outfit font variants (Light/Regular/Medium/SemiBold/Bold) via `AsyncFont` components inside `<Suspense>`
4. Wraps app in `QueryClientProvider` → `ThemeProvider` (light/dark based on system color scheme)

### Theme System (`src/theme/`) — Unistyles v3
- **Single source of truth:** `react-native-unistyles` v3 manages themes with `adaptiveThemes: true` (auto light/dark)
- **Config:** `src/theme/unistyles.ts` — imported at top of `_layout.tsx` before any component code. Defines `lightTheme`/`darkTheme` with `colors`, `spacing`, `borderRadius`, `fonts`, `fontSize`, and `components.button`
- **Color definitions:** `src/theme/index.ts` exports `lightColors`/`darkColors` and `ColorType`. `src/theme/colors.ts` has the raw palette.
- **Spacing tokens:** `src/theme/spacing.ts` exports `Spacing` type (`number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`) and `resolveSpacing()` utility
- **Accessing theme in components:** Use `const { theme } = useUnistyles()` in components/hooks. Do NOT use `useTheme()` from `@react-navigation/native` for app colors.
- **React Navigation:** `ThemeProvider` receives a minimal theme derived from `UnistylesRuntime.theme` (just enough for nav chrome)
- **Component theming:** `src/theme/button.ts` returns variant styles consumed via `theme.components.button` (from `useUnistyles()`)

### Common Components (`src/components/common/`)
- **Box** — Layout primitive wrapping View/Pressable with shorthand props (Chakra-UI-style: `px`, `py`, `mx`, `my`, `w`, `h`, `rounded`, etc.). Accepts spacing tokens (`'xs'`–`'xxl'`) or raw numbers for margin/padding/gap props. Auto-switches to Pressable when `onPress` is provided.
- **Text** — Themed text using Outfit font family. Props: `weight` (`'light'`/`'regular'`/`'medium'`/`'semibold'`/`'bold'`), `size` (number), `color`, `align`, `underline`. Defaults to `regular` weight and theme's `onBackground` color.
- **Button** — Animated button with variants (`primary`/`secondary`/`tertiary`/`text`/`text-inline`/`custom`), loading spinner, icon support, size options.
- **TextField** — Theme-aware text input with `label`, `error`, `hint`, `left`/`right` ReactNode slots, optional `mask` pattern (e.g. `'(###) ###-####'`), `disabled`, `isOptional`, focus/error border states. Uses `forwardRef` to forward ref to TextInput. Supports `useBottomSheetInput` for bottom-sheet forms. Mask utilities in `src/lib/mask.ts`.

### Data Fetching (`src/lib/react-query.ts`)
React Query with `staleTime: Infinity`, 1hr GC time, 3 retries, no refetch on window focus. HTTP client is axios.

### i18n — Lingui.js (`src/i18n/`)
- **Library:** `@lingui/core` + `@lingui/react` with macro API (`@lingui/babel-plugin-lingui-macro`)
- **Config:** `lingui.config.ts` (project root) — source locale `en`, PO format, catalogs at `src/locales/{locale}/messages`
- **Init:** `src/i18n/config.ts` loads catalogs and activates locale. Called in `_layout.tsx` before render.
- **Provider:** `<I18nProvider i18n={i18n}>` wraps app in `_layout.tsx`
- **Usage in components:** `import { useLingui } from '@lingui/react/macro'` → `const { t } = useLingui()` → `` t`Hello` ``
- **Extraction:** `bun run lingui:extract` scans source for `t` tagged templates and updates `src/locales/en/messages.po`
- **Compilation:** `@lingui/metro-transformer` in `metro.config.js` compiles PO files at bundle time (no manual compile step needed)

### State Management
Zustand for client state, React Query for server state.

## Code Style (ESLint enforced)

- Single quotes, semicolons required
- `@typescript-eslint/consistent-type-imports` — use `import type` for type-only imports
- No inline styles warning (`react-native/no-inline-styles`)
- No raw text outside `<Text>` (`react-native/no-raw-text`)
- No color literals (`react-native/no-color-literals`) — use theme colors
- `prefer-const`, `no-var`, `eqeqeq` (always strict equality)
- Object shorthand required
