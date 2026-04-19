import Image from "next/image";

type ImageBlockProps = {
  src: string;
  alt: string;
  caption?: string;
};

export function ImageBlock({ src, alt, caption }: ImageBlockProps) {
  return (
    <figure className="my-8">
      <div className="soft-panel overflow-hidden rounded-[1.75rem] p-3">
        <Image src={src} alt={alt} width={1400} height={1000} className="w-full rounded-[1.25rem]" />
      </div>
      {caption ? <figcaption className="mt-3 text-sm text-[var(--muted)]">{caption}</figcaption> : null}
    </figure>
  );
}

