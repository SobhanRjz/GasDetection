import { useState } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const [gasLevel] = useState(45);
  const [temperature] = useState(23.5);
  const [humidity] = useState(42);
  const [alertFilter, setAlertFilter] = useState('unresolved');
  const [searchTerm, setSearchTerm] = useState('');
  const [autoRefresh, setAutoRefresh] = useState('30s');
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<Set<number>>(new Set());

  // Mock KPI deltas and trends data
  const kpiData = {
    gas: { change: 2.3, trend: 'up', period: '1h', lastUpdate: '3m', sparkline: [42, 45, 43, 47, 45, 46, 44, 45] },
    temp: { change: -0.8, trend: 'down', period: '1h', lastUpdate: '2m', sparkline: [23.8, 23.5, 23.2, 23.7, 23.4, 23.6, 23.3, 23.5] },
    humidity: { change: 1.5, trend: 'up', period: '1h', lastUpdate: '5m', sparkline: [41, 42, 40, 43, 41, 42, 40, 42] }
  };

  const [alerts] = useState([
    { id: 1, title: 'Gas Level Critical', desc: 'Gas concentration above safety threshold in Zone A', time: '2 min ago', absoluteTime: '2024-01-15 14:28:00', severity: 'high', sensor: 'Gas-01', area: 'Zone A', acknowledged: false },
    { id: 2, title: 'Temperature Alert', desc: 'Temperature fluctuation detected in sector 3', time: '5 min ago', absoluteTime: '2024-01-15 14:25:00', severity: 'medium', sensor: 'Temp-03', area: 'Sector 3', acknowledged: false },
    { id: 3, title: 'System Maintenance', desc: 'Scheduled maintenance due for sensor array', time: '1 hour ago', absoluteTime: '2024-01-15 13:30:00', severity: 'low', sensor: 'System', area: 'Network', acknowledged: false },
    { id: 4, title: 'Network Latency', desc: 'Increased response time from remote sensors', time: '2 hours ago', absoluteTime: '2024-01-15 12:30:00', severity: 'medium', sensor: 'Network', area: 'Gateway', acknowledged: false },
    { id: 5, title: 'Calibration Required', desc: 'Sensor calibration check needed', time: '3 hours ago', absoluteTime: '2024-01-15 11:30:00', severity: 'low', sensor: 'Cal-02', area: 'Lab', acknowledged: false },
  ]);

  const filteredAlerts = alerts.filter(alert => {
    let matchesFilter = false;
    if (alertFilter === 'unresolved') {
      matchesFilter = (alert.severity === 'high' || alert.severity === 'medium') && !acknowledgedAlerts.has(alert.id);
    } else if (alertFilter === 'all') {
      matchesFilter = true;
    } else {
      matchesFilter = alert.severity === alertFilter;
    }

    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.sensor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.area.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (value: number, type: 'gas' | 'temp' | 'humidity') => {
    if (type === 'gas') {
      if (value > 70) return 'danger';
      if (value > 50) return 'warning';
      return 'safe';
    }
    return 'safe';
  };

  const getStatusText = (value: number, type: 'gas' | 'temp' | 'humidity') => {
    if (type === 'gas') {
      if (value > 70) return 'Danger';
      if (value > 50) return 'Warning';
      return 'Safe';
    }
    return 'Normal';
  };

  const getTrendDirection = (change: number, type: 'gas' | 'temp' | 'humidity') => {
    // Semantic color logic: closer to target is good
    if (type === 'gas') {
      // Gas: higher is bad, lower is good
      return change > 0 ? 'up-bad' : 'down-good';
    } else if (type === 'temp') {
      // Temperature: closer to 20-25°C range is good
      return change > 0 ? 'up-neutral' : 'down-neutral';
    } else {
      // Humidity: closer to 40-60% range is good
      return change > 0 ? 'up-good' : 'down-neutral';
    }
  };

  const handleRefresh = () => {
    // Refresh logic would go here
    console.log('Refreshing dashboard...');
  };

  const handleAcknowledge = (alertId: number) => {
    setAcknowledgedAlerts(prev => new Set([...prev, alertId]));
  };

  const renderGauge = (value: number, max: number = 100, status: 'safe' | 'warning' | 'danger' | 'info', type: string, displayValue?: number) => {
    const percentage = value / max;
    const size = 150;
    const strokeWidth = 6; // Slimmer than before
    const center = size / 2;
    const radius = (size - strokeWidth * 2) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage * circumference);

    const getStrokeColor = () => {
      switch (status) {
        case 'safe': return 'var(--ok)';
        case 'warning': return 'var(--warn)';
        case 'danger': return 'var(--danger)';
        case 'info': return 'var(--info)';
        default: return 'var(--muted)';
      }
    };

    const getDisplayValue = () => {
      if (type === 'temp' && displayValue !== undefined) {
        return displayValue.toFixed(1);
      }
      return `${Math.round(percentage * 100)}`;
    };

    const getDisplayUnit = () => {
      if (type === 'temp') {
        return 'degree';
      }
      return 'of safe limit';
    };

    const getTooltip = () => {
      if (type === 'gas') return `${Math.round(percentage * 100)}% of safe limit (max safe 100 PPM)`;
      if (type === 'temp') return `${displayValue?.toFixed(1) || value}°C of safe limit (target 20-25°C)`;
      return `${Math.round(percentage * 100)}% of safe limit (target 40-60%)`;
    };

    return (
      <div className="gauge" title={getTooltip()}>
        <svg
          width={size}
          height={size}
          className="gauge__svg"
          style={{
            '--gauge-size': `${size}px`,
            '--gauge-stroke': `${strokeWidth}px`,
            '--gauge-value': percentage,
            '--gauge-color': getStrokeColor()
          } as React.CSSProperties}
        >
          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#eef2f6"
            strokeWidth={strokeWidth}
            className="gauge__track"
          />
          {/* Fill with gradient */}
          <defs>
            <linearGradient id={`gradient-${type}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={getStrokeColor()} stopOpacity="0.8" />
              <stop offset="100%" stopColor={getStrokeColor()} stopOpacity="1" />
            </linearGradient>
          </defs>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#gradient-${type})`}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
            className="gauge__fill"
          />
          {/* Center content */}
          <g className="gauge__center">
            <text
              x={center}
              y={center - 2}
              textAnchor="middle"
              dominantBaseline="central"
              className="gauge__value"
            >
              {getDisplayValue()}
            </text>
            <text
              x={center}
              y={center + 8}
              textAnchor="middle"
              dominantBaseline="central"
              className="gauge__unit"
            >
              {getDisplayUnit()}
            </text>
          </g>
        </svg>
      </div>
    );
  };


  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <h1 className="dashboard-title">Gas Detection Dashboard</h1>
          <div className="dashboard-toolbar">
            <button className="refresh-btn" onClick={handleRefresh} aria-label="Refresh dashboard">
              Refresh
            </button>
            <div className="last-updated" aria-live="polite">
              Last updated: Just now
            </div>
          </div>
        </header>

        {/* KPI Grid */}
        <section className="kpi-grid">
          {/* Gas Level KPI */}
          <div className="card card--stat">
            <div className="stat__header">
              <h2 className="stat__label">Gas Concentration</h2>
              <span className={`stat__badge stat__badge--${getStatusBadge(gasLevel, 'gas')}`}>
                <span className="stat__badge-dot"></span>
                {getStatusText(gasLevel, 'gas')}
              </span>
            </div>

            <div className="stat__value-row">
              <div className="stat__value">
                <span className="stat__value-number">{gasLevel}</span>
                <span className="stat__unit">PPM</span>
              </div>
            </div>

            <div className="stat__footer">
              <div className="stat__delta" title={`Change vs last 1h (baseline 14:00–15:00)`}>
                <span className={`stat__delta-icon stat__delta-icon--${getTrendDirection(kpiData.gas.change, 'gas')}`}>
                  {kpiData.gas.change > 0 ? '↑' : '↓'}
                </span>
                <span className="stat__delta-value">{Math.abs(kpiData.gas.change)}%</span>
                <span className="stat__delta-period">vs {kpiData.gas.period}</span>
              </div>
              <div className="stat__gauge">
                {renderGauge(gasLevel, 100, getStatusBadge(gasLevel, 'gas') as 'safe' | 'warning' | 'danger', 'gas')}
              </div>
            </div>
          </div>

          {/* Temperature KPI */}
          <div className="card card--stat">
            <div className="stat__header">
              <h2 className="stat__label">Temperature</h2>
              <span className={`stat__badge stat__badge--${getStatusBadge(temperature, 'temp')}`}>
                <span className="stat__badge-dot"></span>
                {getStatusText(temperature, 'temp')}
              </span>
            </div>

            <div className="stat__value-row">
              <div className="stat__value">
                <span className="stat__value-number">{temperature.toFixed(1)}</span>
                <span className="stat__unit">°C</span>
              </div>
            </div>

            <div className="stat__footer">
              <div className="stat__delta" title={`Change vs last 1h (baseline 14:00–15:00)`}>
                <span className={`stat__delta-icon stat__delta-icon--${getTrendDirection(kpiData.temp.change, 'temp')}`}>
                  {kpiData.temp.change > 0 ? '↑' : '↓'}
                </span>
                <span className="stat__delta-value">{Math.abs(kpiData.temp.change)}%</span>
                <span className="stat__delta-period">vs {kpiData.temp.period}</span>
              </div>
              <div className="stat__gauge">
                {renderGauge(temperature, 40, getStatusBadge(temperature, 'temp') as 'safe' | 'warning' | 'danger' | 'info', 'temp', temperature)}
              </div>
            </div>
          </div>

          {/* Humidity KPI */}
          <div className="card card--stat">
            <div className="stat__header">
              <h2 className="stat__label">Humidity</h2>
              <span className={`stat__badge stat__badge--${getStatusBadge(humidity, 'humidity')}`}>
                <span className="stat__badge-dot"></span>
                {getStatusText(humidity, 'humidity')}
              </span>
            </div>

            <div className="stat__value-row">
              <div className="stat__value">
                <span className="stat__value-number">{humidity.toFixed(1)}</span>
                <span className="stat__unit">%</span>
              </div>
            </div>

            <div className="stat__footer">
              <div className="stat__delta" title={`Change vs last 1h (baseline 14:00–15:00)`}>
                <span className={`stat__delta-icon stat__delta-icon--${getTrendDirection(kpiData.humidity.change, 'humidity')}`}>
                  {kpiData.humidity.change > 0 ? '↑' : '↓'}
                </span>
                <span className="stat__delta-value">{Math.abs(kpiData.humidity.change)}%</span>
                <span className="stat__delta-period">vs {kpiData.humidity.period}</span>
              </div>
              <div className="stat__gauge">
                {renderGauge(humidity, 100, getStatusBadge(humidity, 'humidity') as 'safe' | 'warning' | 'danger', 'humidity')}
              </div>
            </div>
          </div>
        </section>

        {/* System Status */}
        <section className="status">
          <div className="status__strip">
            <div className="status__item">
              <div className="status__dot status__dot--ok"></div>
              <span className="status__label">Sensors 8/8</span>
            </div>
            <span className="status__separator">•</span>
            <div className="status__item">
              <div className="status__dot status__dot--ok"></div>
              <span className="status__label">Network Connected</span>
            </div>
            <span className="status__separator">•</span>
            <div className="status__item">
              <div className="status__dot status__dot--ok"></div>
              <span className="status__label">Gateway Online</span>
            </div>
            <span className="status__separator">•</span>
            <span className="status__label">Last update Just now</span>
          </div>
        </section>

        {/* Recent Alerts */}
        <section className="alerts">
          <div className="alerts__header">
            <h2 className="alerts__title">Recent Alerts</h2>
            <nav className="alerts__toolbar">
              <button
                className={`pill ${alertFilter === 'unresolved' ? 'pill--active' : ''}`}
                onClick={() => setAlertFilter('unresolved')}
                aria-pressed={alertFilter === 'unresolved'}
              >
                Unresolved
              </button>
              <button
                className={`pill ${alertFilter === 'all' ? 'pill--active' : ''}`}
                onClick={() => setAlertFilter('all')}
                aria-pressed={alertFilter === 'all'}
              >
                All
              </button>
              <button
                className={`pill ${alertFilter === 'high' ? 'pill--active' : ''}`}
                onClick={() => setAlertFilter('high')}
                aria-pressed={alertFilter === 'high'}
              >
                High
              </button>
              <button
                className={`pill ${alertFilter === 'medium' ? 'pill--active' : ''}`}
                onClick={() => setAlertFilter('medium')}
                aria-pressed={alertFilter === 'medium'}
              >
                Medium
              </button>
              <button
                className={`pill ${alertFilter === 'low' ? 'pill--active' : ''}`}
                onClick={() => setAlertFilter('low')}
                aria-pressed={alertFilter === 'low'}
              >
                Low
              </button>
              <div className="search-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search alerts by sensor, area..."
                  className="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search alerts"
                />
              </div>
              <select
                className="auto-refresh"
                value={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.value)}
                aria-label="Auto-refresh interval"
              >
                <option value="off">Auto: Off</option>
                <option value="15s">Auto: 15s</option>
                <option value="30s">Auto: 30s</option>
              </select>
            </nav>
          </div>

          <ul className="alerts__list">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => {
                const isAcknowledged = acknowledgedAlerts.has(alert.id);
                return (
                  <li key={alert.id} className={`alert ${isAcknowledged ? 'alert--acknowledged' : ''}`}>
                    <div className={`alert__severity alert__severity--${alert.severity}`}></div>
                    <span className={`chip chip--${alert.severity} alert__severity-chip`}>
                      {alert.severity === 'high' ? '⚠️' : alert.severity === 'medium' ? '⚠️' : 'ℹ️'}
                      {alert.severity.toUpperCase()}
                    </span>
                    <div className="alert__content">
                      <h3 className="alert__title">{alert.title}</h3>
                      <p className="alert__desc">{alert.desc}</p>
                      <p className="alert__time" title={alert.absoluteTime}>{alert.time}</p>
                    </div>
                    <div className="alert__actions">
                      {!isAcknowledged && (
                        <button
                          className="acknowledge-btn"
                          onClick={() => handleAcknowledge(alert.id)}
                          aria-label={`Acknowledge ${alert.title}`}
                        >
                          Acknowledge
                        </button>
                      )}
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="empty-state">
                {alertFilter === 'unresolved' ? 'All clear 🎉' : 'No alerts match your current filters.'}
              </li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
