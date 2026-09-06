import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { FramePad } from "@/components/grid";
import { getWritingPosts } from "@/lib/writing";
import { cn } from "@/lib/utils";

export async function WritingSection() {
  const posts = await getWritingPosts(4);

  return (
    <section id="writing" className="scroll-mt-16">
      <Reveal>
        <FramePad className="pt-6 pb-3 sm:pt-8 sm:pb-4">
          <div className="flex items-end justify-between gap-3">
            <h2 className="section-title">Writing</h2>
            <a
              href={siteConfig.writing.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-0.5 inline-flex items-center gap-1 text-xs text-muted transition hover:text-foreground sm:text-sm"
            >
              {siteConfig.writing.cta}
              <ArrowUpRight size={14} />
            </a>
          </div>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-muted sm:mt-2.5 sm:text-[15px]">
            {siteConfig.writing.description}
          </p>
        </FramePad>

        {posts.length > 0 ? (
          <ul className="border-t border-dashed border-border">
            {posts.map((post, index) => {
              const isLast = index === posts.length - 1;
              return (
                <li
                  key={post.href}
                  className={cn(
                    "border-dashed border-border",
                    !isLast && "border-b",
                  )}
                >
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-4 px-3 py-3.5 transition-colors hover:bg-black/[0.03] sm:px-4 sm:py-4 dark:hover:bg-white/[0.04]"
                  >
                    <span className="min-w-0">
                      <span className="block text-[15px] font-medium tracking-tight text-foreground group-hover:underline sm:text-base">
                        {post.title}
                      </span>
                      {post.brief ? (
                        <span className="mt-1 block line-clamp-1 text-[13px] text-muted">
                          {post.brief}
                        </span>
                      ) : null}
                    </span>
                    {post.dateLabel ? (
                      <span className="shrink-0 pt-0.5 font-mono text-[10px] text-muted-soft sm:text-[11px]">
                        {post.dateLabel}
                      </span>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="border-t border-dashed border-border px-3 py-4 text-sm text-muted sm:px-4">
            Latest notes live on Hashnode.
          </div>
        )}
      </Reveal>
    </section>
  );
}
