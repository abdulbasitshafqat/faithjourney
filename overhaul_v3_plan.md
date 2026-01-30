# Project Overhaul v3.0 Plan: Login, Persistence, Gamification

## 1. Authentication & Context
- **Dependencies**: Install `@supabase/auth-helpers-nextjs`.
- **Middleware**: Create `src/middleware.ts` to manage sessions and protect `/profile`.
- **Auth Components**:
    - `src/components/auth/LoginButton.tsx`: Google Sign-In trigger.
    - `src/app/login/page.tsx`: Dedicated login page.
    - Update `src/components/layout/Header.tsx` to include the button.

## 2. Database Schema (Supabase)
- Create `supabase/migrations/20260130_v3_schema.sql` containing:
    - `profiles` table (id, full_name, avatar_url, updated_at).
    - `user_progress` table (user_id, last_surah, last_ayah, last_read_at).
    - `user_streaks` table (user_id, current_streak, last_activity_date).
    - RLS policies for all tables.

## 3. "Continue Reading" Engine
- **Logic**:
    - Create `src/lib/api/progress.ts` with `saveProgress` and `getProgress`.
    - Modify `src/components/quran/SurahView.tsx` to auto-save progress on scroll/interaction.
- **UI**:
    - Create `src/components/dashboard/ResumeJourney.tsx`: Fetches `user_progress` and displays "Continue from..." card.
    - Add to `src/app/page.tsx`.

## 4. Gamification (Retention)
- **Streaks**:
    - Logic: Check `last_activity_date` vs Today. Reset if > 1 day gap.
    - UI: `src/components/dashboard/SpiritualStreak.tsx`.
- **Goals**:
    - UI: `src/components/dashboard/ReadingGoals.tsx` (Simple goal setter/tracker).
- **Progress**:
    - UI: Circular progress indicators on Dashboard.

## 5. Execution Order
1.  Install Deps.
2.  Write SQL Migration.
3.  Implement Auth & Middleware.
4.  Implement Progress Logic & Components.
5.  Implement Gamification Widgets.
6.  Update Dashboard.
