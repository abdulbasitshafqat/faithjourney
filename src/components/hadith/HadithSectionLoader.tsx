"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import HadithFeed from "./HadithFeed";
import type { Hadith } from "@/lib/api/hadith";

type BookId = "bukhari" | "muslim" | "abudawud";

interface CombinedHadith {
  arabic: Hadith;
  english: Hadith;
  urdu?: Hadith;
}

interface SectionPayload {
  hadiths?: Hadith[];
}

interface HadithSectionLoaderProps {
  bookId: BookId;
  sectionId: string;
  bookName: string;
  chapterName: string;
  initialHadiths: CombinedHadith[];
}

const editionNames: Record<BookId, { arabic: string; english: string; urdu: string }> = {
  bukhari: { arabic: "ara-bukhari", english: "eng-bukhari", urdu: "urd-bukhari" },
  muslim: { arabic: "ara-muslim", english: "eng-muslim", urdu: "urd-muslim" },
  abudawud: { arabic: "ara-abudawud", english: "eng-abudawud", urdu: "urd-abudawud" },
};

async function fetchSection(edition: string, sectionId: string): Promise<Hadith[]> {
  const response = await fetch(`/data/hadith/editions/${edition}/sections/${sectionId}.json`);
  if (!response.ok) throw new Error(`Could not load ${edition}`);

  const payload = (await response.json()) as SectionPayload;
  return payload.hadiths ?? [];
}

export default function HadithSectionLoader({
  bookId,
  sectionId,
  bookName,
  chapterName,
  initialHadiths,
}: HadithSectionLoaderProps) {
  const [hadiths, setHadiths] = useState(initialHadiths);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const editions = editionNames[bookId];

    Promise.all([
      fetchSection(editions.arabic, sectionId),
      fetchSection(editions.english, sectionId),
      fetchSection(editions.urdu, sectionId),
    ])
      .then(([arabicHadiths, englishHadiths, urduHadiths]) => {
        if (cancelled) return;

        const arabicByNumber = new Map(arabicHadiths.map((hadith) => [hadith.hadithnumber, hadith]));
        const urduByNumber = new Map(urduHadiths.map((hadith) => [hadith.hadithnumber, hadith]));

        const combined = englishHadiths.flatMap((english, index) => {
          const arabic = arabicByNumber.get(english.hadithnumber) ?? arabicHadiths[index];
          if (!arabic) return [];

          return [{
            arabic,
            english,
            urdu: urduByNumber.get(english.hadithnumber),
          }];
        });

        setHadiths(combined);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [bookId, sectionId]);

  return (
    <>
      {isLoading && (
        <div className="mb-6 flex items-center justify-center gap-2 rounded-xl border border-primary/10 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading the complete chapter…
        </div>
      )}
      {loadError && (
        <div className="mb-6 flex items-center justify-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
          <AlertCircle className="h-4 w-4" />
          You are seeing the available preview because the full chapter could not be loaded.
        </div>
      )}
      <HadithFeed hadiths={hadiths} bookName={bookName} chapterName={chapterName} />
    </>
  );
}
