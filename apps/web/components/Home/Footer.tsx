import { scrollToComponent } from "./Navbar";

const Footer = () => {
  return (
    <footer className="w-fulltext-black ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href=""
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src="/Main-logo.png" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              AIgrind
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 text-black">
            <li>
              <button
                onClick={(e) => {
                  scrollToComponent("features",e);
                }}
                className="hover:underline me-4 md:me-6"
              >
                About
              </button>
            </li>
            <li>
              <button className="hover:underline me-4 md:me-6">
                Privacy Policy
              </button>
            </li>
            <li>
              <button className="hover:underline me-4 md:me-6">
                Licensing
              </button>
            </li>
            <li>
              <button className="hover:underline">
                Contact
              </button>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
          AIgrind
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
