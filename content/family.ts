import type { FamilyMember } from "@/lib/types";

export const familyMembers: FamilyMember[] = [
  {
    name: "Callum",
    intro:
      "The kinds of contributions that don't draw attention, but shape everything. Callum brings a quiet steadiness to the songs. Sometimes it's a small harmony. Sometimes it's a sketch in the margins. Sometimes it's a question that shifts how we hear a lyric.",
    features: [
      {
        title: "Living room harmony takes",
        description:
          "Short recordings that keep the songs feeling like home instead of performance."
      },
      {
        title: "Notebook drawings",
        description:
          "Small drawings and lyric fragments that carry the same honesty as the music.",
        image: {
          src: "/family/callum-drawing.svg",
          alt: "Child's worship-inspired notebook drawing from The Gartleys family songwriting scrapbook",
          caption: "A page from the family scrapbook."
        }
      }
    ]
  },
  {
    name: "Coda",
    intro:
      "Coda's part in this is playful and sincere. There's room here for unfinished ideas, childlike wonder, and creativity that doesn't need to prove itself.",
    features: [
      {
        title: "Early lyric ideas",
        description:
          "Simple lines and melodies that often carry more than we expect.",
        image: {
          src: "/family/coda-lyrics-cropped.jpeg",
          alt: "Handwritten child lyric ideas from The Gartleys family songwriting notebook",
          caption: "A page of handwritten lyrics from Coda."
        }
      },
      {
        title: "Voice memo (Shine Your Presence...)",
        description:
          "A short moment we didn't want to lose.",
        audio: {
          src: "/family/codas-song.m4a",
          type: "audio/mp4",
          caption:
            "“Shine Your Presence over everyone.” A short voice memo from November 2, 2024, when Coda was 5 years old, shared as a small scrapbook moment rather than a finished release."
        }
      },
      {
        title: "Christmas song",
        description:
          "Kept exactly as it came: playful, immediate, and real.",
        audio: {
          src: "/family/coda-christmas-song.m4a",
          type: "audio/mp4",
          caption:
            "A voice memo from September 7, 2023, when Coda was 4 years old."
        }
      }
    ]
  }
];
