import type { SongTheme } from "@/lib/types";

export const songThemes: SongTheme[] = [
  {
    slug: "freedom",
    label: "Freedom",
    intro:
      "These songs were written in the movement from fear into freedom - learning to live from what Jesus has already finished.",
    scriptures: [
      {
        reference: "John 8:36",
        passage: "So if the Son sets you free, you will be free indeed.",
        reflection:
          "Freedom in Jesus isn't partial - it becomes who we are."
      },
      {
        reference: "2 Corinthians 3:17",
        passage: "Where the Spirit of the Lord is, there is freedom.",
        reflection:
          "His presence doesn't tighten - it opens space for life and truth."
      }
    ]
  },
  {
    slug: "surrender",
    label: "Surrender",
    intro:
      "Letting go to make room for what God is doing. These songs were written in seasons of releasing control - making space for His presence and trusting His lead.",
    scriptures: [
      {
        reference: "Romans 12:1",
        passage:
          "Offer your bodies as a living sacrifice, holy and pleasing to God - this is your true and proper worship.",
        reflection:
          "Surrender shows up in the everyday - offering our lives back to Him."
      },
      {
        reference: "James 4:7-8",
        passage: "Submit yourselves, then, to God... Come near to God and he will come near to you.",
        reflection:
          "As we come near in humility, He meets us there."
      }
    ]
  },
  {
    slug: "healing",
    label: "Healing",
    intro:
      "These songs were written in the middle of sorrow - learning to hold onto hope.",
    scriptures: [
      {
        reference: "Psalm 147:3",
        passage: "He heals the brokenhearted and binds up their wounds.",
        reflection:
          "His healing is close - personal, attentive, and near."
      },
      {
        reference: "Isaiah 61:1",
        passage:
          "He has sent me to bind up the brokenhearted... to comfort all who mourn.",
        reflection:
          "Jesus doesn't avoid pain - He moves toward it."
      }
    ]
  },
  {
    slug: "trust",
    label: "Trust",
    intro:
      "Holding onto God when the outcome isn't clear. These songs were written in uncertain seasons - learning to trust His character when we couldn't see what was ahead.",
    scriptures: [
      {
        reference: "Proverbs 3:5-6",
        passage:
          "Trust in the Lord with all your heart and lean not on your own understanding.",
        reflection:
          "Trust begins when we stop trying to figure everything out ourselves."
      },
      {
        reference: "Psalm 56:3",
        passage: "When I am afraid, I put my trust in you.",
        reflection:
          "Fear doesn't disappear - we bring it to Him."
      }
    ]
  },
  {
    slug: "calling",
    label: "Calling",
    intro:
      "Stepping forward before the path is clear. These songs were written in moments of movement - when God was asking us to go, and we had to trust Him with what came next.",
    scriptures: [
      {
        reference: "Hebrews 12:1-2",
        passage:
          "Let us run with perseverance the race marked out for us, fixing our eyes on Jesus.",
        reflection:
          "Calling takes endurance - keeping our eyes on Him as we move forward."
      },
      {
        reference: "Isaiah 30:21",
        passage:
          "Whether you turn to the right or to the left, your ears will hear a voice behind you, saying, 'This is the way; walk in it.'",
        reflection:
          "He leads as we go - one step at a time."
      }
    ]
  },
  {
    slug: "worship",
    label: "Worship",
    intro:
      "Our response to who God is in every season. These songs were written as response - in gratitude, in surrender, in trust, and in awe of who He is.",
    scriptures: [
      {
        reference: "Psalm 95:1-2",
        passage:
          "Come, let us sing for joy to the Lord... let us come before him with thanksgiving.",
        reflection:
          "Worship responds - joy, gratitude, and awe all finding their way to Him."
      },
      {
        reference: "John 4:23-24",
        passage:
          "True worshipers will worship the Father in the Spirit and in truth.",
        reflection:
          "Worship is shaped by His Spirit and grounded in what's true."
      }
    ]
  },
  {
    slug: "hope",
    label: "Hope",
    intro:
      "Holding onto what God is doing, even when we can't see it yet. These songs were written looking forward - in the middle of uncertainty, trusting that He is still at work.",
    scriptures: [
      {
        reference: "Romans 15:13",
        passage:
          "May the God of hope fill you with all joy and peace as you trust in him.",
        reflection:
          "Hope is something He gives - as we keep trusting Him."
      },
      {
        reference: "Lamentations 3:22-23",
        passage:
          "His compassions never fail. They are new every morning; great is your faithfulness.",
        reflection:
          "Hope grows one day at a time - remembering His mercy is still there."
      }
    ]
  }
];

export function getThemeBySlug(slug: string) {
  return songThemes.find((theme) => theme.slug === slug);
}
