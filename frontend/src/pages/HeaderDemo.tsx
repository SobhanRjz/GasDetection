import ModernHeader from '../components/ModernHeader';
import '../components/ModernHeader.css';
import './HeaderDemo.css';

export default function HeaderDemo() {
  return (
    <div className="header-demo-page">
      <ModernHeader />

      {/* Demo Content */}
      <main className="header-demo-main">
        <div className="header-demo-card">
          <h1 className="header-demo-title">
            Modern Header Demo
          </h1>

          <div className="header-demo-features">
            <div className="feature-card-blue">
              <h3 className="feature-title feature-title-blue">Responsive Design</h3>
              <p className="feature-description">The header adapts beautifully across all screen sizes with a mobile-first approach.</p>
            </div>

            <div className="feature-card-green">
              <h3 className="feature-title feature-title-green">Accessibility First</h3>
              <p className="feature-description-green">Built with ARIA labels, focus management, and keyboard navigation support.</p>
            </div>

            <div className="feature-card-purple">
              <h3 className="feature-title feature-title-purple">Modern Styling</h3>
              <p className="feature-description-purple">Features glassmorphism effects, smooth animations, and contemporary design patterns.</p>
            </div>
          </div>

          <div className="key-features-section">
            <h3 className="key-features-title">Key Features</h3>
            <ul className="key-features-list">
              <li className="key-feature-item">
                <span className="key-feature-bullet"></span>
                Centered max-width container (6xl)
              </li>
              <li className="key-feature-item">
                <span className="key-feature-bullet"></span>
                Brand group with circular logo icon
              </li>
              <li className="key-feature-item">
                <span className="key-feature-bullet"></span>
                Desktop navigation links (≥1024px)
              </li>
              <li className="key-feature-item">
                <span className="key-feature-bullet"></span>
                Prominent CTA button with arrow icon
              </li>
              <li className="key-feature-item">
                <span className="key-feature-bullet"></span>
                Glassmorphism and neumorphic styling
              </li>
              <li className="key-feature-item">
                <span className="key-feature-bullet"></span>
                Smooth hover and focus animations
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
