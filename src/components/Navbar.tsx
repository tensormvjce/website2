import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../logo_white.png';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  // Initial animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const leftNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Teams', path: '/teams' },
    { name: 'Events', path: '/events' },
    { name: 'Posts', path: '/posts' },
    { name: 'Blogs', path: '/blogs' },
  ];

  const rightNavItems = [
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
                className="h-16 w-16 object-contain relative z-10 transition-all duration-300 group-hover:scale-125"
              />
            </Link>
          </div>

          {/* Left Navigation */}
          <div className={`hidden md:flex flex-1 items-center justify-end space-x-16 pr-20 nav-items ${isExpanded ? 'nav-expanded' : 'nav-collapsed'}`}>
            {leftNavItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`navbar-link text-lg tracking-wide whitespace-nowrap transition-all duration-300 ${
                  isActivePath(item.path)
                    ? 'text-white font-semibold active scale-105'
                    : 'text-gray-300 hover:text-white hover:font-semibold hover:scale-105'
                } nav-item-left`}
                style={{ '--item-index': index } as React.CSSProperties & { '--item-index': number }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Navigation */}
          <div className={`hidden md:flex flex-1 items-center justify-start space-x-16 pl-20 nav-items ${isExpanded ? 'nav-expanded' : 'nav-collapsed'}`}>
            {rightNavItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`navbar-link text-lg tracking-wide whitespace-nowrap transition-all duration-300 ${
                  isActivePath(item.path)
                    ? 'text-white font-semibold active scale-105'
                    : 'text-gray-300 hover:text-white hover:font-semibold hover:scale-105'
                } nav-item-right`}
                style={{ '--item-index': index } as React.CSSProperties & { '--item-index': number }}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Authentication Buttons */}
            <div className={`flex items-center space-x-4 nav-item-right`} 
              style={{ '--item-index': rightNavItems.length } as React.CSSProperties & { '--item-index': number }}>
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white text-sm">
                    {currentUser.displayName || currentUser.email}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="navbar-button text-red-300 hover:text-red-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleLogin}
                  className="navbar-button text-purple-300 hover:text-purple-200"
                >
                  Login
                </button>
              )}
              {isAdmin && (
                <Link 
                  to="/admin"
                  className="navbar-button text-blue-300 hover:text-blue-200"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
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
          
          {/* Mobile Authentication Buttons */}
          <div className="flex flex-col items-center space-y-4 mt-8 w-full px-6">
            {currentUser ? (
              <>
                <span className="text-white text-lg mb-2">
                  {currentUser.displayName || currentUser.email}
                </span>
                <button 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="navbar-button text-red-300 hover:text-red-200 w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => {
                  handleLogin();
                  toggleMenu();
                }}
                className="navbar-button text-purple-300 hover:text-purple-200 w-full"
              >
                Login
              </button>
            )}
            {isAdmin && (
              <Link 
                to="/admin"
                onClick={toggleMenu}
                className="navbar-button text-blue-300 hover:text-blue-200 w-full text-center"
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;