import { Poppins } from "@next/font/google";
import { CommunitySection } from "./DiscordCommunity/Community";
import Features from "./FeatureSection/Features";
import HeroSection from "./HeroSection/Hero";
import NavBar from "./NavBar/NavBar";

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"], 
});

export default function HomePage() {
  return (
    <div className={poppins.className}>
      <NavBar />
      <HeroSection />
      <Features />
      <CommunitySection />
    </div>
  );
}
