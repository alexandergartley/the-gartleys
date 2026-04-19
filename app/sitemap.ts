import type { MetadataRoute } from "next";

import { getJournalEntries } from "@/lib/journal";
import { siteConfig } from "@/content/site";
import { songs } from "@/content/songs";
import { songThemes } from "@/content/themes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const journalEntries = await getJournalEntries();

  const staticRoutes = [
    "",
    "/music",
    "/story",
    "/journal",
    "/family",
    "/shows",
    "/privacy"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date()
    })),
    ...songs.map((song) => ({
      url: `${siteConfig.url}/songs/${song.slug}`,
      lastModified: new Date(song.releaseDate)
    })),
    ...songThemes.map((theme) => ({
      url: `${siteConfig.url}/themes/${theme.slug}`,
      lastModified: new Date()
    })),
    ...journalEntries.map((entry) => ({
      url: `${siteConfig.url}/journal/${entry.slug}`,
      lastModified: new Date(entry.date)
    }))
  ];
}
