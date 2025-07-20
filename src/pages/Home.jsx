import React from "react";
import Navbar from "../components/Navbar";
import Trending from "../components/Home/trending";
import Browse from "../components/Home/browse";
import Upcoming from "../components/Home/upcoming";
import Footer from "../components/Footer/footer";


const Home = ({user}) => {
  
  return (
    <div className="bg-black text-white min-h-screen flex flex-col pt-20">
      {/*---- Navbar -----*/}
        <Navbar user={user} />

      {/*---- Welcome Message ----*/}
      {user && (
        <div className="text-center text-2xl font-semibold mt-10 mb-2">
          👋 Welcome back, <span className="text-[#00FFFF]">{user.displayName}</span>!
        </div>
      )}

      {/*------------ Trending -----------*/}
      <div>
        <Trending />
      </div>


      {/*--------- BROWSE ---------*/}
      <div>
        <Browse />
      </div>

      {/*-------- UPCOMING --------*/}
      <div>
        <Upcoming />
      </div>

      <div>
        <Footer />
      </div>

    </div>

  );
};

export default Home;
