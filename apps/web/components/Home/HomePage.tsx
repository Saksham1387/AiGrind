import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import Workflow from './Workflow';
import Testimonials from './Testimonials';
import Footer from './Footer';

export default function HomePage() {
    return (
        <>
        <Navbar />
        <div className="max-w-7xl mx-auto pt-20 px-6">
          <HeroSection />
          <FeatureSection />
          <Workflow />
          {/* <Testimonials /> */}
          {/* <Footer /> */}
        </div>
        </>
      )
}