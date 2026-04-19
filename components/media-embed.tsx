type MediaEmbedProps = {
  title: string;
  url?: string;
  audio?: {
    src: string;
    type?: string;
    caption?: string;
  };
  aspect?: "video" | "audio";
};

export function MediaEmbed({ title, url, audio, aspect = "video" }: MediaEmbedProps) {
  const resolvedAspect = audio ? "audio" : aspect;
  const ratioClass = resolvedAspect === "audio" ? "aspect-[16/8]" : "aspect-video";

  if (audio) {
    const waveformBars = [28, 16, 36, 20, 42, 18, 34, 24, 40, 14, 30, 22, 38, 18, 26, 32];

    return (
      <div className="soft-panel rounded-[1.75rem] p-5 sm:p-6">
        <div className="rounded-[1.25rem] border border-[var(--border)] bg-[rgba(255,255,255,0.42)] p-5 sm:p-6">
          <div className="max-w-3xl">
            <p className="section-eyebrow">Demo Recording</p>
            <h3 className="mt-3 font-serif text-2xl">{title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              A simple recording kept close to the way it first arrived.
            </p>
            <div
              aria-hidden="true"
              className="mt-6 flex h-14 items-end gap-1.5 overflow-hidden rounded-[1rem] border border-[var(--border)] bg-[rgba(255,255,255,0.58)] px-4 py-3"
            >
              {waveformBars.map((height, index) => (
                <span
                  key={`${title}-bar-${index}`}
                  className="w-2 rounded-full bg-[rgba(113,113,95,0.28)]"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </div>
          <div className="mt-5 max-w-3xl">
            <audio className="w-full" controls preload="metadata">
              <source src={audio.src} type={audio.type ?? "audio/mpeg"} />
              Your browser does not support the audio player.
            </audio>
            {audio.caption ? (
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">{audio.caption}</p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  if (!url) {
    return (
      <div className={`soft-panel ${ratioClass} rounded-[1.75rem] p-6`}>
        <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-dashed border-[var(--border)] p-6">
          <div>
            <p className="section-eyebrow">Media</p>
            <h3 className="mt-3 font-serif text-2xl">{title}</h3>
          </div>
          <p className="max-w-lg text-sm leading-7 text-[var(--muted)]">
            Audio or video will live here. The layout is ready for an embed or a simple demo player
            when the final media is available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`soft-panel ${ratioClass} overflow-hidden rounded-[1.75rem]`}>
      <iframe
        className="h-full w-full"
        src={url}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
