import './Home.css'

export default function Home() {
  return (
    <div className="app-container">

      {/* Background video */}
      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onError={(e) => {
          console.error('Video failed to load:', e);
          console.log('Video src:', e.currentTarget.src);
        }}
        onLoadStart={() => console.log('Video started loading')}
        onCanPlay={() => console.log('Video can play')}
      >
        <source src="/bg.mp4" type="video/mp4" />
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
            onClick={() => alert("Login / Sign in clicked")}
          >
            Get Started
          </button>

          <button
            className="secondary-button"
            onClick={() => alert("Learn More clicked")}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
