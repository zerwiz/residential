import {
  FeaturedProperties,
  Footer,
  Navigation,
  PageHero,
} from "../_components/luxury-sections";

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-24 md:pt-28">
        <PageHero
          eyebrow="Properties"
          title="A collection selected with restraint."
          subtitle="Architectural integrity, quiet grandeur, and a sense of place — presented with discretion."
          imageSrc="/estate.jpg"
        />
        <FeaturedProperties />
      </main>
      <Footer />
    </div>
  );
}

