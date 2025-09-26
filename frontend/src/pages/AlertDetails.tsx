import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AlertDetails.css';

export default function AlertDetails() {
  const navigate = useNavigate();

  // Filter state
  const [activeFilter, setActiveFilter] = useState('All');

  // Extended alert data with more details
  const [alerts] = useState([
    { 
      id: 1, 
      title: 'Gas Level Critical', 
      desc: 'Gas concentration above safety threshold in Zone A', 
      time: '2 min ago', 
      absoluteTime: '2024-01-15 14:28:00', 
      severity: 'high', 
      sensor: 'Gas-01', 
      area: 'Zone A', 
      acknowledged: false, 
      signalStatus: 'HH', 
      aiAnalysis: 'Critical gas leak detected. Immediate evacuation recommended.', 
      aiStatus: 'High attention', 
      aiAccuracy: 98.5,
      location: 'Sector A-1, Level 2',
      sensorType: 'Methane Detector',
      currentValue: 18.5,
      thresholdValue: 15.0,
      unit: 'PPM',
      trend: 'Increasing',
      duration: '3 minutes',
      sparklineData: [14.2, 15.8, 16.9, 17.8, 18.5], // Last 5 minutes of PPM readings
      actions: [
        { text: 'Evacuation initiated', status: 'completed' },
        { text: 'Emergency response team notified', status: 'in_progress' },
        { text: 'Ventilation system activated', status: 'running' }
      ]
    },
    { 
      id: 2, 
      title: 'Temperature Alert', 
      desc: 'Temperature fluctuation detected in sector 3', 
      time: '5 min ago', 
      absoluteTime: '2024-01-15 14:25:00', 
      severity: 'medium', 
      sensor: 'Temp-03', 
      area: 'Sector 3', 
      acknowledged: false, 
      signalStatus: 'HH',
      aiAnalysis: 'False alarm - calibration test in progress. No safety risk detected.', 
      aiStatus: 'Normal', 
      aiAccuracy: 96.8,
      location: 'Sector 3-B, Compressor Bay',
      sensorType: 'Temperature Sensor',
      currentValue: 41.8,
      thresholdValue: 45.0,
      unit: '°C',
      trend: 'Stable',
      duration: '8 minutes',
      sparklineData: [40.2, 40.8, 41.1, 41.5, 41.8], // Stable temperature readings
      actions: [
        { text: 'Calibration test confirmed', status: 'completed' },
        { text: 'Monitoring continues', status: 'running' },
        { text: 'No action required', status: 'cancelled' }
      ]
    },
    { 
      id: 3, 
      title: 'System Maintenance', 
      desc: 'Scheduled maintenance due for sensor array', 
      time: '1 hour ago', 
      absoluteTime: '2024-01-15 13:30:00', 
      severity: 'low', 
      sensor: 'System', 
      area: 'Network', 
      acknowledged: false, 
      signalStatus: 'Normal', 
      aiAnalysis: 'Routine maintenance required within 24 hours.', 
      aiStatus: 'Normal', 
      aiAccuracy: 89.7,
      location: 'Control Room',
      sensorType: 'System Monitor',
      currentValue: 0,
      thresholdValue: 0,
      unit: 'Status',
      trend: 'Scheduled',
      duration: 'N/A',
      sparklineData: [0, 0, 0, 0, 0], // System status - flat line
      actions: [
        { text: 'Maintenance scheduled', status: 'completed' },
        { text: 'Technician assigned', status: 'completed' },
        { text: 'Parts ordered', status: 'in_progress' }
      ]
    },
    { 
      id: 4, 
      title: 'Network Latency', 
      desc: 'Increased response time from remote sensors', 
      time: '2 hours ago', 
      absoluteTime: '2024-01-15 12:30:00', 
      severity: 'medium', 
      sensor: 'Network', 
      area: 'Gateway', 
      acknowledged: false, 
      signalStatus: 'LL', 
      aiAnalysis: 'Sensor malfunction detected. Signal unreliable, no actual safety concern.', 
      aiStatus: 'Low attention', 
      aiAccuracy: 92.1,
      location: 'Network Gateway Room',
      sensorType: 'Network Monitor',
      currentValue: 145,
      thresholdValue: 200,
      unit: 'ms',
      trend: 'Fluctuating',
      duration: '45 minutes',
      sparklineData: [120, 180, 145, 165, 145], // Fluctuating response times in ms
      actions: [
        { text: 'Network diagnostics run', status: 'completed' },
        { text: 'Backup sensors active', status: 'running' },
        { text: 'IT team investigating', status: 'in_progress' }
      ]
    }
  ]);

  const [selectedAlert, setSelectedAlert] = useState(alerts[0]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getAlertIcon = (title: string, sensorType: string) => {
    const titleLower = title.toLowerCase();
    const sensorLower = sensorType.toLowerCase();

    if (titleLower.includes('gas') || titleLower.includes('critical')) return '🚨';
    if (sensorLower.includes('temperature') || titleLower.includes('maintenance') || titleLower.includes('calibration')) return '🔧';
    if (sensorLower.includes('network') || titleLower.includes('latency')) return '📶';
    return '⚠️'; // default
  };

  const getActionStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return { icon: '✅', text: 'Completed', color: '#10b981' };
      case 'in_progress':
        return { icon: '🔄', text: 'In Progress', color: '#f59e0b' };
      case 'running':
        return { icon: '🟢', text: 'Running', color: '#10b981' };
      case 'failed':
        return { icon: '❌', text: 'Failed', color: '#ef4444' };
      case 'cancelled':
        return { icon: '🚫', text: 'Cancelled', color: '#6b7280' };
      case 'pending':
        return { icon: '⏳', text: 'Pending', color: '#6b7280' };
      default:
        return { icon: '❓', text: 'Unknown', color: '#6b7280' };
    }
  };

  const renderSparkline = (data: number[], width: number = 80, height: number = 20) => {
    if (!data || data.length < 2) return null;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1; // Avoid division by zero

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} className="sparkline">
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          points={points}
        />
        {/* Add a subtle gradient fill under the line */}
        <defs>
          <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <polyline
          fill="url(#sparklineGradient)"
          stroke="none"
          points={`${points} ${width},${height} 0,${height}`}
        />
      </svg>
    );
  };

  const filteredAlerts = alerts.filter(alert => {
    if (activeFilter === 'All') return true;
    return alert.aiStatus === activeFilter;
  });

  return (
    <div className="alert-details">
      <div className="alert-details__header">
        <button 
          className="back-btn"
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
        <h1>Alert Details</h1>
      </div>

      <div className="alert-details__content">
        <div className="alert-list">
          <h2>All Alerts</h2>

          {/* Filter Bar */}
          <div className="filter-bar">
            {[
              { label: 'All', key: 'All' },
              { label: 'Normal', key: 'Normal' },
              { label: 'High attention', key: 'High attention' },
              { label: 'Low attention', key: 'Low attention' }
            ].map(filter => (
              <button
                key={filter.key}
                className={`filter-btn ${activeFilter === filter.key ? 'filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
                {(filter.key === 'Normal' || filter.key === 'High attention' || filter.key === 'Low attention') && (
                  <span className="filter-count">
                    {alerts.filter(alert => {
                      return alert.aiStatus === filter.key;
                    }).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Filtered Alerts */}
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`alert-item ${selectedAlert.id === alert.id ? 'alert-item--selected' : ''} ${
                (alert.aiStatus === 'High attention' || alert.severity === 'high') ? 'alert-item--urgent' : ''
              }`}
              onClick={() => setSelectedAlert(alert)}
            >
              <div
                className="alert-item__severity"
                style={{ backgroundColor: getSeverityColor(alert.severity) }}
              ></div>
              <div className="alert-item__icon">
                {getAlertIcon(alert.title, alert.sensorType)}
              </div>
              <div className="alert-item__content">
                <h3>{alert.title}</h3>
                <p>{alert.area} • {alert.time}</p>
              </div>
              <span className={`alert-item__status alert-item__status--${alert.signalStatus.toLowerCase()}`}>
                {alert.signalStatus}
              </span>
            </div>
          ))}
        </div>

        <div className="alert-detail">
          <div className="alert-detail__header">
            <h2>{selectedAlert.title}</h2>
            <div className="alert-badges">
              <div className="badge-group">
                <div className="badge-group__item">
                  <span className={`severity-badge severity-badge--${selectedAlert.aiStatus.toLowerCase().replace(' ', '-')}`}>
                    {selectedAlert.aiStatus.toUpperCase()}
                  </span>
                  <span className="badge-label">Deterministic</span>
                </div>
                <div className="badge-separator">•</div>
                <div className="badge-group__item">
                  <span className="prediction-badge">
                    <span className="prediction-icon">🤖</span>
                    <span className="prediction-text">{selectedAlert.aiStatus}</span>
                    <span className="prediction-confidence">({selectedAlert.aiAccuracy}%)</span>
                  </span>
                  <span className="badge-label">AI Prediction</span>
                </div>
                <div className="badge-separator">•</div>
                <div className="badge-group__item">
                  <span className="signal-badge">
                    <span className="signal-icon">📶</span>
                    <span className="signal-text">{selectedAlert.signalStatus}</span>
                  </span>
                  <span className="badge-label">Signal Detection</span>
                </div>
              </div>
            </div>
          </div>

          <div className="alert-detail__cards">
            {/* Primary Row: Current Status (Prominent) + Sensor Info (Secondary) */}
            <div className="cards-primary-row">
              <div className="info-card status-card status-card--primary">
                <h3>Current Status</h3>
                <div className="card-content">
                  <div className="info-row">
                    <span className="info-label info-label--sentence">Value:</span>
                    <span className="info-value info-value--highlight">{selectedAlert.currentValue} {selectedAlert.unit}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Trend:</span>
                    <div className="trend-container">
                      <span className="info-value">{selectedAlert.trend}</span>
                      <div className="sparkline-container">
                        {renderSparkline(selectedAlert.sparklineData)}
                      </div>
                    </div>
                  </div>
                  <div className="info-row">
                    <span className="info-label info-label--sentence">Accuracy:</span>
                    <span className="info-value">{selectedAlert.aiAccuracy}%</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label info-label--sentence">Duration:</span>
                    <span className="info-value">{selectedAlert.duration}</span>
                  </div>
                </div>
              </div>

              <div className="info-card sensor-info-card sensor-info-card--secondary">
                <h3>Sensor Info</h3>
                <div className="card-content">
                  <div className="info-row">
                    <span className="info-label info-label--sentence">Location:</span>
                    <span className="info-value">{selectedAlert.location}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label info-label--sentence">Sensor:</span>
                    <span className="info-value">{selectedAlert.sensor} ({selectedAlert.sensorType})</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label info-label--sentence">Threshold:</span>
                    <span className="info-value">{selectedAlert.thresholdValue} {selectedAlert.unit}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label info-label--sentence">Time:</span>
                    <span className="info-value">{selectedAlert.absoluteTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Row: AI Analysis + Actions Taken */}
            <div className="cards-secondary-row">
              <div className="info-card ai-analysis-card">
                <h3 className="ai-card-title">
                  <span className="ai-card-icon">🤖</span>
                  AI Analysis
                </h3>
                <div className="card-content">
                  <div className="ai-panel">
                    <div className="ai-panel__header">
                      <div className="ai-panel__icon">
                        <span className="ai-icon">🤖</span>
                        <span className="ai-label">AI Assessment</span>
                      </div>
                      <div className="confidence-pill">
                        <span className="confidence-icon">✔️</span>
                        <span className="confidence-label">Confidence</span>
                        <span className="confidence-value">{selectedAlert.aiAccuracy}%</span>
                      </div>
                    </div>
                    <div className="ai-panel__content">
                      <p className="ai-recommendation">{selectedAlert.aiAnalysis}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-card actions-card">
                <h3>Actions Taken</h3>
                <div className="card-content">
                  <ul className="actions-list">
                    {selectedAlert.actions.map((action, index) => {
                      const statusInfo = getActionStatusInfo(action.status);
                      return (
                        <li key={index} className="action-item">
                          <span className="action-status-chip" style={{ backgroundColor: statusInfo.color }}>
                            <span className="action-status-icon">{statusInfo.icon}</span>
                            <span className="action-status-text">{statusInfo.text}</span>
                          </span>
                          <span className="action-text">{action.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
