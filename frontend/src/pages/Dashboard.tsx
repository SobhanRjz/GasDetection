import { useState } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const [gasLevel, setGasLevel] = useState(45);
  const [temperature, setTemperature] = useState(23.5);
  const [alerts] = useState([
    { id: 1, message: 'Gas level above threshold', time: '2 min ago', severity: 'high' },
    { id: 2, message: 'Temperature fluctuation detected', time: '5 min ago', severity: 'medium' },
    { id: 3, message: 'System maintenance required', time: '1 hour ago', severity: 'low' },
  ]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Gas Detection Dashboard</h1>
        <p className="dashboard-subtitle">Real-time monitoring and alerts</p>
      </header>

      <div className="dashboard-grid">
        {/* Gas Level Card */}
        <div className="metric-card">
          <div className="metric-header">
            <h3 className="metric-title">Gas Level</h3>
            <span className={`metric-status ${gasLevel > 70 ? 'danger' : gasLevel > 50 ? 'warning' : 'safe'}`}>
              {gasLevel > 70 ? 'Danger' : gasLevel > 50 ? 'Warning' : 'Safe'}
            </span>
          </div>
          <div className="metric-value">
            <span className="value">{gasLevel}%</span>
            <span className="unit">PPM</span>
          </div>
          <div className="metric-bar">
            <div
              className="metric-fill"
              style={{ width: `${gasLevel}%` }}
            />
          </div>
        </div>

        {/* Temperature Card */}
        <div className="metric-card">
          <div className="metric-header">
            <h3 className="metric-title">Temperature</h3>
            <span className="metric-status safe">Normal</span>
          </div>
          <div className="metric-value">
            <span className="value">{temperature}°</span>
            <span className="unit">C</span>
          </div>
          <div className="metric-bar">
            <div
              className="metric-fill temperature"
              style={{ width: `${(temperature / 50) * 100}%` }}
            />
          </div>
        </div>

        {/* System Status Card */}
        <div className="metric-card full-width">
          <div className="metric-header">
            <h3 className="metric-title">System Status</h3>
            <span className="metric-status safe">Online</span>
          </div>
          <div className="system-status">
            <div className="status-item">
              <span className="status-label">Sensors:</span>
              <span className="status-value online">8/8 Active</span>
            </div>
            <div className="status-item">
              <span className="status-label">Network:</span>
              <span className="status-value online">Connected</span>
            </div>
            <div className="status-item">
              <span className="status-label">Last Update:</span>
              <span className="status-value">Just now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="alerts-section">
        <h2 className="section-title">Recent Alerts</h2>
        <div className="alerts-list">
          {alerts.map((alert) => (
            <div key={alert.id} className={`alert-item ${alert.severity}`}>
              <div className="alert-content">
                <p className="alert-message">{alert.message}</p>
                <span className="alert-time">{alert.time}</span>
              </div>
              <span className={`alert-severity ${alert.severity}`}>
                {alert.severity.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
