import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import PrayerTimes from "../pages/PrayerTimes";
import Qibla from "../pages/Qibla";
import Duas from "../pages/Duas";
import Calendar from "../pages/Calendar";
import Blog from "../pages/Blog";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/duas" element={<Duas />} />
      <Route path="/prayer-times" element={<PrayerTimes />} />
      <Route path="/qibla" element={<Qibla />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/about" element={<About />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;