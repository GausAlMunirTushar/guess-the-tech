# Guess the Tech

## Software Requirements Specification (SRS)

---

## 1. Introduction

### 1.1 Purpose

This document defines the complete **Software Requirements Specification (SRS)** for the **Guess the Tech** web application. It serves as the single source of truth for design, development, and implementation. The SRS is written to support AI-assisted development workflows (e.g., Qwen CLI AI) as well as human developers.

### 1.2 Product Overview

**Guess the Tech** is a modern, web-based interactive game where users identify technology-related logos (programming languages, frameworks, tools, cloud platforms, companies) within a limited time. The application focuses on learning through play, using clean UI, smooth animations, and progressive difficulty.

### 1.3 Target Audience

- Beginner and intermediate software developers
- Computer science students
- Programming communities
- Technology enthusiasts

### 1.4 Goals and Objectives

- Provide an engaging way to recognize and learn popular technologies
- Deliver a clean, modern, and distraction-free user experience
- Ensure high performance, accessibility, and responsiveness
- Enable scalable architecture for future expansion

---

## 2. Technology Stack

### 2.1 Core Technologies

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** Zustand
- **Animation:** Framer Motion

### 2.2 Architectural Approach

- App Router–based modular routing
- Server Components for static data and layout
- Client Components for interactive gameplay
- API Routes for future multiplayer and leaderboard support

---

## 3. Functional Requirements

### 3.1 User Flow

1. User lands on the home page
2. Selects game mode and difficulty
3. Starts the game after countdown
4. Identifies logos by typing names
5. Receives instant feedback and score updates
6. Views final score and leaderboard

### 3.2 Game Modes

#### 3.2.1 Classic Mode

- Fixed number of lives (default: 3)
- Unlimited questions until lives end
- Score increases for each correct answer

#### 3.2.2 Time Attack Mode

- Fixed duration (e.g., 60 or 90 seconds)
- Unlimited attempts within time limit
- Faster answers yield higher engagement

### 3.3 Difficulty Levels

- **Easy:** Popular and well-known technologies
- **Medium:** Common tools and frameworks
- **Hard:** Advanced, backend, infrastructure, or niche technologies

### 3.4 Gameplay Logic

- Logos appear with visual effects (blur, zoom, partial reveal)
- User input is case-insensitive
- Alias-based matching for flexible answers
- Real-time validation and feedback

### 3.5 Hint System

- Optional hint reveals the first character
- Using a hint reduces achievable score

### 3.6 Leaderboard

- Local leaderboard using browser storage
- Global leaderboard planned for future API integration

---

## 4. Non-Functional Requirements

### 4.1 Performance

- First Contentful Paint under 2 seconds
- Lighthouse performance score above 90
- Optimized SVG logos and assets

### 4.2 Accessibility

- Full keyboard navigation support
- Screen-reader friendly components
- WCAG-compliant contrast ratios

### 4.3 Security

- Input sanitization and validation
- Rate limiting for score submission APIs

### 4.4 Responsiveness

- Mobile-first design
- Seamless experience across mobile, tablet, and desktop

---

## 5. UI / UX Design System

### 5.1 Design Principles

- Minimal and clean interface
- Dark-mode–first experience
- Clear visual hierarchy
- Feedback-driven interactions

### 5.2 Color Palette

| Token        | Value   | Usage             |
| ------------ | ------- | ----------------- |
| Background   | #0B0F19 | App background    |
| Surface      | #111827 | Cards & panels    |
| Primary      | #3B82F6 | Primary actions   |
| Accent       | #22D3EE | Highlights        |
| Success      | #22C55E | Correct answers   |
| Error        | #EF4444 | Incorrect answers |
| Text Primary | #E5E7EB | Main text         |
| Text Muted   | #9CA3AF | Secondary text    |

### 5.3 Typography

- Primary font: **Hind Siliguri**
- Fallback: Inter, system-ui
- Headings: font-semibold to font-bold
- Body text: font-normal

### 5.4 Spacing & Layout

- 4px spacing scale
- Grid-based layouts
- Consistent padding and margins

### 5.5 Border Radius & Shadows

- Cards: rounded-2xl
- Buttons & inputs: rounded-xl
- Soft shadows for elevation

---

## 6. Component System

### 6.1 shadcn/ui Base Components

- Button
- Card
- Dialog
- Input
- Progress
- Tooltip
- Toast

### 6.2 Custom Components

- LogoRevealCard
- GameHeader
- ScoreBoard
- LifeIndicator
- TimerBar

---

## 7. State Management (Zustand)

### 7.1 Game Store

- score
- lives
- currentQuestion
- difficulty
- gameStatus (idle | playing | finished)

### 7.2 Settings Store

- language (en | bn)
- soundEnabled
- animationEnabled

---

## 8. Data Model

### 8.1 Technology Entity

```ts
interface TechItem {
  id: number;
  name: string;
  aliases: string[];
  difficulty: "easy" | "medium" | "hard";
  logo: string; // SVG path
}
```

---

## 9. Routing Structure (Next.js App Router)

```
/app
 ├─ page.tsx              // Home
 ├─ game/page.tsx         // Game screen
 ├─ leaderboard/page.tsx  // Leaderboard
 ├─ settings/page.tsx     // Settings
```

---

## 10. Animations & Interactions

- Logo reveal animations using Framer Motion
- Button hover and tap feedback
- Correct / incorrect answer transitions
- Smooth page transitions

---

## 11. Internationalization (i18n)

- Default language: English
- Secondary language: Bangla
- Language toggle in settings

---

## 12. Error Handling

- Graceful empty state handling
- User-friendly validation messages
- Fallback UI for unexpected errors

---

## 13. Future Enhancements

- Multiplayer real-time mode
- AI-generated logo challenges
- Daily challenges and streaks
- User profiles and achievements

---

## 14. Deployment & DevOps

- Platform: Vercel
- CI/CD: GitHub Actions
- Environment-based configuration

---

## 15. Conclusion

This SRS defines a complete, scalable, and modern foundation for building **Guess the Tech** as a high-quality educational game. The architecture, design system, and requirements are structured to support rapid development using AI-assisted tools while maintaining production-level standards.
