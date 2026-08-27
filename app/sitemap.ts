import type { MetadataRoute } from "next";

import { getJournalEntries } from "@/lib/journal";
import { siteConfig } from "@/content/site";
import { songs } from "@/content/songs";
import { songThemes } from "@/content/themes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const journalEntries = await getJournalEntries();

  const staticRoutes: Array<{ path: string; updatedAt?: string }> = [
    { path: "", updatedAt: "2026-08-26" },
    { path: "/music" },
    { path: "/themes" },
    { path: "/story" },
    { path: "/journal" },
    { path: "/family" },
    { path: "/shows", updatedAt: "2026-08-26" },
    { path: "/privacy" }
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      ...(route.updatedAt ? { lastModified: new Date(route.updatedAt) } : {})
    })),
    ...songs.map((song) => ({
      url: `${siteConfig.url}/songs/${song.slug}`,
      lastModified: new Date(song.updatedAt ?? song.releaseDate)
    })),
    ...songThemes.map((theme) => ({
      url: `${siteConfig.url}/themes/${theme.slug}`
    })),
    ...journalEntries.map((entry) => ({
      url: `${siteConfig.url}/journal/${entry.slug}`,
      lastModified: new Date(entry.date)
    }))
  ];
}
