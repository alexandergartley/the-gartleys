import type { SongTheme } from "@/lib/types";

export const songThemes: SongTheme[] = [
  {
    slug: "trust",
    label: "Trust & Dependence",
    intro:
      "Songs about leaning on Jesus when we cannot carry or control what comes next.",
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
    slug: "surrender",
    label: "Surrender & Obedience",
    intro:
      "Songs about laying down our own way, yielding to Jesus, and following where He leads.",
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
    slug: "hope",
    label: "Waiting & Hope",
    intro:
      "Songs for the in-between: blessing His name, holding onto hope, and trusting Him in the valley.",
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
  },
  {
    slug: "freedom",
    label: "Peace & Freedom",
    intro:
      "Songs that turn from fear and anxiety toward the peace, victory, and freedom found in Christ.",
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
    slug: "healing",
    label: "Healing & Restoration",
    intro:
      "Songs about bringing what is broken to the Father and trusting Him to heal, redeem, and make new.",
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
    slug: "grace",
    label: "Grace & Redemption",
    intro:
      "Songs centered on the cross, salvation, mercy, and the new life we have in Jesus.",
    scriptures: [
      {
        reference: "Ephesians 2:4-5",
        passage:
          "Because of his great love for us, God made us alive with Christ - it is by grace you have been saved.",
        reflection:
          "Grace meets us in death and brings us into the life of Jesus."
      },
      {
        reference: "Titus 3:5",
        passage:
          "He saved us, not because of righteous things we had done, but because of his mercy.",
        reflection:
          "Redemption begins with His mercy, not our ability to earn it."
      }
    ]
  },
  {
    slug: "worship",
    label: "Presence & Worship",
    intro:
      "Songs of adoration, prayer, and making space for the presence of God.",
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
    slug: "calling",
    label: "Calling & Transition",
    intro:
      "Songs for change, obedience, new seasons, and following Jesus into what comes next.",
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
  }
];

export function getThemeBySlug(slug: string) {
  return songThemes.find((theme) => theme.slug === slug);
}
