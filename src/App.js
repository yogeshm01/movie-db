import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import NavBar from './components/NavBar'; // Import the NavBar
import Home from "./pages/Home"; // Home component for the main page
import Trending from './pages/Trending';
import Browse from './pages/Browse';
import Upcoming from './pages/Upcoming';
import WatchLater from './pages/WatchLater';
import NavBar from './components/Navbar'; // Import the NavBar

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />  {/* Display the Navbar */}
        
        {/* Define your routes */}
        <Routes>
          {/* This route makes Home the default page when the app loads */}
          <Route path="/" element={<Home />} /> 
          <Route path="/trending" element={<Trending />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/upcoming-movies" element={<Upcoming />} />
          <Route path="/watch-later" element={<WatchLater />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
