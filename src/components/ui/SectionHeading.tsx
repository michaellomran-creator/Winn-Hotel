import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {label ? (
        <p
          className={cn(
            "label-caps mb-4",
            tone === "dark" ? "text-sand/80" : "text-sage",
          )}
        >
          {label}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-serif text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] tracking-tight",
          tone === "dark" ? "text-ivory" : "text-lake",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base md:text-lg leading-relaxed",
            tone === "dark" ? "text-ivory/75" : "text-charcoal/70",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
