import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Blog from './pages/Blog';
import About from './pages/About';
import JoinClub from './pages/JoinClub';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import { scrollToTop } from './utils/scrollUtils';

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:slug" element={<EventDetails />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/about" element={<About />} />
      <Route path="/join" element={<JoinClub />} />
    </Routes>
  );
};

export default AppRoutes;
