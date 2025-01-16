import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Blog from './pages/Blog';
import About from './pages/About';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;
