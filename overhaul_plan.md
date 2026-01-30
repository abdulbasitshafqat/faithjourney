# FaithJourney.pro Overhaul Plan (Windows-Optimized v2.2)

## 1. Project Audit
**Files Identified:**
- `src/lib/api/hadith.ts`: Handles Hadith fetching. Needs update for Urdu and Grading.
- `src/lib/data/duas.ts`: Contains Duas. Needs Dua-e-Qunoot.
- `src/lib/data/salah.ts`: Contains Prayer Guide steps. Needs Rakah Table and Recitation Logic.
- `src/lib/data/guides-content.ts`: Contains Fasting, Hajj, Umrah, Zakat, Janazah guides.
- `src/app/hadith`: Hadith pages.
- `package.json`: Contains `framer-motion`, `lucide-react`, `qrcode.react`. All present.

## 2. Spiritual Data & Authenticity
*   **Hadith Upgrade**:
    *   Update `src/lib/api/hadith.ts` to fetch/return Urdu translations.
    *   Update UI to display Grade Badge (Sahih/Hassan/Da'if).
    *   Implement "Gulzar" font for Urdu.
*   **Urdu Support**: Fetch `urd-bukhari`, etc.
*   **Dua-e-Qunoot**:
    *   Add to `src/lib/data/duas.ts` (or `salah.ts` if appropriate) with Arabic, Urdu, English.

## 3. Advanced Prayer Guide (Fiqh Accuracy)
*   **Refactor `/guides/prayer`**:
    *   Update `src/lib/data/salah.ts` to include:
        *   **Interactive Rakah Table**:
            *   Fajr: 2 Sunnah (M), 2 Fard.
            *   Dhuhr: 4 Sunnah (M), 4 Fard, 2 Sunnah (M), 2 Nafl.
            *   Asr: 4 Sunnah (GM), 4 Fard.
            *   Maghrib: 3 Fard, 2 Sunnah (M), 2 Nafl.
            *   Isha: 4 Sunnah (GM), 4 Fard, 2 Sunnah (M), 2 Nafl, 3 Witr, 2 Nafl.
        *   **Recitation Logic**: Explain Fard 3rd/4th Rakah (Fatiha only).
    *   Build UI for the table in `src/app/guides/prayer/page.tsx` (or similar).

## 4. Tech & AI SEO
*   **Structured Data**: Create `src/components/StructuredData.tsx` with JSON-LD.
    *   `HowTo` for Prayer Guide.
    *   `Quotation` for Duas/Hadith.
*   **Design**: Refactor Dashboard (Home) to **Bento Grid** with Glassmorphism.
*   **Support Page**: Update `/support` with BTC address and QR code.

## 5. Windows & PWA
*   **PWA**: Ensure `next.config.ts` has PWA setup (using `next-pwa`).
*   **Compatibility**: Use `npm` (Windows handles `.cmd` automatically in most shells, but we'll be careful).

## 6. Execution Steps
1.  **Update Data**: `hadith.ts`, `duas.ts`, `salah.ts`.
2.  **Create Components**: `StructuredData.tsx`, `GradeBadge.tsx`.
3.  **Refactor Pages**:
    *   `src/app/guides/prayer/page.tsx` (Prayer Manual)
    *   `src/app/dashboard/page.tsx` (or `page.tsx` - Bento Grid)
    *   `src/app/hadith/page.tsx` (Hadith UI)
    *   `src/app/support/page.tsx` (BTC)
4.  **Verify**: Build and check.
