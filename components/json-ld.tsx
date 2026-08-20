import { projects, type Project } from "@/content/projects";
import { siteConfig } from "@/content/site";

function Ld({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.profileImage}`,
    jobTitle: siteConfig.role,
    description: siteConfig.summary,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressCountry: "IN",
    },
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.x,
      siteConfig.links.blog,
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
  };

  return (
    <>
      <Ld data={person} />
      <Ld data={website} />
    </>
  );
}

export function HomeJsonLd() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Selected work by ${siteConfig.name}`,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: `${siteConfig.url}/projects/${project.slug}`,
      description: project.oneLiner,
    })),
  };

  return <Ld data={itemList} />;
}

export function ProjectJsonLd({ project }: { project: Project }) {
  const url = `${siteConfig.url}/projects/${project.slug}`;

  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    url,
    description: project.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: project.badge === "macOS" ? "macOS" : "Web",
    datePublished: project.year,
    ...(project.image ? { image: `${siteConfig.url}${project.image}` } : {}),
    ...(project.github ? { codeRepository: project.github } : {}),
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: project.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <Ld data={app} />
      <Ld data={breadcrumb} />
    </>
  );
}
