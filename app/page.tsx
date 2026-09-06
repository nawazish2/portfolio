import { Mat } from "@/components/desk/mat";
import { PillNav } from "@/components/desk/pill-nav";
import { StickerLayer, StickerStrip } from "@/components/desk/sticker-layer";
import { MatHeading } from "@/components/desk/paper";
import { Hero } from "@/components/hero";
import { GitHubActivity } from "@/components/github-activity";
import { WorkSection } from "@/components/work-section";
import { WritingSection } from "@/components/writing-section";
import { TechStack } from "@/components/tech-stack";
import { ProjectCard } from "@/components/project-card";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Mat />
      <PillNav />

      <div className="relative z-10">
        <StickerLayer />

        <main className="mx-auto w-full max-w-5xl px-4 pt-24 pb-8 sm:px-6 sm:pt-28">
          <Hero />

          <div className="mt-12 sm:mt-14">
            <GitHubActivity />
          </div>

          <div className="mt-20 sm:mt-24">
            <WorkSection />
          </div>

          <div className="mt-20 sm:mt-24">
            <section id="projects" className="scroll-mt-28">
              <Reveal>
                <MatHeading hand="pinned up">Projects</MatHeading>
              </Reveal>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                  <ProjectCard key={project.slug} project={project} index={index} />
                ))}
              </div>
            </section>
          </div>

          <div className="mt-20 sm:mt-24">
            <WritingSection />
          </div>

          <div className="mt-16 sm:mt-20 xl:hidden">
            <StickerStrip />
          </div>

          <div className="mt-20 sm:mt-24">
            <TechStack />
          </div>

          <div className="mt-20 sm:mt-24">
            <ContactSection />
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}
