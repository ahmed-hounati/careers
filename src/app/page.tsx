import { CTASection } from "@/components/CtaSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <FeaturesSection />
        <CTASection />
      </div>
    </>
  );
}
