import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"; 
import Trending from './pages/Trending';
import Browse from './pages/Browse';
import Upcoming from './pages/Upcoming';
import WatchLater from './pages/WatchLater';
import NavBar from './components/Navbar'; 
import MovieDetail from "./pages/MovieDetail";
import SearchBar from "./components/SearchBar";
import SearchResults from "./pages/SearchResult";
import ActorDetail from "./pages/ActorDetail"; 

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; 


function App() {
  const [user, setUser] = useState(null);

  // Track Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log("User is signed in:", currentUser);
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);


  return (
    <div className="App">
      <Router>
        <NavBar user={user}/>  {/* Display the Navbar */}
        
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<Home user={user}/>} /> 
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
