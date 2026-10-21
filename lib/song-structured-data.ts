import { siteConfig } from "@/content/site";
import type { Song } from "@/lib/types";

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).href;
}

function recordingUrl(embedUrl: string) {
  const url = new URL(embedUrl);
  const videoId = url.pathname.match(/^\/embed\/([\w-]+)$/)?.[1];

  if (
    videoId &&
    ["www.youtube-nocookie.com", "www.youtube.com"].includes(url.hostname)
  ) {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  return url.href;
}

export function buildSongStructuredData(song: Song) {
  const pageUrl = absoluteUrl(`/songs/${song.slug}`);
  const compositionId = `${pageUrl}#composition`;
  const artistId = `${siteConfig.url}/#artist`;
  const recordings = new Map<string, {
    name: string;
    description: string;
    audio?: NonNullable<Song["mediaAudio"]>;
  }>();

  // Match the primary player's audio-first behavior. URLs identify published
  // versions; a story-and-song edit is not equated with a song-only edit.
  if (song.mediaAudio) {
    recordings.set(absoluteUrl(song.mediaAudio.src), {
      name: `${song.title} (${song.mediaAudio.caption ?? "Audio recording"})`,
      description: song.mediaAudio.caption ?? song.summary,
      audio: song.mediaAudio
    });
  } else if (song.mediaEmbedUrl) {
    recordings.set(recordingUrl(song.mediaEmbedUrl), {
      name: song.title,
      description: song.summary
    });
  }

  for (const version of song.alternateVersions ?? []) {
    // Only describe media actually embedded on the page, not arbitrary links.
    if (!version.embedUrl) continue;
    const url = recordingUrl(version.embedUrl);
    if (!recordings.has(url)) {
      recordings.set(url, {
        name: `${song.title} (${version.title})`,
        description: version.description
      });
    }
  }

  for (const item of song.timeline ?? []) {
    if (!item.audio) continue;
    const url = absoluteUrl(item.audio.src);
    // Get Ready embeds the same demo in Listen and in its timeline.
    if (!recordings.has(url)) {
      recordings.set(url, {
        name: `${song.title} (${item.label})`,
        description: item.description,
        audio: item.audio
      });
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicGroup",
        "@id": artistId,
        name: siteConfig.name,
        url: siteConfig.url,
        sameAs: siteConfig.socialLinks.map((link) => link.href)
      },
      {
        "@type": "MusicComposition",
        "@id": compositionId,
        name: song.title,
        url: pageUrl,
        description: song.summary,
        // Published lyrics identify the work without asserting who wrote it.
        // The catalog has no explicit composer/lyricist credits, and some songs
        // use hymn language. Never infer authorship from the performing artist.
        ...(song.lyrics ? {
          lyrics: { "@type": "CreativeWork", text: song.lyrics }
        } : {})
      },
      ...Array.from(recordings, ([url, recording]) => ({
        "@type": "MusicRecording",
        "@id": `${pageUrl}#recording-${encodeURIComponent(url)}`,
        name: recording.name,
        url,
        description: recording.description,
        byArtist: { "@id": artistId },
        recordingOf: { "@id": compositionId },
        ...(recording.audio ? {
          audio: {
            "@type": "AudioObject",
            contentUrl: url,
            ...(recording.audio.type ? { encodingFormat: recording.audio.type } : {})
          }
        } : {})
        // Song release dates/artwork aren't necessarily specific to this edit.
        // VideoObject also needs verified per-video upload dates/thumbnails.
      }))
    ]
  };
}
