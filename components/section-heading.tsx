type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  headingLevel?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  headingLevel = "h2"
}: SectionHeadingProps) {
  const Heading = headingLevel;

  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <Heading className="mt-3.5 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.08]">
        {title}
      </Heading>
      {description ? (
        <p className="mt-5 max-w-[62ch] text-[1.05rem] leading-8 text-[var(--muted)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
