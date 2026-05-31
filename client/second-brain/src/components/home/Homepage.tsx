import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import Hero from "./Hero";
import ImageSection from "./ImageSection";

const Homepage = () => {
  return (
    <div>
      <div className='w-300 container mx-auto'>
        <Hero />
        <ImageSection />
        <FeaturesSection />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
