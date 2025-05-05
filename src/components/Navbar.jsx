import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useState } from 'react';

function NavBar() {
    const [query, setQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="bg-[#121212] px-4 md:px-8 py-4 fixed top-0 left-0 right-0 z-50 shadow-md">
            <div className="max-w-[1200px] mx-auto flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center no-underline text-cyan-300 text-xl font-bold">
                    <img
                        src="assets/MovieDB4.png"
                        alt="Movie DB Logo"
                        className="w-[40px] md:w-[60px] h-auto rounded-md mr-2"
                    />
                </Link>

                {/* SearchBar (Visible on md and up) */}
                <div className="hidden md:flex flex-1 max-w-[600px] mx-4">
                    <SearchBar />
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-6 text-white text-base font-medium items-center">
                    <li><Link to="/trending" className="hover:text-cyan-300 transition hover:scale-105">Trending</Link></li>
                    <li><Link to="/browse" className="hover:text-cyan-300 transition hover:scale-105">Browse</Link></li>
                    <li><Link to="/upcoming-movies" className="hover:text-cyan-300 transition hover:scale-105">Upcoming</Link></li>
                    <li><Link to="/watch-later" className="hover:text-cyan-300 transition hover:scale-105">Watch Later</Link></li>
                </ul>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {menuOpen ? (
                            // Close (X) Icon
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Hamburger Icon
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pt-4 pb-2 bg-[#1c1c1c] text-white rounded-md mt-2 shadow-lg">
                    <ul className="flex flex-col gap-4 text-base font-medium">
                        <li><Link to="/trending" onClick={() => setMenuOpen(false)}>Trending</Link></li>
                        <li><Link to="/browse" onClick={() => setMenuOpen(false)}>Browse</Link></li>
                        <li><Link to="/upcoming-movies" onClick={() => setMenuOpen(false)}>Upcoming</Link></li>
                        <li><Link to="/watch-later" onClick={() => setMenuOpen(false)}>Watch Later</Link></li>
                    </ul>
                    <div className="mt-4">
                        <SearchBar />
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavBar;
