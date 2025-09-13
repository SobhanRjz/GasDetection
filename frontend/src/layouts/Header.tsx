import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
    { path: '/about', label: 'About', icon: 'ℹ️' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🔥</span>
          <span className="logo-text">Gas Safety</span>
        </Link>

        <nav className="nav">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button className="notification-btn">
            <span className="notification-icon">🔔</span>
            <span className="notification-badge">3</span>
          </button>

          <div className="user-menu">
            <button className="user-btn">
              <span className="user-avatar">👤</span>
              <span className="user-name">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
