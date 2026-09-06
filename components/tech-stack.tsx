import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { MatHeading } from "@/components/desk/paper";

const categories = ["Frontend", "Backend", "Tools"] as const;

/** Each tool is a little laptop-sticker: a colour dot on a pale, slightly tilted chip. */
function StackSticker({
  name,
  color,
  href,
  tilt,
}: {
  name: string;
  color: string;
  href: string;
  tilt: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5"
      style={{
        transform: `rotate(${String(tilt)}deg)`,
        background: "linear-gradient(180deg, #f8f4ec, #e9e2d3)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.28), 0 6px 12px -8px rgba(0,0,0,0.6)",
      }}
    >
      <span
        aria-hidden
        className="size-2 rounded-full ring-1 ring-black/15"
        style={{ backgroundColor: color }}
      />
      {name}
    </a>
  );
}

export function TechStack() {
  return (
    <section id="stack" className="scroll-mt-28">
      <Reveal>
        <MatHeading hand="I reach for">Things</MatHeading>
      </Reveal>

      <div className="mt-6 space-y-5">
        {categories.map((category, catIndex) => {
          const items = siteConfig.stack.filter((item) => item.category === category);
          if (items.length === 0) return null;

          return (
            <Reveal key={category} delay={catIndex * 0.05}>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:gap-4">
                <p className="w-20 shrink-0 pt-1 font-mono text-[11px] tracking-[0.16em] text-on-mat-soft uppercase">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item, index) => (
                    <StackSticker
                      key={item.name}
                      name={item.name}
                      color={item.color}
                      href={item.href}
                      tilt={index % 2 === 0 ? -1.5 : 1.5}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
