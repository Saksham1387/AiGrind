import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-7 p-4 bg-white shadow-md bg-[#f7f7f8]">
      <a href="#" className="flex items-center px-[170px]">
        <img src="new-logo.png" alt="Logo" className="w-12 h-12" />
        <span className="text-black text-3xl font-semibold">AIgrind</span>
      </a>
      <div className="flex items-center space-x-4 pr-[190px]">
        <a
          href="#"
          className="bg-white border border-blue-600 text-blue-600 py-3 px-8 rounded-full text-lg font-medium hover:bg-blue-50 transition"
        >
          Sign In
        </a>
        <a
          href="#"
          className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-medium hover:bg-blue-500 transition"
        >
          Create an account
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
