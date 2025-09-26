import { useNavigate } from 'react-router-dom';
import './Home.css'

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="app-container">

      {/* Background image */}
      <img
        className="background-image"
        src={`${import.meta.env.BASE_URL}home_bg.png`}
        alt="Gas Detection Background"
        onError={(e) => {
          console.error('Image failed to load:', e);
          e.currentTarget.style.display = 'none';
        }}
      />

      {/* Saturation overlay */}
      <div className="saturation-overlay" />

      {/* Dark overlay */}
      <div className="dark-overlay" />

      {/* Text backdrop for better contrast */}
      <div className="text-backdrop" />

      {/* Left-aligned content */}
      <div className="content-container">
        <h1 className="main-title gradient-text">
           Gas Compressor Stations
          <br />
          <span className="subtitle">AI powered</span>
        </h1>

        <p className="description">
        From costly shutdowns to continuous, reliable operations powered by AI-driven insights
        </p>

        <div className="cta-buttons">
          <button
            className="primary-button"
            onClick={() => navigate('/login')}
          >
            Get Started
          </button>

          <button
            className="secondary-button"
            onClick={() => alert('Learn More functionality coming soon!')}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
