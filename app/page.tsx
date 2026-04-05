import { Hero } from "@/components/home/hero";
import { Philosophy } from "@/components/home/philosophy";
import { AboutSnapshot } from "@/components/home/about-snapshot";
import { ServicesGrid } from "@/components/home/services-grid";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Stats } from "@/components/home/stats";
import { WhyLandschaft } from "@/components/home/why-landschaft";
import { CTA } from "@/components/home/cta";
import { FAQ } from "@/components/home/faq";
import { FadeIn } from "@/components/animations/fade-in";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Hero />
      <FadeIn><Philosophy /></FadeIn>
      <FadeIn><AboutSnapshot /></FadeIn>
      <FadeIn><Stats /></FadeIn>
      <FadeIn><ServicesGrid /></FadeIn>
      <FadeIn><FeaturedProjects /></FadeIn>
      <FadeIn><WhyLandschaft /></FadeIn>
      <FadeIn><FAQ /></FadeIn>
      <FadeIn><CTA /></FadeIn>
    </div>
  );
}
