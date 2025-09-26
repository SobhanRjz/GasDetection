import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import './ChartMonitoring.css';

interface ChartDataPoint {
  time: string;
  value: number;
  timestamp: Date;
}

interface ChartProps {
  title: string;
  unit: string;
  data: ChartDataPoint[];
  color: string;
  minValue?: number;
  maxValue?: number;
}

const ChartMonitoring = (): ReactNode => {
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h' | '7d'>('1h');
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Generate mock data for different time ranges
  const generateMockData = (hours: number, baseValue: number, variance: number): ChartDataPoint[] => {
    const points: ChartDataPoint[] = [];
    const now = new Date();
    const interval = (hours * 60) / 60; // 1 minute intervals for 1h, scaled for longer periods
    
    for (let i = hours * 60; i >= 0; i -= interval) {
      const timestamp = new Date(now.getTime() - i * 60 * 1000);
      const randomVariation = (Math.random() - 0.5) * variance;
      const trendVariation = Math.sin(i / 60) * (variance * 0.3); // Subtle trend
      const value = Math.max(0, baseValue + randomVariation + trendVariation);
      
      points.push({
        time: timestamp.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          ...(hours > 24 ? { month: 'short', day: 'numeric' } : {})
        }),
        value: Math.round(value * 100) / 100,
        timestamp
      });
    }
    
    return points;
  };

  // Generate false signal detection scenario data with drop anomalies
  const generateFalseSignalData = (hours: number): ChartDataPoint[] => {
    const points: ChartDataPoint[] = [];
    const now = new Date();
    const interval = (hours * 60) / 60;

    for (let i = hours * 60; i >= 0; i -= interval) {
      const timestamp = new Date(now.getTime() - i * 60 * 1000);
      let value = 42.8; // Normal baseline pressure

      // Create false alarm scenario with pressure drops around 30% through the timeline
      const timeProgress = (hours * 60 - i) / (hours * 60);
      if (timeProgress > 0.25 && timeProgress < 0.4) {
        // Sudden drop that looks like an alarm (pressure loss)
        value = 38.2 - Math.random() * 2.5; // Drop to 35.7-38.2 range
      } else if (timeProgress > 0.4 && timeProgress < 0.45) {
        // Quick return to normal (indicating false alarm)
        value = 42.8 + (Math.random() - 0.5) * 1.2;
      } else if (timeProgress > 0.6 && timeProgress < 0.7) {
        // Another smaller drop anomaly
        value = 40.5 - Math.random() * 1.2; // Drop to 39.3-40.5 range
      } else if (timeProgress > 0.7 && timeProgress < 0.72) {
        // Quick recovery from second drop
        value = 42.8 + (Math.random() - 0.5) * 1.2;
      } else {
        // Normal operation with small variations
        value = 42.8 + (Math.random() - 0.5) * 1.8;
      }

      points.push({
        time: timestamp.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          ...(hours > 24 ? { month: 'short', day: 'numeric' } : {})
        }),
        value: Math.round(value * 100) / 100,
        timestamp
      });
    }

    return points;
  };

  const getDataForTimeRange = () => {
    const hours = timeRange === '1h' ? 1 : timeRange === '6h' ? 6 : timeRange === '24h' ? 24 : 168;
    
    return {
      suctionPressure: generateMockData(hours, 42.8, 1.2), // Realistic inlet pressure
      dischargePressure: generateMockData(hours, 65.5, 1.8), // Realistic outlet pressure
      temperature: generateMockData(hours, 38.5, 3.2), // Realistic gas temperature
      flowRate: generateMockData(hours, 85200, 1800), // Realistic industrial flow rate
      falseSignalDetection: generateFalseSignalData(hours)
    };
  };

  const [chartData, setChartData] = useState(getDataForTimeRange());

  useEffect(() => {
    setChartData(getDataForTimeRange());
  }, [timeRange]);

  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      setChartData(getDataForTimeRange());
      setLastUpdated(new Date());
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [timeRange, autoRefresh]);

  const handleRefresh = () => {
    setChartData(getDataForTimeRange());
    setLastUpdated(new Date());
  };

  const renderChart = ({ title, unit, data, color, minValue, maxValue }: ChartProps) => {
    if (data.length === 0) return null;

    const values = data.map(d => d.value);
    const min = minValue ?? Math.min(...values);
    const max = maxValue ?? Math.max(...values);
    const range = max - min || 1;
    
    const currentValue = values[values.length - 1];
    const previousValue = values[values.length - 2] || currentValue;
    const change = currentValue - previousValue;
    const changePercent = previousValue !== 0 ? (change / previousValue) * 100 : 0;

    // SVG path generation with scientific precision
    const width = 100;
    const height = 60;
    const padding = 8; // Increased padding for better axis labels
    
    const pathData = data.map((point, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
      const y = height - padding - ((point.value - min) / range) * (height - padding * 2);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    // Calculate statistical values
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const stdDev = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);
    
    // Generate grid lines for scientific appearance
    const generateGridLines = () => {
      const lines = [];
      // Horizontal grid lines
      for (let i = 0; i <= 10; i++) {
        const y = (i / 10) * (height - padding * 2) + padding;
        lines.push(
          <line
            key={`h-${i}`}
            x1={padding}
            y1={y}
            x2={width - padding}
            y2={y}
            stroke="#e2e8f0"
            strokeWidth="0.3"
            opacity="0.6"
          />
        );
      }
      // Vertical grid lines
      for (let i = 0; i <= 10; i++) {
        const x = (i / 10) * (width - padding * 2) + padding;
        lines.push(
          <line
            key={`v-${i}`}
            x1={x}
            y1={padding}
            x2={x}
            y2={height - padding}
            stroke="#e2e8f0"
            strokeWidth="0.3"
            opacity="0.4"
          />
        );
      }
      return lines;
    };

    return (
      <div className="chart-card scientific-chart">
        <div className="chart-header">
          <div className="chart-title-section">
            <h3 className="chart-title scientific-title">{title}</h3>
            <div className="chart-current-value">
              <span className="chart-value scientific-value">{currentValue.toFixed(3)}</span>
              <span className="chart-unit scientific-unit">{unit}</span>
            </div>
            <div className="chart-stats">
              <span className="stat-item">μ: {mean.toFixed(2)}</span>
              <span className="stat-item">σ: {stdDev.toFixed(2)}</span>
            </div>
          </div>
          <div className="chart-change scientific-change">
            <div className="change-indicator">
              <span className={`chart-change-icon ${change >= 0 ? 'chart-change--up' : 'chart-change--down'}`}>
                {change >= 0 ? '▲' : '▼'}
              </span>
              <span className="chart-change-value">
                {Math.abs(changePercent).toFixed(2)}%
              </span>
            </div>
            <div className="precision-indicator">
              <span className="precision-label">Δ</span>
              <span className="precision-value">{change.toFixed(3)}</span>
            </div>
          </div>
        </div>
        
        <div className="chart-container scientific-container">
          <svg 
            className="chart-svg scientific-svg" 
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`gradient-${title.replace(/\s+/g, '-').toLowerCase()}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.15"/>
                <stop offset="100%" stopColor={color} stopOpacity="0.02"/>
              </linearGradient>
              {/* Scientific grid pattern */}
              <pattern id={`scientific-grid-${title.replace(/\s+/g, '-').toLowerCase()}`} width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#cbd5e1" strokeWidth="0.2"/>
              </pattern>
            </defs>
            
            {/* Scientific grid background */}
            <rect width="100%" height="100%" fill={`url(#scientific-grid-${title.replace(/\s+/g, '-').toLowerCase()})`} opacity="0.8"/>
            
            {/* Precise grid lines */}
            {generateGridLines()}
            
            {/* Statistical reference lines */}
            <line
              x1={padding}
              y1={height - padding - ((mean - min) / range) * (height - padding * 2)}
              x2={width - padding}
              y2={height - padding - ((mean - min) / range) * (height - padding * 2)}
              stroke="#6366f1"
              strokeWidth="0.8"
              strokeDasharray="2,2"
              opacity="0.7"
            />
            
            {/* Data line with enhanced precision */}
            <path
              d={pathData}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
              filter="drop-shadow(0 1px 3px rgba(0,0,0,0.15))"
              style={{ 
                vectorEffect: 'non-scaling-stroke',
                strokeDasharray: 'none'
              }}
            />
            
            
            {/* Current value marker - minimal */}
            <circle
              cx={width - padding}
              cy={height - padding - ((currentValue - min) / range) * (height - padding * 2)}
              r="1"
              fill={color}
              opacity="0.9"
            />
          </svg>
          
          <div className="chart-y-axis scientific-axis">
            <div className="axis-label">{max.toFixed(3)}</div>
            <div className="axis-label">{((max + min) / 2).toFixed(3)}</div>
            <div className="axis-label">{min.toFixed(3)}</div>
          </div>
          
          <div className="chart-x-axis scientific-x-axis">
            <div className="x-axis-label">t₀</div>
            <div className="x-axis-label">t₁</div>
            <div className="x-axis-label">t₂</div>
          </div>
        </div>
        
        <div className="chart-footer scientific-footer">
          <div className="chart-metrics">
            <div className="metric-group">
              <span className="metric-label">Range:</span>
              <span className="metric-value">{min.toFixed(3)} ≤ x ≤ {max.toFixed(3)} {unit}</span>
            </div>
            <div className="metric-group">
              <span className="metric-label">n:</span>
              <span className="metric-value">{data.length}</span>
            </div>
            <div className="metric-group">
              <span className="metric-label">Precision:</span>
              <span className="metric-value">±0.001 {unit}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="chart-monitoring">
      <div className="chart-container-wrapper">
        <header className="chart-header-main">
          <div className="chart-header-left">
            <h1 className="chart-page-title">Chart Monitoring</h1>
          </div>
          <div className="chart-toolbar">
            <div className="time-range-selector">
              {(['1h', '6h', '24h', '7d'] as const).map((range) => (
                <button
                  key={range}
                  className={`time-range-btn ${timeRange === range ? 'time-range-btn--active' : ''}`}
                  onClick={() => setTimeRange(range)}
                  aria-pressed={timeRange === range}
                >
                  {range}
                </button>
              ))}
            </div>
            <div className="chart-controls">
              <label className="auto-refresh-toggle">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Auto-refresh
              </label>
              <button className="refresh-btn" onClick={handleRefresh} title="Refresh data">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 4v6h-6M1 20v-6h6"/>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                </svg>
                Refresh
              </button>
            </div>
            <div className="last-updated" aria-live="polite">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </header>

        <div className="charts-grid">
          {renderChart({
            title: 'Suction Pressure',
            unit: 'bar',
            data: chartData.suctionPressure,
            color: '#1e40af',
            minValue: 40,
            maxValue: 46
          })}
          
          {renderChart({
            title: 'Discharge Pressure',
            unit: 'bar',
            data: chartData.dischargePressure,
            color: '#059669',
            minValue: 62,
            maxValue: 68
          })}
          
          {renderChart({
            title: 'Compressor Temperature',
            unit: '°C',
            data: chartData.temperature,
            color: '#dc2626',
            minValue: 32,
            maxValue: 45
          })}
          
          {renderChart({
            title: 'Flow Rate',
            unit: 'm³/h',
            data: chartData.flowRate,
            color: '#7c2d12',
            minValue: 83000,
            maxValue: 87500
          })}
          
          <div className="chart-card chart-card--large scientific-chart">
            <div className="chart-header">
              <div className="chart-title-section">
                <h3 className="chart-title chart-title--large scientific-title">Anomaly Detection Analysis</h3>
                <h4 className="chart-subtitle scientific-subtitle">Real-time Signal Processing</h4>
                <div className="chart-current-value">
                  <span className="chart-value scientific-value">{(chartData.falseSignalDetection[chartData.falseSignalDetection.length - 1]?.value || 0).toFixed(3)}</span>
                  <span className="chart-unit scientific-unit">bar</span>
                </div>
                <div className="chart-stats">
                  <span className="stat-item">Status: NORMAL</span>
                  <span className="stat-item">Confidence: 98.7%</span>
                </div>
              </div>
              <div className="chart-change scientific-change">
                <div className="change-indicator">
                  <span className={`chart-change-icon ${
                    chartData.falseSignalDetection.length > 1 && 
                    chartData.falseSignalDetection[chartData.falseSignalDetection.length - 1]?.value >= 
                    chartData.falseSignalDetection[chartData.falseSignalDetection.length - 2]?.value 
                      ? 'chart-change--up' : 'chart-change--down'
                  }`}>
                    {chartData.falseSignalDetection.length > 1 && 
                     chartData.falseSignalDetection[chartData.falseSignalDetection.length - 1]?.value >= 
                     chartData.falseSignalDetection[chartData.falseSignalDetection.length - 2]?.value ? '▲' : '▼'}
                  </span>
                  <span className="chart-change-value">
                    {chartData.falseSignalDetection.length > 1 ? 
                      Math.abs(((chartData.falseSignalDetection[chartData.falseSignalDetection.length - 1]?.value - 
                                chartData.falseSignalDetection[chartData.falseSignalDetection.length - 2]?.value) / 
                                chartData.falseSignalDetection[chartData.falseSignalDetection.length - 2]?.value) * 100).toFixed(2)
                      : '0.00'}%
                  </span>
                </div>
                <div className="precision-indicator">
                  <span className="precision-label">Δ</span>
                  <span className="precision-value">
                    {chartData.falseSignalDetection.length > 1 ? 
                      (chartData.falseSignalDetection[chartData.falseSignalDetection.length - 1]?.value - 
                       chartData.falseSignalDetection[chartData.falseSignalDetection.length - 2]?.value).toFixed(3)
                      : '0.000'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="chart-container chart-container--large scientific-container">
              <svg 
                className="chart-svg scientific-svg" 
                viewBox="0 0 100 60"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="gradient-false-signal" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#374151" stopOpacity="0.15"/>
                    <stop offset="100%" stopColor="#374151" stopOpacity="0.02"/>
                  </linearGradient>
                  {/* Scientific grid pattern */}
                  <pattern id="scientific-grid-anomaly" width="5" height="5" patternUnits="userSpaceOnUse">
                    <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#cbd5e1" strokeWidth="0.2"/>
                  </pattern>
                </defs>
                
                {/* Scientific grid background */}
                <rect width="100%" height="100%" fill="url(#scientific-grid-anomaly)" opacity="0.8"/>
                
                {(() => {
                  const data = chartData.falseSignalDetection;
                  if (data.length === 0) return null;
                  
                  const values = data.map(d => d.value);
                  const min = Math.min(...values) - 1; // Dynamic min based on actual data
                  const max = Math.max(...values) + 1; // Dynamic max based on actual data
                  const range = max - min;
                  const mean = values.reduce((a, b) => a + b, 0) / values.length;
                  
                  const width = 100;
                  const height = 60;
                  const padding = 8;
                  
                  // Generate precise grid lines
                  const generateGridLines = () => {
                    const lines = [];
                    // Horizontal grid lines
                    for (let i = 0; i <= 10; i++) {
                      const y = (i / 10) * (height - padding * 2) + padding;
                      lines.push(
                        <line
                          key={`h-${i}`}
                          x1={padding}
                          y1={y}
                          x2={width - padding}
                          y2={y}
                          stroke="#e2e8f0"
                          strokeWidth="0.3"
                          opacity="0.6"
                        />
                      );
                    }
                    // Vertical grid lines
                    for (let i = 0; i <= 10; i++) {
                      const x = (i / 10) * (width - padding * 2) + padding;
                      lines.push(
                        <line
                          key={`v-${i}`}
                          x1={x}
                          y1={padding}
                          x2={x}
                          y2={height - padding}
                          stroke="#e2e8f0"
                          strokeWidth="0.3"
                          opacity="0.4"
                        />
                      );
                    }
                    return lines;
                  };
                  
                  const pathData = data.map((point, index) => {
                    const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
                    const y = height - padding - ((point.value - min) / range) * (height - padding * 2);
                    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ');

                  const currentValue = values[values.length - 1];
                  
                  return (
                    <>
                      {/* Precise grid lines */}
                      {generateGridLines()}
                      
                      {/* Statistical reference lines */}
                      <line
                        x1={padding}
                        y1={height - padding - ((mean - min) / range) * (height - padding * 2)}
                        x2={width - padding}
                        y2={height - padding - ((mean - min) / range) * (height - padding * 2)}
                        stroke="#6366f1"
                        strokeWidth="0.8"
                        strokeDasharray="2,2"
                        opacity="0.7"
                      />
                      
                      {/* Data line with enhanced precision */}
                      <path
                        d={pathData}
                        fill="none"
                        stroke="#374151"
                        strokeWidth="2"
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        filter="drop-shadow(0 1px 3px rgba(0,0,0,0.15))"
                        style={{ 
                          vectorEffect: 'non-scaling-stroke',
                          strokeDasharray: 'none'
                        }}
                      />
                      
                      {/* Current value marker - minimal */}
                      <circle
                        cx={width - padding}
                        cy={height - padding - ((currentValue - min) / range) * (height - padding * 2)}
                        r="1"
                        fill="#374151"
                        opacity="0.9"
                      />
                    </>
                  );
                })()}
              </svg>
              
              <div className="chart-y-axis scientific-axis">
                <div className="axis-label">16.000</div>
                <div className="axis-label">10.500</div>
                <div className="axis-label">5.000</div>
              </div>
              
              <div className="chart-x-axis scientific-x-axis">
                <div className="x-axis-label">t₀</div>
                <div className="x-axis-label">t₁</div>
                <div className="x-axis-label">t₂</div>
              </div>
            </div>
            
            <div className="chart-footer scientific-footer">
              <div className="chart-metrics">
                <div className="metric-group">
                  <span className="metric-label">Range:</span>
                  <span className="metric-value">5.000 ≤ x ≤ 16.000 bar</span>
                </div>
                <div className="metric-group">
                  <span className="metric-label">n:</span>
                  <span className="metric-value">{chartData.falseSignalDetection.length}</span>
                </div>
                <div className="metric-group">
                  <span className="metric-label">Algorithm:</span>
                  <span className="metric-value">Kalman Filter</span>
                </div>
                <div className="metric-group">
                  <span className="metric-label">Precision:</span>
                  <span className="metric-value">±0.001 bar</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="scenario-narrative">
          <div className="narrative-card">
            <h3 className="narrative-title">Scenario Analysis</h3>
            <p className="narrative-text">
              <strong>Narrative:</strong> During routine operations, the suction pressure monitoring system detected an anomalous spike at approximately 18:45, triggering an initial alarm condition. The system's advanced analytics quickly identified this as an <strong>AI = False Alarm</strong> based on the rapid return to baseline values and lack of correlated changes in other parameters. The intelligent monitoring system prevented unnecessary intervention, ensuring <strong>No shutdown</strong> was required, maintaining operational continuity and avoiding costly downtime.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChartMonitoring;
