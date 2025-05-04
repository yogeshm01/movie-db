import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#121212] text-white py-8 mt-8">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Footer Content */}
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="flex items-center justify-center mb-4 md:mb-0">
            <img
              src="assets/MovieDB4.png"
              alt="Movie DB Logo"
              className="w-16 h-auto rounded-md mr-2"
            />
            <h2 className="text-xl font-bold text-cyan-300">Movie DB</h2>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col md:flex-row gap-6 text-center md:text-left">
            <Link to="/trending" className="hover:text-cyan-300 transition duration-300">
              Trending
            </Link>
            <Link to="/browse" className="hover:text-cyan-300 transition duration-300">
              Browse
            </Link>
            <Link to="/upcoming-movies" className="hover:text-cyan-300 transition duration-300">
              Upcoming Movies
            </Link>
            <Link to="/watch-later" className="hover:text-cyan-300 transition duration-300">
              Watch Later
            </Link>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#3c3c3c] pt-4 mt-6 text-center">
          <p className="text-sm text-[#cccccc]">
            &copy; {new Date().getFullYear()} Movie DB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
