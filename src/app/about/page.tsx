import {
  EditorialStatement,
  Footer,
  Navigation,
  PageHero,
  StatsSection,
} from "../_components/luxury-sections";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-24 md:pt-28">
        <PageHero
          eyebrow="About"
          title="Where architecture becomes artistry."
          subtitle="Maison is a curator first — assembling residences that elevate the everyday through light, proportion, and craft."
          imageSrc="/estate.jpg"
        />
        <EditorialStatement />
        <StatsSection />
      </main>
      <Footer />
    </div>
  );
}

