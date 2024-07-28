import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import Workflow from './Workflow';
import Testimonials from './Testimonials';
import Navbar from './Navbar';


export default function HomePage() {
    return (
        <div className='bg-darkgray text-white'>
        <Navbar />
        <div className="max-w-7xl mx-auto pt-20 px-6">
          <HeroSection />
          <FeatureSection />
          <Workflow />
          {/* <Testimonials /> */}
        </div>
        </div>
      )
}