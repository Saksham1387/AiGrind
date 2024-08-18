
import { CommunitySection } from './DiscordCommunity/Community';
import Features from './FeatureSection/Features';
import HeroSection from './HeroSection/Hero';
import NavBar from './NavBar/NavBar';

export default function HomePage() {
    return ( 
                <div>
                <NavBar />
                <HeroSection />
                <Features />
                <CommunitySection />
                </div> 
    );
}
