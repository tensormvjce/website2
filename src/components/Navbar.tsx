import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../logo_white.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Teams', path: '/teams' },
    { name: 'Events', path: '/events' },
  ];

  const rightNavItems = [
    { name: 'Blog', path: '/blog' },
    { name: 'Registrations', path: '/registrations' },
    { name: 'About Us', path: '/about' }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'navbar-glass' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Left Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-end space-x-16 pr-12">
            {leftNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`navbar-link text-lg tracking-wide ${
                  isActivePath(item.path)
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-white'
                } transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <Link 
              to="/" 
              className="relative group hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img 
                src={logo} 
                alt="Tensor Logo" 
                className="h-14 w-14 object-contain relative z-10"
              />
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-start space-x-16 pl-12">
            {rightNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`navbar-link text-lg tracking-wide ${
                  isActivePath(item.path)
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-white'
                } transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
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
        className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '96px' }}
      >
        <div className="flex flex-col items-center justify-start pt-8 space-y-8">
          {[...leftNavItems, ...rightNavItems].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`text-xl tracking-wide ${
                isActivePath(item.path)
                  ? 'text-white font-semibold'
                  : 'text-gray-300 hover:text-white'
              } transition-colors duration-200`}
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