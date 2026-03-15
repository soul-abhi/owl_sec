# Project Current State Report

Date: 2026-03-15
Project: owl_sec (Next.js App Router)

## 1) Executive Summary

This project is currently a frontend-first prototype of a social/thought-sharing app branded as BIXBEE.

What is implemented well:

- Route structure with complete page flow for landing, login, signup, forgot-password, dashboard, create-post, and explore.
- Strong visual design and interaction work, especially on landing and dashboard.
- Build and lint pass successfully.

What is not implemented yet:

- Real authentication and session management.
- Persistent database-backed user/post/comment data.
- API routes or server actions for auth and CRUD.
- Post detail route currently linked from Explore.

In short: the app looks and navigates like a product, but business logic and persistence are still mocked in the browser.

## 2) Tech Stack and Configuration

Core framework/runtime:

- Next.js 16.1.6
- React 19.2.3
- TypeScript strict mode
- App Router structure under src/app

UI/Styling:

- Tailwind CSS v4 via PostCSS plugin
- Global custom CSS in src/app/globals.css
- Framer Motion for animation-heavy dashboard transitions

Dependencies indicating future backend plans:

- @prisma/client, prisma
- next-auth
- bcryptjs
- nanoid

Current reality:

- These backend/auth dependencies are installed but not wired to actual app logic yet.

Build/tooling:

- next.config.ts enables reactCompiler
- ESLint with Next core-web-vitals + TypeScript configs
- postinstall runs prisma generate

Environment:

- .env.local contains DATABASE_URL but value is empty

## 3) File and Route Structure Behavior

### Global Layout

- src/app/layout.tsx defines page metadata and loads global fonts (Geist, Geist Mono, Signika).
- Shared NavBar renders across all pages.

### Shared Navbar

- src/components/NavBar.tsx
- Displays logo and Connect button linking to /login.
- No conditional auth-aware rendering (same navbar for logged in and logged out users).

### Landing Page (/)

- src/app/page.tsx
- Client component with:
  - rotating font animation
  - glitch text effect
  - branding message: "Thoughts Not Profile"
- Large inline global style block with keyframes and imported Google fonts.

### Login (/login)

- src/app/login/page.tsx
- Pure client-side mock login.
- Uses hardcoded credentials:
  - User ID: #00AA00
  - Password: Abhi9837@#
- On success, stores user object in localStorage and redirects to /dashboard.
- On failure, shows demo hint in error message.

### Signup (/signup)

- src/app/signup/page.tsx
- Client-side mock account creation:
  - validates password and confirm password
  - generates random user ID (pattern like #12AB34)
  - generates random 6-word recovery phrase
- Shows success state and allows download of recovery phrase as text file.
- Does not persist created account to database or API.

### Forgot Password (/forgot-password)

- src/app/forgot-password/page.tsx
- 3-step UI flow:
  1. enter user id
  2. enter secret phrase
  3. set new password
- Validation is mocked:
  - phrase accepted when length >= 10
- On reset completion, redirects to /login.
- No true credential update in storage/database.

### Dashboard (/dashboard)

- src/app/dashboard/page.tsx
- Client-side gate:
  - if no localStorage user, redirect to /login
- Uses Framer Motion for extensive animated UI sections.
- Allows editing profile description, saved back to localStorage only.
- Contains links to Create Post and Explore.
- Activity stats are static placeholders.

### Create Post (/create-post)

- src/app/create-post/page.tsx
- Client-side gate based on localStorage user.
- Validates non-empty content.
- Simulates post creation with timeout, then redirects to /explore.
- No persistence of post content.

### Explore (/explore)

- src/app/explore/page.tsx
- Client-side gate based on localStorage user.
- Loads hardcoded mock posts via timeout.
- Clicking a post navigates to /post/{id}, but this route does not exist yet.

## 4) Data and Auth State (Important)

Current data model behavior:

- User session state is represented by a localStorage item called "user".
- No server-side validation of auth or role.
- No protected server routes.

Current auth behavior:

- Login is a fixed credential check in client code.
- Signup does not create a real account.
- Forgot password does not verify real recovery data.

Current persistence behavior:

- Only localStorage persistence for user profile description and pseudo-session.
- Posts in Explore are in-memory mock data.

Security implications of current state:

- Anyone with browser access can modify localStorage and impersonate a user in UI.
- No secure password storage in backend.
- Recovery phrase flow is UI-only, not a secure account recovery mechanism.

## 5) Styling and UX Notes

Strengths:

- High visual polish in hero and dashboard.
- Good consistency in rounded card/button language.
- Clear route-level interaction flows.

Current issues to watch:

- globals.css sets overflow-x and overflow-y hidden on all elements, which may suppress scrolling and cause usability issues on content-heavy pages.
- globals.css has an empty background-color declaration in .navbar.
- Mixed styling approach (Tailwind utilities + large inline CSS + global CSS classes) can become harder to maintain as app grows.

## 6) Build and Quality Status

Verification status (checked now):

- npm run lint: passes
- npm run build: passes

Build output route summary:

- /
- /login
- /signup
- /forgot-password
- /dashboard
- /create-post
- /explore
- all currently statically prerendered pages

## 7) What Is Happening Overall

The project is in the "interactive prototype" phase.

This means:

- The team has successfully built the user journey and visual brand identity.
- The core product logic is still simulated on the client.
- Backend dependencies were likely added in preparation for the next phase (real auth + database), but integration has not started or is not committed in this workspace.

## 8) Recommended Next Milestones

1. Implement real authentication

- Add NextAuth configuration and providers.
- Replace localStorage-only auth checks with session-based protection.

2. Add database schema and migrations

- Create prisma/schema.prisma.
- Define User, Post, Comment, and RecoverySecret models.
- Set DATABASE_URL and run migrations.

3. Build backend endpoints/server actions

- Signup: create user and hash password with bcryptjs.
- Login: validate credentials against stored hash.
- Forgot password: verify stored recovery secret and update password.
- Create post and list posts from DB.

4. Complete missing route

- Add post detail route for /post/[id].

5. Refactor frontend state handling

- Move from ad-hoc localStorage state to server-driven data + session context.
- Preserve current UI while replacing mock logic incrementally.

6. Clean up CSS risks

- Remove global overflow hidden on all elements.
- Fix invalid CSS declarations.
- Consolidate style strategy for maintainability.

## 9) Suggested Definition of Done for "Production-Ready v1"

A practical done definition for this project:

- Real signup/login/logout with secure password hashing.
- Verified password reset flow tied to stored recovery data.
- Auth-protected dashboard/create/explore pages on server and client.
- Persisted posts and comments with pagination.
- Post detail route implemented.
- Error states and loading states backed by real API behavior.
- Basic tests for auth and post CRUD.
- Security baseline (input validation, rate limiting, env handling).

## 10) Final Assessment

Current status: Good-looking, functional UI prototype with mocked business logic.

Best immediate priority: Replace auth and data mocks with real server-backed flows while keeping existing user experience intact.
