import { Navbar } from "@/components/shared/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Comparison } from "@/components/landing/comparison";
import { Examples } from "@/components/landing/examples";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/shared/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="noise-bg">
        <Hero />
        <Features />
        <Comparison />
        <Examples />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
