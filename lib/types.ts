export type StreamingLink = {
  label: string;
  href: string;
};

export type ScriptureReference = {
  reference: string;
  passage?: string;
  reflection: string;
};

export type SongTimelineItem = {
  label: string;
  date: string;
  description: string;
  audio?: {
    src: string;
    type?: string;
    caption?: string;
  };
};

export type NoteImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type AlternateVersion = {
  title: string;
  description: string;
  href?: string;
  embedUrl?: string;
};

export type Song = {
  title: string;
  slug: string;
  summary: string;
  themeSlugs?: string[];
  releaseDate: string;
  coverImage?: NoteImage;
  mediaEmbedUrl?: string;
  mediaAudio?: {
    src: string;
    type?: string;
    caption?: string;
  };
  streamingLinks: StreamingLink[];
  lyrics?: string;
  aboutText?: string;
  storyText?: string[];
  scriptureReferences?: ScriptureReference[];
  timeline?: SongTimelineItem[];
  notesImages?: NoteImage[];
  alternateVersions?: AlternateVersion[];
  reflectionText?: string;
  featured?: boolean;
};

export type ThemeScripture = {
  reference: string;
  passage: string;
  reflection: string;
};

export type SongTheme = {
  slug: string;
  label: string;
  intro: string;
  scriptures: ThemeScripture[];
};

export type FamilyFeature = {
  title: string;
  description: string;
  image?: NoteImage;
  links?: StreamingLink[];
  audio?: {
    src: string;
    type?: string;
    caption?: string;
  };
};

export type FamilyMember = {
  name: string;
  intro: string;
  features: FamilyFeature[];
};

export type VideoEntry = {
  title: string;
  description: string;
  embedUrl: string;
  category?: string;
};

export type JournalFrontmatter = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
};
