import { Link } from 'react-router-dom';  
import './Navbar.css';

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        <img src="assets/MovieDB4.png" alt="Movie DB Logo" />
                    </Link>
                </div>
                
                <div className="nav-search">
                    <form action="" className="search-form">
                        <input type="text" placeholder="Search..." className="search-input" />
                        <button className="search-button">Search</button>
                    </form>
                </div>

                <div className="nav-links">
                    <ul>
                        <li><Link to="/trending">Trending</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                        <li><Link to="/upcoming-movies">Upcoming Movies</Link></li>
                        <li><Link to="/watch-later">Watch Later</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
