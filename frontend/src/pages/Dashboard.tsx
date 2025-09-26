import { useState, useEffect } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  // Live industrial monitoring data with realistic variations
  const [gasConcentration, setGasConcentration] = useState(125); // PPM
  const [inletPressure, setInletPressure] = useState(85.2); // bar
  const [outletPressure, setOutletPressure] = useState(78.5); // bar
  const [gasTemperature, setGasTemperature] = useState(78.3); // °C
  const [inletTemp, setInletTemp] = useState(65.2); // °C
  const [dischargeTemp, setDischargeTemp] = useState(92.1); // °C
  const [compressorStatus] = useState('Running'); // Running, Stopped, Fault
  const [vibrationLevel, setVibrationLevel] = useState(2.8); // mm/s
  const [lastMaintenance] = useState('2024-01-10');
  
  // Tier 2 secondary monitoring data
  const [inletFlowRate, setInletFlowRate] = useState(1245); // m³/h
  const [outletFlowRate, setOutletFlowRate] = useState(1238); // m³/h
  const [compressorSpeed, setCompressorSpeed] = useState(3580); // RPM
  const [fireDetectionStatus] = useState('OK'); // OK, Alarm
  const [smokeDetectionStatus] = useState('OK'); // OK, Alarm
  const [esdValveStatus] = useState('Open'); // Open, Closed, Fault
  
  // Vibration spectrum data
  const [spectrumData, setSpectrumData] = useState({
    frequencies: [2.8, 1.2, 0.8, 1.5, 0.9],
    rmsVelocity: 2.8,
    peakAcceleration: 0.45,
    crestFactor: 3.2
  });
  
  // Suction/Discharge detailed data
  const [suctionData, setSuctionData] = useState({
    pressure: 12.5,
    temperature: 35.2,
    flowRate: 1245
  });
  
  const [dischargeData, setDischargeData] = useState({
    pressure: 78.5,
    temperature: 92.1,
    flowRate: 1238
  });

  // Live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Gas concentration (120-130 PPM normal range)
      setGasConcentration(prev => {
        const variation = (Math.random() - 0.5) * 2;
        const newValue = prev + variation;
        return Math.max(120, Math.min(130, newValue));
      });

      // Inlet pressure (83-87 bar range)
      setInletPressure(prev => {
        const variation = (Math.random() - 0.5) * 0.4;
        const newValue = prev + variation;
        return Math.max(83, Math.min(87, newValue));
      });

      // Outlet pressure (76-80 bar range)
      setOutletPressure(prev => {
        const variation = (Math.random() - 0.5) * 0.3;
        const newValue = prev + variation;
        return Math.max(76, Math.min(80, newValue));
      });

      // Gas temperature (76-82°C range)
      setGasTemperature(prev => {
        const variation = (Math.random() - 0.5) * 0.8;
        const newValue = prev + variation;
        return Math.max(76, Math.min(82, newValue));
      });

      // Inlet temperature (63-68°C range)
      setInletTemp(prev => {
        const variation = (Math.random() - 0.5) * 0.6;
        const newValue = prev + variation;
        return Math.max(63, Math.min(68, newValue));
      });

      // Discharge temperature (90-95°C range)
      setDischargeTemp(prev => {
        const variation = (Math.random() - 0.5) * 0.8;
        const newValue = prev + variation;
        return Math.max(90, Math.min(95, newValue));
      });

      // Vibration level (2.5-3.2 mm/s range)
      setVibrationLevel(prev => {
        const variation = (Math.random() - 0.5) * 0.1;
        const newValue = prev + variation;
        return Math.max(2.5, Math.min(3.2, newValue));
      });

      // Flow rates
      setInletFlowRate(prev => {
        const variation = (Math.random() - 0.5) * 20;
        const newValue = prev + variation;
        return Math.max(1230, Math.min(1260, newValue));
      });

      setOutletFlowRate(prev => {
        const variation = (Math.random() - 0.5) * 15;
        const newValue = prev + variation;
        return Math.max(1225, Math.min(1250, newValue));
      });

      // Compressor speed (3560-3600 RPM range)
      setCompressorSpeed(prev => {
        const variation = (Math.random() - 0.5) * 8;
        const newValue = prev + variation;
        return Math.max(3560, Math.min(3600, newValue));
      });

      // Spectrum data
      setSpectrumData(prev => ({
        frequencies: prev.frequencies.map(freq => {
          const variation = (Math.random() - 0.5) * 0.2;
          return Math.max(0.5, Math.min(3.5, freq + variation));
        }),
        rmsVelocity: Math.max(2.5, Math.min(3.2, prev.rmsVelocity + (Math.random() - 0.5) * 0.1)),
        peakAcceleration: Math.max(0.4, Math.min(0.5, prev.peakAcceleration + (Math.random() - 0.5) * 0.02)),
        crestFactor: Math.max(3.0, Math.min(3.5, prev.crestFactor + (Math.random() - 0.5) * 0.1))
      }));

      // Suction data
      setSuctionData(prev => ({
        pressure: Math.max(12.0, Math.min(13.0, prev.pressure + (Math.random() - 0.5) * 0.2)),
        temperature: Math.max(34, Math.min(37, prev.temperature + (Math.random() - 0.5) * 0.4)),
        flowRate: Math.max(1230, Math.min(1260, prev.flowRate + (Math.random() - 0.5) * 10))
      }));

      // Discharge data
      setDischargeData(prev => ({
        pressure: Math.max(77, Math.min(80, prev.pressure + (Math.random() - 0.5) * 0.3)),
        temperature: Math.max(90, Math.min(95, prev.temperature + (Math.random() - 0.5) * 0.6)),
        flowRate: Math.max(1225, Math.min(1250, prev.flowRate + (Math.random() - 0.5) * 8))
      }));

    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);
  
  // Legacy data for alerts section
  const [alertFilter, setAlertFilter] = useState('unresolved');
  const [searchTerm, setSearchTerm] = useState('');
  const [autoRefresh, setAutoRefresh] = useState('30s');
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<Set<number>>(new Set());
  
  // Detail cards state
  const [showDetailCards, setShowDetailCards] = useState(false);

  // Industrial monitoring trends data
  const industrialData = {
    gasConcentration: { change: 8.5, trend: 'up', period: '1h', safeLimit: 200 }, // Changed to 200 so 125 = 62.5%
    pressure: { 
      inlet: { change: -2.1, trend: 'down' },
      outlet: { change: -1.8, trend: 'down' },
      differential: inletPressure - outletPressure
    },
    temperature: { 
      gas: { change: 3.2, trend: 'up', safeLimit: 100 }, // Changed to 100 so 78.3 = 78%
      inlet: { change: 1.1, trend: 'up' },
      discharge: { change: 4.5, trend: 'up' }
    },
    compressor: {
      vibration: { change: 0.3, trend: 'up', safeLimit: 4.5 }
    }
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

  // Industrial status functions with categorical color system
  const getGasStatus = () => {
    // Safety category: Green/Red (Gas, Fire, Smoke)
    return { badge: 'safety-safe', text: 'Normal' };
  };

  const getPressureStatus = () => {
    // Equipment category: Blue/Yellow/Orange (Pressure, Temperature, Flow, RPM)
    return { badge: 'equipment-normal', text: 'Normal' };
  };

  const getTemperatureStatus = () => {
    // Equipment category: Blue/Yellow/Orange (Pressure, Temperature, Flow, RPM)
    return { badge: 'equipment-normal', text: 'Normal' };
  };

  const getCompressorStatus = () => {
    // Equipment category: Blue/Yellow/Orange (Pressure, Temperature, Flow, RPM)
    return { badge: 'equipment-normal', text: 'Running' };
  };

  const getFlowRateStatus = () => {
    // Equipment category: Blue/Yellow/Orange (Pressure, Temperature, Flow, RPM)
    return { badge: 'equipment-normal', text: 'Normal' };
  };

  const getSpeedStatus = () => {
    // Equipment category: Blue/Yellow/Orange (Pressure, Temperature, Flow, RPM)
    return { badge: 'equipment-normal', text: 'Normal' };
  };

  const getFireSmokeStatus = () => {
    // Safety category: Green/Red (Gas, Fire, Smoke)
    return { badge: 'safety-safe', text: 'All Clear' };
  };

  const getESDValveStatus = () => {
    // Controls category: Gray/Orange/Red (ESD, Valves, Shutdown)
    return { badge: 'controls-normal', text: esdValveStatus };
  };


  const handleRefresh = () => {
    // Refresh logic would go here
    console.log('Refreshing dashboard...');
  };

  const handleAcknowledge = (alertId: number) => {
    setAcknowledgedAlerts(prev => new Set([...prev, alertId]));
  };



  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <h1 className="dashboard-title">Current Status</h1>
          <div className="dashboard-toolbar">
            <button className="refresh-btn" onClick={handleRefresh} aria-label="Refresh dashboard">
              Refresh
            </button>
            <div className="last-updated" aria-live="polite">
              Last updated: Just now
            </div>
          </div>
        </header>

        {/* Tier 1: Primary KPIs */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Primary Monitoring</h2>
            <div className="section-subtitle">Critical operational parameters</div>
          </div>
          <div className="kpi-grid">
            {/* Gas Concentration Panel */}
          <div className="card card--stat">
            <div className="stat__header">
              <h2 className="stat__label">Gas Concentration</h2>
              <span className={`stat__badge stat__badge--${getGasStatus().badge}`}>
                <span className="stat__badge-dot"></span>
                {getGasStatus().text}
              </span>
            </div>

            <div className="stat__value-row">
              <div className="stat__gauge">
                <div className="circular-progress">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path 
                      className={`circle circle--${getGasStatus().badge}`}
                      strokeDasharray={`${Math.min((gasConcentration / industrialData.gasConcentration.safeLimit) * 100, 100)}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    />
                  </svg>
                  <div className="circle-content">
                    <span className="circle-value">{Math.round(gasConcentration)}</span>
                    <span className="circle-unit">PPM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="stat__footer">
              <div className="stat__delta">
                <span className={`stat__delta-icon ${industrialData.gasConcentration.change > 0 ? 'stat__delta-icon--up-bad' : 'stat__delta-icon--down-good'}`}>
                  {industrialData.gasConcentration.change > 0 ? '↑' : '↓'}
                </span>
                <span className="stat__delta-value">{Math.abs(industrialData.gasConcentration.change)}%</span>
                <span className="stat__delta-period">vs 1h</span>
              </div>
            </div>
          </div>

          {/* Pressure Panel */}
          <div className="card card--stat">
            <div className="stat__header">
              <h2 className="stat__label">Pressure</h2>
              <span className={`stat__badge stat__badge--${getPressureStatus().badge}`}>
                <span className="stat__badge-dot"></span>
                {getPressureStatus().text}
              </span>
            </div>

            <div className="stat__value-row">
              <div className="stat__value stat__value--multi">
                <div className="pressure-reading">
                  <span className="pressure-label">Inlet</span>
                  <span className="pressure-value">{inletPressure.toFixed(1)} <small>bar</small></span>
                  <span className={`trend-arrow ${industrialData.pressure.inlet.change < 0 ? 'trend--down' : 'trend--up'}`}>
                    {industrialData.pressure.inlet.change < 0 ? '↓' : '↑'}
                  </span>
                </div>
                <div className="pressure-reading">
                  <span className="pressure-label">Outlet</span>
                  <span className="pressure-value">{outletPressure.toFixed(1)} <small>bar</small></span>
                  <span className={`trend-arrow ${industrialData.pressure.outlet.change < 0 ? 'trend--down' : 'trend--up'}`}>
                    {industrialData.pressure.outlet.change < 0 ? '↓' : '↑'}
                  </span>
                </div>
                <div className="pressure-reading pressure-reading--highlight">
                  <span className="pressure-label">Differential</span>
                  <span className="pressure-value">{industrialData.pressure.differential.toFixed(1)} <small>bar</small></span>
                </div>
              </div>
            </div>
          </div>

          {/* Temperature Panel */}
          <div className="card card--stat">
            <div className="stat__header">
              <h2 className="stat__label">Temperature</h2>
              <span className={`stat__badge stat__badge--${getTemperatureStatus().badge}`}>
                <span className="stat__badge-dot"></span>
                {getTemperatureStatus().text}
              </span>
            </div>

            <div className="stat__value-row">
              <div className="stat__gauge">
                <div className="circular-progress">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path 
                      className={`circle circle--${getTemperatureStatus().badge}`}
                      strokeDasharray={`${Math.min((gasTemperature / industrialData.temperature.gas.safeLimit) * 100, 100)}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    />
                  </svg>
                  <div className="circle-content">
                    <span className="circle-value">{gasTemperature.toFixed(1)}</span>
                    <span className="circle-unit">°C</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="stat__footer">
              <div className="temp-secondary">
                <div className="temp-item">
                  <span className="temp-label">Inlet</span>
                  <span className="temp-value">{inletTemp.toFixed(1)}°C</span>
                </div>
                <div className="temp-item">
                  <span className="temp-label">Discharge</span>
                  <span className="temp-value">{dischargeTemp.toFixed(1)}°C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compressor Health Panel */}
          <div className="card card--stat">
            <div className="stat__header">
              <h2 className="stat__label">Compressor Health</h2>
              <span className={`stat__badge stat__badge--${getCompressorStatus().badge}`}>
                <span className="stat__badge-dot"></span>
                {getCompressorStatus().text}
              </span>
            </div>

            <div className="stat__value-row">
              <div className="compressor-status">
                <div className={`status-indicator status-indicator--${getCompressorStatus().badge}`}>
                  {compressorStatus}
                </div>
                <div className="vibration-reading">
                  <span className="vibration-label">Vibration</span>
                  <span className="vibration-value">{vibrationLevel.toFixed(1)} <small>mm/s</small></span>
                  <div className="vibration-gauge">
                    <div 
                      className={`vibration-bar vibration-bar--${vibrationLevel > 3.5 ? 'warning' : 'safe'}`}
                      style={{ width: `${Math.min((vibrationLevel / industrialData.compressor.vibration.safeLimit) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="stat__footer">
              <div className="maintenance-info">
                <span className="maintenance-label">Last Maintenance</span>
                <span className="maintenance-date">{lastMaintenance}</span>
            </div>
          </div>
          </div>
          </div>
        </section>

        {/* Tier 2: Secondary Monitoring */}
        <section className="dashboard-section" style={{ marginTop: 'var(--space-2xl)' }}>
          <div className="section-header">
            <h2 className="section-title">Equipment Status</h2>
            <div className="section-subtitle">Supporting system indicators</div>
          </div>
          <div className="secondary-grid">
            {/* Flow Rate Mini-Card */}
          <div className="card card--mini">
            <div className="mini__header">
              <h3 className="mini__title">Flow Rate</h3>
              <span className={`mini__status mini__status--${getFlowRateStatus().badge}`}>{getFlowRateStatus().text}</span>
            </div>
            <div className="mini__content">
              <div className="flow-readings">
                <div className="flow-item">
                  <span className="flow-label">Inlet</span>
                  <span className="flow-value">{Math.round(inletFlowRate).toLocaleString()} <small>m³/h</small></span>
                </div>
                <div className="flow-item">
                  <span className="flow-label">Outlet</span>
                  <span className="flow-value">{Math.round(outletFlowRate).toLocaleString()} <small>m³/h</small></span>
                </div>
              </div>
            </div>
          </div>

          {/* Speed (RPM) Mini-Card */}
          <div className="card card--mini">
            <div className="mini__header">
              <h3 className="mini__title">Speed</h3>
              <span className={`mini__status mini__status--${getSpeedStatus().badge}`}>{getSpeedStatus().text}</span>
            </div>
            <div className="mini__content">
              <div className="speed-display">
                <span className="speed-value">{Math.round(compressorSpeed)}</span>
                <span className="speed-unit">RPM</span>
              </div>
              <div className="speed-bar">
                <div 
                  className="speed-fill"
                  style={{ width: `${(compressorSpeed / 4000) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Fire & Smoke Detection Mini-Card */}
          <div className="card card--mini">
            <div className="mini__header">
              <h3 className="mini__title">Fire & Smoke</h3>
              <span className={`mini__status mini__status--${getFireSmokeStatus().badge}`}>{getFireSmokeStatus().text}</span>
            </div>
            <div className="mini__content">
              <div className="detection-grid">
                <div className="detection-item">
                  <div className={`detection-icon detection-icon--${fireDetectionStatus.toLowerCase()}`}>🔥</div>
                  <span className="detection-label">Fire</span>
                  <span className="detection-status">{fireDetectionStatus}</span>
                </div>
                <div className="detection-item">
                  <div className={`detection-icon detection-icon--${smokeDetectionStatus.toLowerCase()}`}>💨</div>
                  <span className="detection-label">Smoke</span>
                  <span className="detection-status">{smokeDetectionStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ESD Valve Status Mini-Card */}
          <div className="card card--mini">
            <div className="mini__header">
              <h3 className="mini__title">ESD Valve</h3>
              <span className={`mini__status mini__status--${getESDValveStatus().badge}`}>
                {getESDValveStatus().text}
              </span>
            </div>
            <div className="mini__content">
              <div className="valve-display">
                <div className={`valve-indicator valve-indicator--${esdValveStatus.toLowerCase()}`}>
                  <div className="valve-body"></div>
                  <div className="valve-gate"></div>
                </div>
                <div className="valve-info">
                  <span className="valve-status">{esdValveStatus}</span>
                  <span className="valve-type">Emergency Shutdown</span>
                </div>
            </div>
          </div>
          </div>
          </div>
        </section>

        {/* Show Details Button */}
        <div className="details-button-container">
          <button 
            className={`details-toggle-btn ${showDetailCards ? 'details-toggle-btn--active' : ''}`}
            onClick={() => setShowDetailCards(!showDetailCards)}
          >
            <span className="details-toggle-text">
              {showDetailCards ? 'Hide Detailed Analytics' : 'Show Detailed Analytics'}
            </span>
            <span className={`details-toggle-icon ${showDetailCards ? 'details-toggle-icon--open' : ''}`}>
              ▼
            </span>
          </button>
        </div>

        {/* Detail Cards Section */}
        {showDetailCards && (
          <section className="detail-cards-section">
            <div className="detail-cards-grid">
              {/* Maintenance Logs Card */}
              <div className="detail-card">
                <div className="detail-card__header">
                  <h3 className="detail-card__title">Maintenance Logs</h3>
                  <span className="detail-card__badge">3 Recent</span>
                </div>
                <div className="detail-card__content">
                  <div className="maintenance-logs">
                    <div className="log-entry">
                      <div className="log-header">
                        <span className="log-date">2024-01-10</span>
                        <span className="log-type log-type--scheduled">Scheduled</span>
                      </div>
                      <div className="log-content">Oil change, filter replacement, bearing inspection completed.</div>
                    </div>
                    <div className="log-entry">
                      <div className="log-header">
                        <span className="log-date">2023-12-15</span>
                        <span className="log-type log-type--corrective">Corrective</span>
                      </div>
                      <div className="log-content">Vibration sensor calibration due to elevated readings.</div>
                    </div>
                    <div className="log-entry">
                      <div className="log-header">
                        <span className="log-date">2023-11-20</span>
                        <span className="log-type log-type--preventive">Preventive</span>
                      </div>
                      <div className="log-content">Quarterly inspection completed. All systems operational.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suction/Discharge Card */}
              <div className="detail-card">
                <div className="detail-card__header">
                  <h3 className="detail-card__title">Suction/Discharge Status</h3>
                  <span className="detail-card__badge">Live Data</span>
                </div>
                <div className="detail-card__content">
                  <div className="sd-comparison">
                    <div className="sd-side">
                      <h4 className="sd-title">Suction Side</h4>
                      <div className="sd-metrics">
                        <div className="sd-metric">
                          <span className="sd-label">Pressure</span>
                          <span className="sd-value">{suctionData.pressure.toFixed(1)} <small>bar</small></span>
                        </div>
                        <div className="sd-metric">
                          <span className="sd-label">Temperature</span>
                          <span className="sd-value">{suctionData.temperature.toFixed(1)} <small>°C</small></span>
                        </div>
                        <div className="sd-metric">
                          <span className="sd-label">Flow Rate</span>
                          <span className="sd-value">{Math.round(suctionData.flowRate).toLocaleString()} <small>m³/h</small></span>
                        </div>
                      </div>
                    </div>
                    <div className="sd-divider"></div>
                    <div className="sd-side">
                      <h4 className="sd-title">Discharge Side</h4>
                      <div className="sd-metrics">
                        <div className="sd-metric">
                          <span className="sd-label">Pressure</span>
                          <span className="sd-value">{dischargeData.pressure.toFixed(1)} <small>bar</small></span>
                        </div>
                        <div className="sd-metric">
                          <span className="sd-label">Temperature</span>
                          <span className="sd-value">{dischargeData.temperature.toFixed(1)} <small>°C</small></span>
                        </div>
                        <div className="sd-metric">
                          <span className="sd-label">Flow Rate</span>
                          <span className="sd-value">{Math.round(dischargeData.flowRate).toLocaleString()} <small>m³/h</small></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vibration Spectrum Card */}
              <div className="detail-card detail-card--wide">
                <div className="detail-card__header">
                  <h3 className="detail-card__title">Vibration Spectrum Analysis</h3>
                  <span className="detail-card__badge detail-card__badge--success">Normal Range</span>
                </div>
                <div className="detail-card__content">
                  <div className="vibration-analysis">
                    <div className="spectrum-chart">
                      <div className="spectrum-bars">
                        {spectrumData.frequencies.map((freq, index) => (
                          <div key={index} className="spectrum-bar" style={{height: `${(freq / 3.5) * 100}%`}}>
                            <span className="bar-label">{index + 1}x</span>
                            <span className="bar-value">{freq.toFixed(1)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="spectrum-frequencies">
                        <span>59.7Hz</span>
                        <span>119.4Hz</span>
                        <span>179.1Hz</span>
                        <span>238.8Hz</span>
                        <span>298.5Hz</span>
                      </div>
                    </div>
                    <div className="vibration-metrics">
                      <div className="vib-metric">
                        <span className="vib-label">RMS Velocity</span>
                        <span className="vib-value">{spectrumData.rmsVelocity.toFixed(1)} <small>mm/s</small></span>
                      </div>
                      <div className="vib-metric">
                        <span className="vib-label">Peak Acceleration</span>
                        <span className="vib-value">{spectrumData.peakAcceleration.toFixed(2)} <small>g</small></span>
                      </div>
                      <div className="vib-metric">
                        <span className="vib-label">Crest Factor</span>
                        <span className="vib-value">{spectrumData.crestFactor.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}


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
            <h2 className="alerts__title">AI recent alerts</h2>
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
