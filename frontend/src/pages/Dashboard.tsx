import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Live industrial monitoring data with realistic variations
  const [gasConcentration, setGasConcentration] = useState(8.5); // PPM (LEL for methane is ~50,000 PPM, normal is <10 PPM)
  const [inletPressure, setInletPressure] = useState(42.5); // bar (typical gas transmission pressure 40-70 bar)
  const [outletPressure, setOutletPressure] = useState(65.8); // bar (compression increases pressure)
  const [gasTemperature, setGasTemperature] = useState(38.2); // °C (ambient + compression heat)
  const [inletTemp, setInletTemp] = useState(18.5); // °C (ground temperature)
  const [dischargeTemp, setDischargeTemp] = useState(85.4); // °C (after compression heating)
  const [compressorStatus] = useState('Running'); // Running, Stopped, Fault
  const [vibrationLevel, setVibrationLevel] = useState(4.2); // mm/s (industrial compressor normal 3-6 mm/s)
  const [lastMaintenance] = useState('2024-12-15');
  
  // Tier 2 secondary monitoring data
  const [inletFlowRate, setInletFlowRate] = useState(85420); // m³/h (typical gas station 50,000-150,000 m³/h)
  const [outletFlowRate, setOutletFlowRate] = useState(85380); // m³/h (slight loss due to compression)
  const [compressorSpeed, setCompressorSpeed] = useState(1485); // RPM (industrial gas compressors typically 1200-1800 RPM)
  const [fireDetectionStatus] = useState('OK'); // OK, Alarm
  const [smokeDetectionStatus] = useState('OK'); // OK, Alarm
  const [esdValveStatus] = useState('Open'); // Open, Closed, Fault
  
  // Vibration spectrum data
  const [spectrumData, setSpectrumData] = useState({
    frequencies: [4.2, 3.1, 2.9, 3.8, 3.4], // Higher values for industrial compressor
    rmsVelocity: 4.2,
    peakAcceleration: 0.95, // g-force
    crestFactor: 3.1
  });
  
  // Suction/Discharge detailed data
  const [suctionData, setSuctionData] = useState({
    pressure: 42.5, // bar (inlet pressure)
    temperature: 18.5, // °C (ground temperature)
    flowRate: 85420 // m³/h
  });
  
  const [dischargeData, setDischargeData] = useState({
    pressure: 65.8, // bar (compressed pressure)
    temperature: 85.4, // °C (compression heating)
    flowRate: 85380 // m³/h
  });

  // Live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Gas concentration (5-12 PPM normal range for methane detection)
      setGasConcentration(prev => {
        const variation = (Math.random() - 0.5) * 0.8;
        const newValue = prev + variation;
        return Math.max(5, Math.min(12, newValue));
      });

      // Inlet pressure (40-45 bar range)
      setInletPressure(prev => {
        const variation = (Math.random() - 0.5) * 0.6;
        const newValue = prev + variation;
        return Math.max(40, Math.min(45, newValue));
      });

      // Outlet pressure (63-68 bar range)
      setOutletPressure(prev => {
        const variation = (Math.random() - 0.5) * 0.4;
        const newValue = prev + variation;
        return Math.max(63, Math.min(68, newValue));
      });

      // Gas temperature (35-42°C range)
      setGasTemperature(prev => {
        const variation = (Math.random() - 0.5) * 1.2;
        const newValue = prev + variation;
        return Math.max(35, Math.min(42, newValue));
      });

      // Inlet temperature (15-22°C range)
      setInletTemp(prev => {
        const variation = (Math.random() - 0.5) * 0.8;
        const newValue = prev + variation;
        return Math.max(15, Math.min(22, newValue));
      });

      // Discharge temperature (80-90°C range)
      setDischargeTemp(prev => {
        const variation = (Math.random() - 0.5) * 1.2;
        const newValue = prev + variation;
        return Math.max(80, Math.min(90, newValue));
      });

      // Vibration level (3.8-4.6 mm/s range for industrial compressor)
      setVibrationLevel(prev => {
        const variation = (Math.random() - 0.5) * 0.15;
        const newValue = prev + variation;
        return Math.max(3.8, Math.min(4.6, newValue));
      });

      // Flow rates
      setInletFlowRate(prev => {
        const variation = (Math.random() - 0.5) * 1200;
        const newValue = prev + variation;
        return Math.max(84000, Math.min(87000, newValue));
      });

      setOutletFlowRate(prev => {
        const variation = (Math.random() - 0.5) * 1000;
        const newValue = prev + variation;
        return Math.max(83800, Math.min(86800, newValue));
      });

      // Compressor speed (1450-1520 RPM range for industrial gas compressor)
      setCompressorSpeed(prev => {
        const variation = (Math.random() - 0.5) * 12;
        const newValue = prev + variation;
        return Math.max(1450, Math.min(1520, newValue));
      });

      // Spectrum data
      setSpectrumData(prev => ({
        frequencies: prev.frequencies.map(freq => {
          const variation = (Math.random() - 0.5) * 0.25;
          return Math.max(2.8, Math.min(5.2, freq + variation));
        }),
        rmsVelocity: Math.max(3.8, Math.min(4.6, prev.rmsVelocity + (Math.random() - 0.5) * 0.12)),
        peakAcceleration: Math.max(0.8, Math.min(1.2, prev.peakAcceleration + (Math.random() - 0.5) * 0.05)),
        crestFactor: Math.max(2.8, Math.min(3.6, prev.crestFactor + (Math.random() - 0.5) * 0.08))
      }));

      // Suction data
      setSuctionData(prev => ({
        pressure: Math.max(40.0, Math.min(45.0, prev.pressure + (Math.random() - 0.5) * 0.6)),
        temperature: Math.max(15, Math.min(22, prev.temperature + (Math.random() - 0.5) * 0.8)),
        flowRate: Math.max(84000, Math.min(87000, prev.flowRate + (Math.random() - 0.5) * 800))
      }));

      // Discharge data
      setDischargeData(prev => ({
        pressure: Math.max(63, Math.min(68, prev.pressure + (Math.random() - 0.5) * 0.4)),
        temperature: Math.max(80, Math.min(90, prev.temperature + (Math.random() - 0.5) * 1.2)),
        flowRate: Math.max(83800, Math.min(86800, prev.flowRate + (Math.random() - 0.5) * 600))
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
    gasConcentration: { change: 2.1, trend: 'up', period: '1h', safeLimit: 25 }, // LEL for methane ~25,000 PPM, alarm at 25% LEL = 6,250 PPM, display limit 25 PPM
    pressure: { 
      inlet: { change: -1.2, trend: 'down' },
      outlet: { change: 1.8, trend: 'up' }, // Outlet should be higher than inlet in compression
      differential: outletPressure - inletPressure // Corrected: outlet - inlet for compression ratio
    },
    temperature: { 
      gas: { change: 1.8, trend: 'up', safeLimit: 60 }, // Safe operating limit for gas temperature
      inlet: { change: 0.5, trend: 'stable' },
      discharge: { change: 2.2, trend: 'up' }
    },
    compressor: {
      vibration: { change: 0.2, trend: 'stable', safeLimit: 7.1 } // ISO 10816 standard for large machines
    }
  };

  const [alerts] = useState([
    { id: 1, title: 'Gas Level Critical', desc: 'Gas concentration above safety threshold in Zone A', time: '2 min ago', absoluteTime: '2024-01-15 14:28:00', severity: 'high', sensor: 'Gas-01', area: 'Zone A', acknowledged: false, signalStatus: 'HH', aiAnalysis: 'Critical gas leak detected. Immediate evacuation recommended.', aiStatus: 'High attention', aiAccuracy: 98.5 },
    { id: 2, title: 'Temperature Alert', desc: 'Temperature fluctuation detected in sector 3', time: '5 min ago', absoluteTime: '2024-01-15 14:25:00', severity: 'medium', sensor: 'Temp-03', area: 'Sector 3', acknowledged: false, signalStatus: 'HH', aiAnalysis: 'False alarm - calibration test in progress. No safety risk detected.', aiStatus: 'Normal', aiAccuracy: 96.8 },
    { id: 3, title: 'System Maintenance', desc: 'Scheduled maintenance due for sensor array', time: '1 hour ago', absoluteTime: '2024-01-15 13:30:00', severity: 'low', sensor: 'System', area: 'Network', acknowledged: false, signalStatus: 'Normal', aiAnalysis: 'Routine maintenance required within 24 hours.', aiStatus: 'Normal', aiAccuracy: 89.7 },
    { id: 4, title: 'Network Latency', desc: 'Increased response time from remote sensors', time: '2 hours ago', absoluteTime: '2024-01-15 12:30:00', severity: 'medium', sensor: 'Network', area: 'Gateway', acknowledged: false, signalStatus: 'LL', aiAnalysis: 'Sensor malfunction detected. Signal unreliable, no actual safety concern.', aiStatus: 'Low attention', aiAccuracy: 92.1 },
    { id: 5, title: 'Calibration Required', desc: 'Sensor calibration check needed', time: '3 hours ago', absoluteTime: '2024-01-15 11:30:00', severity: 'low', sensor: 'Cal-02', area: 'Lab', acknowledged: false, signalStatus: 'HH', aiAnalysis: 'Planned maintenance spike - equipment functioning normally.', aiStatus: 'Normal', aiAccuracy: 94.3 },
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

  // Map AI status to severity for chip styling
  const getAISeverity = (aiStatus: string) => {
    switch (aiStatus) {
      case 'High attention':
        return 'high';
      case 'Low attention':
        return 'medium';
      case 'Normal':
        return 'low';
      default:
        return 'low';
    }
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
                    <div className="spectrum-chart scientific-spectrum">
                      <div className="spectrum-header">
                        <h4 className="spectrum-title">Frequency Domain Analysis</h4>
                        <div className="spectrum-controls">
                          <span className="control-label">FFT Size: 1024</span>
                          <span className="control-label">Window: Hanning</span>
                        </div>
                      </div>
                      <div className="spectrum-grid">
                        <div className="spectrum-y-axis">
                          <div className="y-tick">3.5</div>
                          <div className="y-tick">2.5</div>
                          <div className="y-tick">1.5</div>
                          <div className="y-tick">0.5</div>
                          <div className="y-tick">0.0</div>
                        </div>
                        <div className="spectrum-bars scientific-bars">
                          {spectrumData.frequencies.map((freq, index) => {
                            const amplitude = freq;
                            const percentage = (amplitude / 3.5) * 100;
                            
                            return (
                              <div key={index} className="spectrum-bar scientific-bar" style={{height: `${percentage}%`}}>
                                <div className="bar-content">
                                  <span className="bar-amplitude">{amplitude.toFixed(2)}</span>
                                  <span className="bar-units">mm/s</span>
                                </div>
                                <div className="bar-base">
                                  <span className="harmonic-label">{index + 1}×</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="spectrum-x-axis">
                        <div className="x-axis-labels">
                          <span className="freq-label">59.7<sub>Hz</sub></span>
                          <span className="freq-label">119.4<sub>Hz</sub></span>
                          <span className="freq-label">179.1<sub>Hz</sub></span>
                          <span className="freq-label">238.8<sub>Hz</sub></span>
                          <span className="freq-label">298.5<sub>Hz</sub></span>
                        </div>
                        <div className="x-axis-title">Frequency [Hz]</div>
                      </div>
                      <div className="spectrum-footer">
                        <div className="analysis-params">
                          <span className="param">Δf: 59.7Hz</span>
                          <span className="param">RMS: {spectrumData.rmsVelocity.toFixed(2)} mm/s</span>
                          <span className="param">Peak: {Math.max(...spectrumData.frequencies).toFixed(2)} mm/s</span>
                        </div>
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
                    <div className={`alert__severity alert__severity--${getAISeverity(alert.aiStatus)}`}></div>
                    <span className={`chip chip--${getAISeverity(alert.aiStatus)} alert__severity-chip`}>
                      {getAISeverity(alert.aiStatus) === 'high' ? '⚠️' : getAISeverity(alert.aiStatus) === 'medium' ? '⚠️' : 'ℹ️'}
                      {alert.aiStatus}
                    </span>
                    <div className="alert__content">
                      <h3 className="alert__title">{alert.title}</h3>
                      <p className="alert__desc">{alert.desc}</p>
                      <div className="alert__metadata">
                        <div className="alert__signal-status">
                          <span className="alert__label">Signal Status:</span>
                          <span className={`alert__status-badge alert__status-badge--${alert.signalStatus.toLowerCase()}`}>
                            {alert.signalStatus}
                          </span>
                        </div>
                        <div className="alert__ai-analysis">
                          <span className="alert__label">AI Analysis:</span>
                          <div className="alert__ai-content">
                            <div className="alert__ai-header">
                              <span className={`alert__ai-badge alert__ai-badge--${alert.aiStatus.toLowerCase().replace(' ', '-')}`}>
                                {alert.aiStatus}
                              </span>
                              <span className="alert__ai-accuracy">{alert.aiAccuracy}% accuracy</span>
                            </div>
                            <span className="alert__analysis-text">{alert.aiAnalysis}</span>
                          </div>
                        </div>
                      </div>
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
          
          <div className="alerts__footer">
            <button
              className="alert-details-btn"
              onClick={() => navigate('/alert-details')}
            >
              <span>📊</span>
              <span>View All Alert Details</span>
              <span>→</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
