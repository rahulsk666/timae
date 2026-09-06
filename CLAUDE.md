# Timae — Claude Code Development Guide

## 1. Project Overview

Timae is a calm, minimal time-tracking and journaling mobile application.

The application allows users to:

- Track activities and time
- View their day
- View a chronological timeline
- Identify untracked time
- Browse their calendar
- Write a daily journal
- Review historical journal entries
- View lightweight insights
- Use the application as a guest without creating an account
- Create an account later and migrate guest data
- Use the application offline
- Synchronize authenticated data with Supabase

The application is built with:

- Expo
- React Native
- TypeScript
- Expo Router
- Supabase
- TanStack Query
- Zustand
- Local persistent storage

---

# 2. Core Architectural Principle

The most important architectural rule in this project is:

UI MUST NOT directly communicate with Supabase or local storage.

The data flow is:

UI
→ Feature Page
→ Feature Hook
→ TanStack Query
→ Feature API
→ Repository
→ Local / Supabase

Never bypass this architecture.

---

# 3. State Management Rules

## Zustand

Zustand is ONLY for client/application state.

Use Zustand for:

- authentication state
- guest/authenticated mode
- app initialization
- global UI state
- preferences
- sync status
- other genuinely global client state

Do NOT use Zustand as the primary store for:

- activities
- journal entries
- calendar data
- insights
- profiles
- server/domain data

---

## TanStack Query

TanStack Query owns domain/server state.

Use it for:

- activities
- journal entries
- profiles
- categories
- calendar data
- insights
- remote synchronization state

All feature data fetching should happen through feature-specific hooks.

Example:

useActivities()
useActivity()
useJournal()
useJournalHistory()

Do not call useQuery directly from large page components unless there is a compelling reason.

---

# 4. Local-First Architecture

Timae supports guest users.

Guest users must be able to use the core application without an account.

Guest data is stored locally.

Guest flow:

UI
→ Hook
→ Repository
→ Local Storage

Authenticated flow:

UI
→ Hook
→ Repository
→ Local Storage
→ Sync
→ Supabase

The UI must not know whether the user is a guest or authenticated.

---

# 5. Repository Pattern

Repositories are the primary data boundary.

Example:

interface ActivityRepository {
getById(id: string): Promise<Activity | null>;
getByDate(date: string): Promise<Activity[]>;
create(input: CreateActivityInput): Promise<Activity>;
update(id: string, input: UpdateActivityInput): Promise<Activity>;
delete(id: string): Promise<void>;
}

Repositories may internally use:

- local storage
- Supabase
- hybrid/local-first synchronization

The rest of the application should depend on repository interfaces rather than storage implementations.

---

# 6. Module Architecture

Every major feature must follow:

src/modules/<feature>/

├── api/
├── components/
├── hooks/
├── constants/
├── pages/
├── routes/
├── schema/
├── repository/
└── index.ts

Example:

src/modules/activity/

├── api/
├── components/
├── hooks/
├── constants/
├── pages/
├── routes/
├── schema/
├── repository/
└── index.ts

---

# 7. Feature Ownership

## Activity

Owns:

- activity creation
- activity editing
- activity deletion
- activity timer
- activity duration
- categories
- activity validation
- activity persistence

## Today

Owns:

- today's composition
- today's summary
- today's activity presentation
- today's journal preview

Today must consume Activity and Journal modules.

It must not duplicate their repositories.

## Timeline

Owns:

- chronological presentation
- date navigation
- activity ordering
- untracked gaps

Timeline consumes Activity.

## Calendar

Owns:

- month navigation
- date selection
- calendar presentation
- daily summaries

Calendar consumes Activity and Journal public APIs.

## Journal

Owns:

- daily journal entry
- journal editor
- prompts
- autosave
- journal history
- journal persistence
- journal synchronization

For MVP, use one journal entry per day.

## Insights

Owns:

- derived analytics
- summaries
- charts
- trends

Insights should derive data from Activity and Journal rather than duplicate domain data.

---

# 8. Navigation Architecture

The `app/` directory is ONLY for Expo Router routes.

Routes should remain thin.

Example:

app/(app)/(tabs)/index.tsx

should look conceptually like:

import { TodayPage } from "@/modules/today";

export default function TodayRoute() {
return <TodayPage />;
}

Do not put business logic into route files.

Do not put Supabase calls into route files.

Do not put storage calls into route files.

---

# 9. Recommended App Structure

app/

├── \_layout.tsx
├── +not-found.tsx
│
├── (auth)/
│ ├── \_layout.tsx
│ ├── welcome.tsx
│ ├── sign-in.tsx
│ └── onboarding.tsx
│
└── (app)/
├── \_layout.tsx
│
├── (tabs)/
│ ├── \_layout.tsx
│ ├── index.tsx
│ ├── timeline.tsx
│ ├── add.tsx
│ ├── calendar.tsx
│ └── insights.tsx
│
├── activity/
│ ├── create.tsx
│ └── [id].tsx
│
├── journal/
│ ├── index.tsx
│ ├── [date].tsx
│ └── history.tsx
│
└── settings/
└── index.tsx

---

# 10. Authentication Model

There are three application auth states:

loading
guest
authenticated

Guest is a valid application state.

Do NOT treat:

unauthenticated = blocked

Instead:

unauthenticated = guest mode

The user should be able to use the core application as a guest.

---

# 11. Supabase

Supabase is responsible for:

- authentication
- PostgreSQL
- cloud persistence
- Row Level Security

The client must only use public client credentials.

NEVER include the Supabase service-role key in the Expo application.

---

# 12. Supabase Security

Every user-owned table must have RLS enabled.

User-owned rows must be protected using:

auth.uid() = user_id

Never rely solely on frontend filtering for ownership.

---

# 13. Database

Initial tables:

profiles
activity_categories
activities
journal_entries

Avoid unnecessary tables during MVP.

---

# 14. Activity Data Model

Activity contains:

id
userId / ownerId
title
categoryId
startedAt
endedAt
notes
createdAt
updatedAt
deletedAt

Activities must use stable UUIDs.

---

# 15. Journal Data Model

Journal contains:

id
ownerId
date
content
prompt
createdAt
updatedAt
deletedAt

For MVP:

ONE JOURNAL ENTRY PER USER PER DAY.

The date is represented as:

YYYY-MM-DD

Do not use UTC timestamps as the journal date without considering the user's local timezone.

---

# 16. Soft Deletes

Prefer soft deletion using:

deletedAt

rather than immediately destroying records.

This makes synchronization safer.

Deleted records must not appear in normal UI queries.

---

# 17. Guest Data

Guest users must be able to:

- create activities
- edit activities
- delete activities
- view timeline
- view calendar
- write journal entries
- view journal history
- view insights

Guest data is local.

Do not create fake Supabase accounts for guest users.

---

# 18. Guest → Account Migration

When a guest creates an account:

1. Create the Supabase account.
2. Preserve the local entity IDs.
3. Upload local activities.
4. Upload local journal entries.
5. Upload relevant preferences.
6. Verify migration.
7. Mark migration completed.
8. Only then clean up guest-specific state.

Migration must be idempotent.

Use upsert operations where appropriate.

If migration fails halfway, it must be safe to retry.

---

# 19. Offline Support

Local persistence must happen before cloud synchronization where practical.

Authenticated offline flow:

User action
→ Local persistence
→ UI update
→ Sync queue
→ Network returns
→ Supabase synchronization

Never make the user lose a journal entry merely because the network is unavailable.

---

# 20. Sync Queue

Sync operations include:

CREATE
UPDATE
DELETE

Each operation should contain enough information to retry safely.

Example:

{
entityType: "activity",
entityId: "uuid",
operation: "update",
payload: {...}
}

Operations must be idempotent where possible.

---

# 21. Conflict Resolution

For MVP, use simple last-write-wins behavior.

Use:

updatedAt

for comparison.

Do not implement sophisticated conflict resolution unless product requirements demand it.

---

# 22. Journal Architecture

Journal is a first-class feature.

Use:

src/modules/journal/

├── api/
├── components/
├── hooks/
├── constants/
├── pages/
├── routes/
├── schema/
├── repository/
└── index.ts

The journal editor should support:

- multiline text
- autosave
- local persistence
- save status
- offline behavior
- daily prompts

Do not build rich text for MVP.

Plain text is preferred.

---

# 23. Journal Autosave

Journal text should not trigger a network request on every keystroke.

Use debounced persistence.

Target:

approximately 1 second after the user stops typing.

Also save when leaving the screen or when appropriate during app lifecycle changes.

---

# 24. Journal Save States

Use states such as:

idle
saving
saved
syncing
synced
error

For guest:

saved = local persistence succeeded

For authenticated:

saved = local persistence succeeded
synced = cloud persistence succeeded

---

# 25. Activity Timer

Never implement the timer as a simple:

seconds++

counter.

Calculate duration from:

currentTime - startedAt

This allows timers to survive backgrounding and app suspension.

---

# 26. UI Architecture

Shared UI belongs in:

src/components/

Feature-specific UI belongs inside its feature module.

Example:

Generic Button:

src/components/ui/Button.tsx

Activity-specific button:

src/modules/activity/components/ActivityStartButton.tsx

---

# 27. Design System

Timae uses a calm, minimal visual language.

Use:

- warm neutral backgrounds
- muted sage primary
- soft borders
- restrained shadows
- rounded surfaces
- generous spacing
- quiet typography

Avoid:

- bright gradients
- neon colors
- excessive shadows
- excessive cards
- excessive badges
- dense layouts
- generic AI-looking dashboard patterns

The interface should feel intentional, editorial, calm, and human.

---

# 28. Typography

Use:

Manrope
→ headings
→ important numbers
→ durations

Inter
→ body
→ labels
→ metadata
→ buttons
→ inputs

Do not hardcode font families throughout feature components.

Use the design system.

---

# 29. Spacing

Use the project's spacing tokens.

Do not randomly introduce:

margin: 13
padding: 17
gap: 19

Prefer tokenized spacing.

The design system uses an 8pt spacing approach.

---

# 30. Cards

Cards should be used sparingly.

Do not wrap every timeline row in a card.

Timeline should primarily use:

- whitespace
- alignment
- subtle dividers
- restrained backgrounds

---

# 31. Component Rules

Components should primarily render UI.

Avoid putting large business rules inside components.

Bad:

Component
→ Supabase
→ validation
→ database
→ calculations

Good:

Component
→ Hook
→ Repository
→ Data

---

# 32. API Rules

Feature API files should contain feature-level data operations.

Supabase-specific implementation should remain isolated.

Do not expose raw Supabase queries throughout the app.

---

# 33. Import Rules

Prefer public module APIs.

Good:

import { useActivities } from "@/modules/activity";

Avoid:

import { useActivities } from "@/modules/activity/hooks/useActivities";

when the module exposes the hook publicly.

Do not import another feature's internal files.

---

# 34. Circular Dependencies

Avoid:

Activity → Journal
Journal → Activity

If two modules require shared functionality, extract the shared logic into an appropriate shared data/domain layer.

---

# 35. TypeScript

Use strict TypeScript.

Avoid:

any
as any
@ts-ignore

unless absolutely necessary and documented.

Prefer explicit types.

Use schemas for runtime validation.

---

# 36. Validation

Use Zod for user input and data validation.

Validate:

- activity title
- dates
- duration relationships
- journal content
- profile data
- other user-entered fields

Do not rely exclusively on TypeScript for runtime validation.

---

# 37. Error Handling

Never show raw infrastructure errors to users.

Convert:

Supabase errors
storage errors
network errors
sync errors

into application-level errors.

User-facing messages should be calm and useful.

Example:

"Your changes are saved locally and will sync when you're back online."

---

# 38. Performance

Do not prematurely optimize.

First make the architecture correct.

When optimizing, focus on:

- unnecessary renders
- large activity lists
- FlatList configuration
- calendar data loading
- query cache size
- timer re-renders
- startup time
- image loading
- font loading

---

# 39. Analytics

Analytics must never contain private journal content.

Track events such as:

app_opened
activity_created
activity_completed
journal_opened
journal_saved
calendar_viewed
insights_viewed
account_created
guest_migration_completed
sync_failed

Do not track journal text.

---

# 40. Testing Requirements

At minimum test:

## Activity

- create
- update
- delete
- duration
- timer recovery

## Journal

- create
- update
- autosave
- history
- local persistence

## Guest

- local persistence
- app restart
- migration

## Sync

- create sync
- update sync
- delete sync
- retry
- offline queue

## Authentication

- guest
- sign in
- sign out
- account creation
- session restoration

---

# 41. Required E2E Flow

The following flow must work before calling the MVP complete:

Install
→ Open app
→ Continue as Guest
→ Create Activity
→ Start Activity
→ Stop Activity
→ View Today
→ View Timeline
→ View Calendar
→ Write Journal
→ Close App
→ Reopen App
→ Verify data remains
→ Create Account
→ Migrate Guest Data
→ Verify Supabase data
→ Sign Out
→ Sign In
→ Verify data remains

---

# 42. Development Process

Do NOT implement the entire application in one pass.

Implement one phase at a time.

After every phase:

1. Run TypeScript.
2. Run lint.
3. Run tests.
4. Run the application.
5. Verify the feature manually.
6. Fix errors.
7. Commit changes.
8. Move to the next phase.

Never continue while the previous phase is broken.

---

# 43. Implementation Order

Follow this exact order:

1. Expo + TypeScript
2. Expo Router
3. Theme / design tokens
4. Fonts
5. Shared UI components
6. Supabase client
7. Auth store
8. Guest storage abstraction
9. TanStack Query
10. Repository architecture
11. Activity schema
12. Local Activity Repository
13. Activity module
14. Today module
15. Timeline module
16. Calendar module
17. Journal module
18. Insights module
19. Supabase database
20. Supabase Activity Repository
21. Supabase Journal Repository
22. Guest → Account migration
23. Authenticated local cache
24. Sync queue
25. Offline support
26. Error handling
27. Analytics
28. Testing
29. Performance optimization
30. App Store / Play Store preparation

---

# 44. Phase Completion Rules

A phase is NOT complete merely because files were created.

A phase is complete only when:

- implementation exists
- types compile
- lint passes
- relevant tests pass
- app runs
- feature behaves correctly
- architecture rules are respected

---

# 45. Never Do These

Do NOT:

- put Supabase calls in components
- put storage calls in components
- put domain data in Zustand
- bypass repositories
- duplicate Activity logic in Today
- duplicate Journal logic in Calendar
- create fake Supabase accounts for guests
- require authentication for core guest functionality
- lose guest data during signup
- hardcode colors throughout components
- hardcode font names throughout components
- use excessive cards
- create giant screen components
- create unnecessary global stores
- create unnecessary abstractions
- introduce AI features into the MVP without explicit requirements
- add rich text to Journal without explicit requirements
- expose Supabase service-role credentials to the client

---

# 46. Claude Code Behavior

Before modifying the project:

1. Inspect the existing structure.
2. Read this CLAUDE.md.
3. Determine which phase is currently being implemented.
4. Do not jump ahead.
5. Reuse existing architecture.
6. Do not create duplicate utilities.
7. Check existing components before creating new ones.
8. Check existing hooks before creating new hooks.
9. Check existing repositories before creating new repositories.

When a requirement is ambiguous:

- prefer the existing architecture
- prefer the simplest MVP implementation
- avoid unnecessary dependencies
- avoid speculative abstractions

---

# 47. Current Implementation Target

The immediate target is a production-quality MVP.

The MVP must support:

- guest mode
- local persistence
- activity tracking
- timeline
- today
- calendar
- journal
- insights
- Supabase authentication
- Supabase persistence
- guest migration
- local-first authenticated usage
- synchronization
- basic offline behavior

Advanced features should not be implemented unless explicitly requested.

---

# 48. Definition of Done

Timae MVP is complete when:

1. Guest can use the app without an account.
2. Guest data persists across app restarts.
3. Activities work correctly.
4. Timer works across app backgrounding.
5. Today works.
6. Timeline works.
7. Calendar works.
8. Journal works.
9. Insights work.
10. Supabase authentication works.
11. Supabase RLS is enabled.
12. Guest data migrates safely.
13. Authenticated local cache works.
14. Sync queue works.
15. Offline changes are retained.
16. Errors are handled gracefully.
17. Analytics does not collect private journal content.
18. Tests cover critical flows.
19. Performance is acceptable.
20. iOS and Android builds are production-ready.

---

# 49. Final Architecture

The final application should follow:

UI
↓
Pages
↓
Feature Hooks
↓
TanStack Query
↓
Feature API
↓
Repository
↓
Local / Supabase

Zustand is used separately for:

Auth
UI state
Preferences
Sync state

The application is local-first.

Guest data remains local until the user chooses to create an account.

Authenticated data synchronizes with Supabase.

The `app/` directory owns navigation.

The `src/modules/` directory owns product features.

Shared infrastructure belongs in `src/lib`, `src/data`, `src/sync`, `src/providers`, and `src/theme`.

This architecture must remain consistent throughout the project.
