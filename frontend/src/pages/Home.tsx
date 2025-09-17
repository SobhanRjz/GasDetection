import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './Home.css'

export default function Home() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => {
        video.setAttribute('data-loaded', 'true');
      };
      
      video.addEventListener('canplay', handleCanPlay);
      return () => video.removeEventListener('canplay', handleCanPlay);
    }
  }, []);

  return (
    <div className="app-container">

      {/* Background video with preload optimization */}
      <video
        ref={videoRef}
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={`${import.meta.env.BASE_URL}login-bg.jpg`}
        onError={(e) => {
          console.error('Video failed to load:', e);
          e.currentTarget.style.display = 'none';
        }}
      >
        <source src={`${import.meta.env.BASE_URL}bg.mp4`} type="video/mp4" />
        <source src="./bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="dark-overlay" />

      {/* Left-aligned content */}
      <div className="content-container">
        <h1 className="main-title gradient-text">
          Gas Safety
          <br />
          <span className="subtitle">Decision Support</span>
        </h1>

        <p className="description">
          Advanced monitoring and decision support system for gas safety operations
        </p>

        <div className="cta-buttons">
          <button
            className="modern-button"
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
