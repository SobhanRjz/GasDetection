import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Simple inline SVG icons since lucide-react installation had issues

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#000"/>
    <path d="M8 12L16 12M16 12L12 8M16 12L12 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ModernHeader: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/alert-details', label: 'Alert Details' },
    { path: '/chart-monitoring', label: 'Chart Monitoring' },
    { path: '/about', label: 'About' },
    { path: '/settings', label: 'Settings' }
  ];

  // Get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/dashboard':
        return 'Dashboard';
      case '/chart-monitoring':
        return 'Chart Monitoring';
      case '/about':
        return 'About';
      case '/settings':
        return 'Settings';
      case '/alert-details':
        return 'Alert Details';
      default:
        return 'G.C.S';
    }
  };

  const handleContactClick = () => {
    // Scroll to contact section or open contact modal
    console.log('Contact button clicked');
  };

  return (
    <header className="modern-header">
      <div className="modern-header-container">
        {/* Brand Section - Left */}
        <div className="brand-section">
          <span className="brand-name">G.C.S</span>
          <span className="page-title">{getPageTitle()}</span>
        </div>

        {/* Navigation - Middle (Desktop) */}
        <nav className="nav-section">
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button - Right */}
        <div className="cta-section">
          <button
            className="cta-button"
            onClick={handleContactClick}
            aria-label="Contact us for more information"
          >
            <span className="cta-text">Contact Us</span>
            <ArrowRightIcon />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded="false"
        >
          <span className="mobile-menu-bar"></span>
          <span className="mobile-menu-bar"></span>
          <span className="mobile-menu-bar"></span>
        </button>
      </div>
    </header>
  );
};

export default ModernHeader;
