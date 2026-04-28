import {
  CTASection,
  EditorialStatement,
  FeaturedProperties,
  Footer,
  HeroSection,
  JournalSection,
  Navigation,
  SectionDivider,
  StatsSection,
} from "./_components/luxury-sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <SectionDivider />
        <FeaturedProperties />
        <EditorialStatement />
        <StatsSection />
        <JournalSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
