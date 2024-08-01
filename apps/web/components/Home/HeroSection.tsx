import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Welcome to
        <span className="bg-gradient-to-r from-gray-500 to-gray-800 text-transparent bg-clip-text">
          {" "}
          AIgrind
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Transform your AI and ML skills with our comprehensive coding platform and expert mentorship. Master your interview prep and land your dream ML job today!
      </p>
      <div className="flex justify-center my-10 mb-20">
        <button
          onClick={() => {
            router.push("/signup");
          }}
          className="py-3 px-4 mx-3 rounded-md border"
        >
          Get Started
        </button>
      </div>
      <div className="flex flex-row mt-10 justify-center bg-darkgray gap-36 mb-16">
        <div className="flex flex-col items-center mx-4 ">
        <iframe 
        src='https://flo.uri.sh/visualisation/18897770/embed' 
        title='Interactive or visual content' 
        className='flourish-embed-iframe' 
        frameBorder='0' 
        scrolling='no' 
        style={{width:"100%" ,height:"600px"} }
        sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'>
        </iframe>
          
        </div>
        <div className="flex flex-col items-center mx-4">
          <iframe
            src="https://flo.uri.sh/visualisation/18897552/embed"
            title="Interactive or visual content"
            className="flourish-embed-iframe ml-10"
            frameBorder="0"
            scrolling="no"
            style={{ width: "600px", height: "600px" }}
            sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          ></iframe>
          
        </div>





      
      </div>
    </div>
  );
};

export default HeroSection;