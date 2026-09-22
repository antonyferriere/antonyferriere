import { profile } from "../data/profile.mjs";
import { escapeHtml as e } from "./html.mjs";

export function renderMetadata() {
  const title = `${profile.name} — ${profile.role} · Côte d’Azur`;
  const description =
    "Chef de projet IT senior, Product Owner et profil hybride tech, produit et métier. Plus de 20 ans pour concevoir et piloter des solutions utiles. Nice, Sophia Antipolis, Côte d’Azur.";
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: profile.canonical,
    jobTitle: profile.role,
    description: profile.promise,
    email: profile.email,
    image: `${profile.canonical}images/antony-ferriere.webp`,
    sameAs: [profile.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cagnes-sur-Mer",
      addressRegion: "Provence-Alpes-Côte d’Azur",
      addressCountry: "FR",
    },
    knowsAbout: [
      "Gestion de projet IT",
      "Product Ownership",
      "Architecture applicative",
      "UX/UI",
      "Innovation logicielle",
      "Transformation numérique",
      "IA générative",
    ],
    alumniOf: [
      { "@type": "EducationalOrganization", name: "3iL / ITII" },
      { "@type": "EducationalOrganization", name: "ECEMA" },
    ],
  };
  return /* HTML */ `<title>${e(title)}</title>
    <meta name="description" content="${e(description)}" />
    <meta name="theme-color" content="#f3f0e8" />
    <meta name="author" content="${e(profile.name)}" />
    <meta name="color-scheme" content="light dark" />
    <link rel="canonical" href="${profile.canonical}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/icon-192.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta property="og:type" content="profile" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:title" content="${e(title)}" />
    <meta property="og:description" content="${e(description)}" />
    <meta property="og:url" content="${profile.canonical}" />
    <meta property="og:site_name" content="${e(profile.name)}" />
    <meta property="og:image" content="${person.image}" />
    <meta property="og:image:width" content="750" />
    <meta property="og:image:height" content="1000" />
    <meta property="og:image:alt" content="Portrait d’Antony Ferrière" />
    <meta property="profile:first_name" content="Antony" />
    <meta property="profile:last_name" content="Ferrière" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${e(title)}" />
    <meta name="twitter:description" content="${e(description)}" />
    <meta name="twitter:image" content="${person.image}" />
    <script type="application/ld+json">
      ${JSON.stringify(person).replace(/</g, "\\u003c")}
    </script>`;
}
