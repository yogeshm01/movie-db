import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import NavBar from './components/NavBar'; // Import the NavBar
import Home from "./pages/Home"; // Home component for the main page
import Trending from './pages/Trending';
import Browse from './pages/Browse';
import Upcoming from './pages/Upcoming';
import WatchLater from './pages/WatchLater';
import NavBar from './components/Navbar'; // Import the NavBar
import MovieDetail from "./pages/MovieDetail";
import SearchBar from "./components/SearchBar"; // Import the SearchBar
import SearchResults from "./pages/SearchResult";
import ActorDetail from "./pages/ActorDetail"; // Import the ActorDetail page

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />  {/* Display the Navbar */}
        
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/trending" element={<Trending />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/upcoming-movies" element={<Upcoming />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/actor/:id" element={<ActorDetail />} />

          <Route path="/search" element={<SearchResults />} />
          <Route path="/search" element={<SearchBar />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
