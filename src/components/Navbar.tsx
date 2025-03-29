import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../logo_white.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Initial animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const leftNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Teams', path: '/teams' },
    { name: 'Events', path: '/events' },
    { name: 'Posts', path: '/posts' },
  ];

  const rightNavItems = [
    { name: 'Blogs', path: '/blogs' },
    { name: 'Projects', path: '/projects' },
    { name: 'Registrations', path: '/registrations' },
    { name: 'About Us', path: '/about' }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavigation = (path: string) => {
    if (location.pathname === path) {
      scrollToTop();
      return;
    }
    navigate(path);
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  return (
    <nav 
      className="fixed w-full z-50 transition-all duration-700 ease-in-out"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-50">
            <Link 
              to="/" 
              className="relative group transition-transform duration-300 flex items-center justify-center"
              onClick={() => handleNavigation('/')}
            >
              <img 
                src={logo} 
                alt="Tensor Logo" 
                className="h-17 w-16 object-contain relative z-10 transition-all duration-300 group-hover:scale-125"
              />
            </Link>
          </div>

          {/* Left Navigation */}
          <div className={`hidden md:flex flex-1 items-center justify-end space-x-20 pr-24 nav-items ${isExpanded ? 'nav-expanded' : 'nav-collapsed'}`}>
            {leftNavItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`navbar-link text-lg tracking-wide whitespace-nowrap transition-all duration-500 transform cyberpunk-text uppercase ${
                  isActivePath(item.path)
                    ? 'text-white font-semibold active scale-110'
                    : 'text-gray-300 hover:text-white hover:font-semibold hover:scale-125'
                } nav-item-left`}
                style={{ '--item-index': index } as React.CSSProperties & { '--item-index': number }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Navigation */}
          <div className={`hidden md:flex flex-1 items-center justify-start space-x-20 pl-24 nav-items ${isExpanded ? 'nav-expanded' : 'nav-collapsed'}`}>
            {rightNavItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`navbar-link text-lg tracking-wide whitespace-nowrap transition-all duration-500 transform cyberpunk-text uppercase ${
                  isActivePath(item.path)
                    ? 'text-white font-semibold active scale-110'
                    : 'text-gray-300 hover:text-white hover:font-semibold hover:scale-125'
                } nav-item-right`}
                style={{ '--item-index': index } as React.CSSProperties & { '--item-index': number }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-400 hover:text-white focus:outline-none transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${isOpen ? 'open' : ''}`}
      >
        <div className="flex flex-col items-center justify-start pt-16 space-y-6">
          {[...leftNavItems, ...rightNavItems].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => {
                handleNavigation(item.path);
                toggleMenu();
              }}
              className={`mobile-menu-item ${
                isActivePath(item.path) ? 'active' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;