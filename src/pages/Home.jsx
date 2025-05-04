import Navbar from "../components/Navbar";
import Trending from "../components/Home/trending";
import Browse from "../components/Home/browse";
import Upcoming from "../components/Home/upcoming";
import Footer from "../components/Footer/footer";


const Home = () => {
  
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/*---- Navbar -----*/}
      <div className="pt-2">
        <Navbar />
      </div>
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
