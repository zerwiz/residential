import { CTASection, Footer, Navigation } from "../_components/luxury-sections";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-24 md:pt-28">
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

