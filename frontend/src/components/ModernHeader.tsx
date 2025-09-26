import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Simple inline SVG icons since lucide-react installation had issues
const BrandIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#8B5CF6"/>
    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
    { path: '/chart-monitoring', label: 'Chart Monitoring' },
    { path: '/about', label: 'About' },
    { path: '/settings', label: 'Settings' }
  ];

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
