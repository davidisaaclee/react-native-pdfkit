# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native library that wraps Apple PDFKit APIs for iOS and provides PDF viewing functionality. It's built using the React Native Fabric architecture (New Architecture) with Codegen for type-safe native component interfaces.

## Development Commands

### Core Development
- `yarn` - Install dependencies (uses Yarn workspaces)
- `yarn typecheck` - Run TypeScript type checking
- `yarn lint` - Run ESLint (add `--fix` to auto-fix issues)
- `yarn test` - Run Jest unit tests
- `yarn clean` - Clean all build artifacts
- `yarn prepare` - Build the library using react-native-builder-bob

### Example App Development
- `yarn example start` - Start Metro bundler for example app
- `yarn example android` - Run example app on Android
- `yarn example ios` - Run example app on iOS
- `yarn example pod` - Install iOS pods for example app
- `yarn example xed` - Open iOS workspace in Xcode

### Publishing
- `yarn release` - Publish new version using release-it

## Architecture

### React Native Fabric Component
- **Main entry**: `src/index.tsx` - exports PdfkitView component
- **Native spec**: `src/PdfkitViewNativeComponent.ts` - defines Codegen interface with:
  - Native commands: `loadDocumentFromURL`, `setViewport`
  - Events: `onContentOffsetChange` with scroll/zoom data
  - Uses `codegenNativeComponent` and `codegenNativeCommands`

### Native Implementation
- **iOS**: `ios/PdfkitView.{h,mm}` - Objective-C++ implementation using PDFKit framework
- **Android**: `android/src/main/java/com/pdfkit/` - Kotlin implementation (basic View stub)
- **iOS Podspec**: `Pdfkit.podspec` - specifies PDFKit framework dependency

### Build System
- Uses `react-native-builder-bob` for library compilation
- Outputs to `lib/` directory with module and TypeScript definitions
- Yarn workspaces with example app in `example/` directory
- Supports both old and new React Native architectures

## Key Files to Understand

- `package.json` - main library configuration and scripts
- `src/PdfkitViewNativeComponent.ts` - core component interface and commands
- `ios/PdfkitView.mm` - iOS PDFKit integration
- `example/src/App.tsx` - usage demonstration
- `Pdfkit.podspec` - iOS native dependencies

## Development Workflow

1. Make changes to `src/` for JavaScript/TypeScript code
2. For native changes, edit `ios/` or `android/` files
3. Test changes using the example app (`yarn example ios/android`)
4. Native code changes require rebuilding the example app
5. Always run `yarn typecheck` and `yarn lint` before committing
6. Follow conventional commit format (feat/fix/docs/chore/etc.)

## Testing

- Jest configuration in `package.json`
- Tests located in `src/__tests__/`
- Example app serves as integration test
- For Xcode debugging: open `example/ios/PdfkitExample.xcworkspace`
- For Android Studio: open `example/android` directory