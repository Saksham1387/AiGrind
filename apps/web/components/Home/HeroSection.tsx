
const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Welcome to 
        <span className="bg-gradient-to-r from-gray-700 to-gray-900 text-transparent bg-clip-text">
          {" "}
          DataDex
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
      Transform your AI and ML skills with our comprehensive coding platform and expert mentorship. Master your interview prep and land your dream ML job today!
      </p>
      <div className="flex justify-center my-10">
        <a
          href="#"
          className="py-3 px-4 mx-3 rounded-md border"
        >
          Get Started
        </a>
      </div>
      <div className="flex mt-10 justify-center">
      </div>
    </div>
  );
};

export default HeroSection;