import { MediaEmbed } from "@/components/media-embed";

type AudioEmbedProps = {
  title: string;
  url?: string;
};

export function AudioEmbed({ title, url }: AudioEmbedProps) {
  return <MediaEmbed title={title} url={url} aspect="audio" />;
}

