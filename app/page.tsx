import { Header } from "@/components/header";
import { CreditsBand } from "@/components/footer";
import { SiteFrame } from "@/components/site-frame";
import { FrameColumn, FramePad, HRule } from "@/components/grid";
import { Hero } from "@/components/hero";
import { AboutSection, ContactSection } from "@/components/about-section";
import { ProjectCard } from "@/components/project-card";
import { TechStack } from "@/components/tech-stack";
import { GitHubActivity } from "@/components/github-activity";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { HomeJsonLd } from "@/components/json-ld";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <SiteFrame>
      <Header />
      <HomeJsonLd />

      <FrameColumn className="mt-12">
        <Hero />
      </FrameColumn>

      <HRule />

      <FrameColumn>
        <AboutSection />
      </FrameColumn>

      <HRule />

      <FrameColumn>
        <ContactSection />
      </FrameColumn>

      <HRule />

      <FrameColumn>
        <section id="projects" className="scroll-mt-16">
          <Reveal>
            <FramePad className="pt-6 pb-3 sm:pt-8 sm:pb-4">
              <h2 className="section-title">Projects</h2>
            </FramePad>
          </Reveal>
          <div className="grid grid-cols-1 border-t border-dashed border-border md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                total={projects.length}
              />
            ))}
          </div>
        </section>
      </FrameColumn>

      <HRule />

      <FrameColumn>
        <section id="stack" className="scroll-mt-16">
          <TechStack />
        </section>
      </FrameColumn>

      <HRule />

      <FrameColumn>
        <section className="scroll-mt-16">
          <GitHubActivity />
        </section>
      </FrameColumn>

      <HRule />

      <FrameColumn>
        <CtaSection />
      </FrameColumn>

      <HRule />

      <FrameColumn>
        <CreditsBand />
      </FrameColumn>
    </SiteFrame>
  );
}
