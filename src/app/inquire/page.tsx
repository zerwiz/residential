import { Footer, InquireSection, Navigation } from "../_components/luxury-sections";

export default function InquirePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-24 md:pt-28">
        <InquireSection />
      </main>
      <Footer />
    </div>
  );
}

