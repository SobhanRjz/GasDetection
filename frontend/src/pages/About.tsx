import './About.css';

export default function About() {
  const features = [
    {
      icon: '📊',
      title: 'Real-time Monitoring',
      description: 'Continuous monitoring of gas levels and environmental conditions with instant alerts.'
    },
    {
      icon: '🔧',
      title: 'Advanced Analytics',
      description: 'Comprehensive data analysis and trend identification for proactive safety measures.'
    },
    {
      icon: '🔔',
      title: 'Smart Alerts',
      description: 'Intelligent notification system that adapts to your safety requirements and preferences.'
    },
    {
      icon: '📱',
      title: 'Mobile Access',
      description: 'Access your safety dashboard from any device, anywhere, at any time.'
    },
    {
      icon: '🔒',
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with redundant systems for maximum reliability.'
    },
    {
      icon: '⚡',
      title: 'Fast Response',
      description: 'Rapid detection and response capabilities to minimize potential hazards.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Safety Officer',
      expertise: 'Gas Detection Systems'
    },
    {
      name: 'Michael Chen',
      role: 'Lead Engineer',
      expertise: 'IoT & Sensors'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Data Scientist',
      expertise: 'Analytics & AI'
    }
  ];

  return (
    <div className="about">
      <header className="about-header">
        <h1 className="about-title">About Gas Safety</h1>
        <p className="about-subtitle">
          Advanced gas detection and safety monitoring system designed for industrial and commercial environments
        </p>
      </header>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h2 className="section-title">Our Mission</h2>
          <p className="mission-text">
            To provide cutting-edge gas detection technology that ensures workplace safety and prevents
            hazardous incidents through intelligent monitoring, predictive analytics, and rapid response systems.
            We are committed to protecting lives and assets through innovation and reliability.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Section */}
      <section className="technology-section">
        <div className="technology-content">
          <h2 className="section-title">Our Technology</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <h3>Sensor Networks</h3>
              <p>
                Distributed sensor arrays with wireless connectivity for comprehensive coverage
                and real-time data transmission.
              </p>
            </div>
            <div className="tech-item">
              <h3>AI Analytics</h3>
              <p>
                Machine learning algorithms analyze patterns and predict potential hazards
                before they become critical.
              </p>
            </div>
            <div className="tech-item">
              <h3>Cloud Platform</h3>
              <p>
                Scalable cloud infrastructure for data storage, processing, and remote
                system management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2 className="section-title">Get in Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <h4>Support</h4>
              <p>24/7 technical support available</p>
              <a href="mailto:support@gassafety.com">support@gassafety.com</a>
            </div>
            <div className="contact-item">
              <h4>Sales</h4>
              <p>Learn about our solutions</p>
              <a href="mailto:sales@gassafety.com">sales@gassafety.com</a>
            </div>
            <div className="contact-item">
              <h4>Partnerships</h4>
              <p>Explore collaboration opportunities</p>
              <a href="mailto:partnerships@gassafety.com">partnerships@gassafety.com</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
