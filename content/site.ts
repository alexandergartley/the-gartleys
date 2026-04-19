export const siteConfig = {
  name: "The Gartleys",
  title: "The Gartleys | Songs of healing and freedom",
  description:
    "Songs from a family walking with Jesus through real life.",
  url: "https://thegartleys.com",
  socialLinks: [
    {
      label: "YouTube",
      href: "https://www.youtube.com/@thegartleys"
    },
    {
      label: "Spotify",
      href: "https://open.spotify.com/artist/5ILh2eMdDer8gOI6umUEn4?si=g7bFj-yLRCOQOYXpGhCf_g"
    },
    {
      label: "Apple Music",
      href: "https://music.apple.com/us/artist/the-gartleys/1829181582"
    },
    {
      label: "Amazon Music",
      href: "https://music.amazon.com/artists/B0FK36TQM6/the-gartleys"
    },
    {
      label: "YouTube Music",
      href: "https://music.youtube.com/channel/UC9ORd0-NhdmpRs0T3_tA8sA?si=a7zy-yGO0a45GLnQ"
    }
  ],
  navigation: [
    { href: "/", label: "Home" },
    { href: "/music", label: "Music" },
    { href: "/story", label: "Story" },
    { href: "/journal", label: "Journal" },
    { href: "/family", label: "Family" },
    { href: "/shows", label: "Shows" }
  ]
} as const;

export const brandVoiceBlock = {
  title: "Songs as a journal of the journey",
  body: [
    "Our songs are how we walk with the Lord in real time.",
    "We write in the middle of it",
    "in prayer, in wrestling, in faith."
  ]
} as const;

export const followAlongCopy = {
  title: "Follow the Journey",
  body:
    "New songs and the stories behind them, as they're written."
} as const;
