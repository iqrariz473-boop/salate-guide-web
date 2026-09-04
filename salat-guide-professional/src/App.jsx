import { Routes, Route } from "react-router-dom";
import { LocationProvider } from "./context/LocationContext.jsx";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import PrayerTimes from "./pages/PrayerTimes.jsx";
import Cities from "./pages/Cities.jsx";
import About from "./pages/About.jsx";
import Pillars from "./pages/Pillars.jsx";
import PrayerGuide from "./pages/PrayerGuide.jsx";
import Qibla from "./pages/Qibla.jsx";
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Duas from "./pages/Duas.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <LocationProvider>
      <div className="app">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prayer-times" element={<PrayerTimes />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/about" element={<About />} />
            <Route path="/pillars" element={<Pillars />} />
            <Route path="/prayer-guide" element={<PrayerGuide />} />
            <Route path="/qibla" element={<Qibla />} />

            {/* Dua Page */}
            <Route path="/duas" element={<Duas />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </LocationProvider>
  );
}

export default App;