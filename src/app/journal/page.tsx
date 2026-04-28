import { Footer, JournalSection, Navigation } from "../_components/luxury-sections";

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-24 md:pt-28">
        <JournalSection />
      </main>
      <Footer />
    </div>
  );
}

