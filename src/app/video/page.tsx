import { Footer, Navigation } from "../_components/luxury-sections";

export default function VideoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-24 md:pt-28">
        <section className="relative min-h-[80vh] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-white/95" />

          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
            <p className="font-sans-custom text-[11px] font-light tracking-wide-editorial uppercase text-white/85 mb-6">
              Film
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-editorial text-white leading-[1.08] max-w-3xl">
              A moving portrait of exceptional living.
            </h1>
            <p className="font-sans-custom text-[15px] md:text-[16px] font-light text-white/80 leading-relaxed mt-7 max-w-2xl">
              Add your video to <span className="text-white">public/hero.mp4</span>{" "}
              (and optionally <span className="text-white">public/hero-poster.jpg</span>)
              to replace this background.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

