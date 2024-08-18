import Navbar from "../components/Landing/Navbar";
import Hero from "../components/Landing/Hero";
import Analytics from "../components/Landing/Analytics";
import Newsletter from "../components/Landing/Newsletter";
import Cards from "../components/Landing/Cards";
import Footer from "../components/Landing/Footer";
function App() {
  return (
    <div className="bg-gray-950">
      <Navbar />
      <Hero />
      <Analytics />
      <Newsletter />
      <Cards />
      <Footer />
    </div>
  );
}

export default App;
