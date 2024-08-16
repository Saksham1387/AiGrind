
import { CommunitySection } from './DiscordCommunity/Community';
import HeroSection from './HeroSection/Hero';
import NavBar from './NavBar/NavBar';

export default function HomePage() {
    return ( 
                <div>
                <NavBar />
                <HeroSection />
                <CommunitySection />
                </div> 
    );
}
