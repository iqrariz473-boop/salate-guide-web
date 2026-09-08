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

            {/* Home */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* Prayer Times */}
            <Route
              path="/prayer-times"
              element={<PrayerTimes />}
            />

            {/* Cities */}
            <Route
              path="/cities"
              element={<Cities />}
            />

            {/* About */}
            <Route
              path="/about"
              element={<About />}
            />

            {/* Pillars */}
            <Route
              path="/pillars"
              element={<Pillars />}
            />

            {/* Prayer Guide */}
            <Route
              path="/prayer-guide"
              element={<PrayerGuide />}
            />

            {/* Qibla */}
            <Route
              path="/qibla"
              element={<Qibla />}
            />

            {/* Duas */}
            <Route
              path="/duas"
              element={<Duas />}
            />

            {/* Contact */}
            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* Privacy */}
            <Route
              path="/privacy"
              element={<Privacy />}
            />

            {/* Terms */}
            <Route
              path="/terms"
              element={<Terms />}
            />

            {/* 404 */}
            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>
        </main>

        <Footer />

      </div>
    </LocationProvider>
  );
}

export default App;