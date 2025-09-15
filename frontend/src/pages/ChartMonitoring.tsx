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
      let value = 12.8; // Normal baseline
      
      // Create false alarm scenario with pressure drops around 30% through the timeline
      const timeProgress = (hours * 60 - i) / (hours * 60);
      if (timeProgress > 0.25 && timeProgress < 0.4) {
        // Sudden drop that looks like an alarm (pressure loss)
        value = 7.2 - Math.random() * 1.5; // Drop to 5.7-7.2 range
      } else if (timeProgress > 0.4 && timeProgress < 0.45) {
        // Quick return to normal (indicating false alarm)
        value = 12.8 + (Math.random() - 0.5) * 1.0;
      } else if (timeProgress > 0.6 && timeProgress < 0.7) {
        // Another smaller drop anomaly
        value = 9.5 - Math.random() * 1.0; // Drop to 8.5-9.5 range
      } else if (timeProgress > 0.7 && timeProgress < 0.72) {
        // Quick recovery from second drop
        value = 12.8 + (Math.random() - 0.5) * 1.0;
      } else {
        // Normal operation with small variations
        value = 12.8 + (Math.random() - 0.5) * 1.5;
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
      suctionPressure: generateMockData(hours, 12.5, 2.0),
      dischargePressure: generateMockData(hours, 45.2, 5.5),
      temperature: generateMockData(hours, 78.5, 8.0),
      flowRate: generateMockData(hours, 125.8, 15.2),
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

    // SVG path generation
    const width = 100;
    const height = 60;
    const padding = 5;
    
    const pathData = data.map((point, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
      const y = height - padding - ((point.value - min) / range) * (height - padding * 2);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    const areaPath = `${pathData} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;

    return (
      <div className="chart-card">
        <div className="chart-header">
          <div className="chart-title-section">
            <h3 className="chart-title">{title}</h3>
            <div className="chart-current-value">
              <span className="chart-value">{currentValue}</span>
              <span className="chart-unit">{unit}</span>
            </div>
          </div>
          <div className="chart-change">
            <span className={`chart-change-icon ${change >= 0 ? 'chart-change--up' : 'chart-change--down'}`}>
              {change >= 0 ? '↗' : '↘'}
            </span>
            <span className="chart-change-value">
              {Math.abs(changePercent).toFixed(1)}%
            </span>
          </div>
        </div>
        
        <div className="chart-container">
          <svg 
            className="chart-svg" 
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`gradient-${title.replace(/\s+/g, '-').toLowerCase()}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
                <stop offset="100%" stopColor={color} stopOpacity="0.05"/>
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f1f5f9" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5"/>
            
            {/* Area fill */}
            <path 
              d={areaPath}
              fill={`url(#gradient-${title.replace(/\s+/g, '-').toLowerCase()})`}
            />
            
            {/* Line */}
            <path
              d={pathData}
              fill="none"
              stroke={color}
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Current value dot */}
            <circle
              cx={width - padding}
              cy={height - padding - ((currentValue - min) / range) * (height - padding * 2)}
              r="3"
              fill={color}
              stroke="#ffffff"
              strokeWidth="2"
            />
          </svg>
          
          <div className="chart-y-axis">
            <span className="chart-y-max">{max.toFixed(1)}</span>
            <span className="chart-y-mid">{((max + min) / 2).toFixed(1)}</span>
            <span className="chart-y-min">{min.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="chart-footer">
          <div className="chart-range-info">
            <span className="chart-range-label">Range:</span>
            <span className="chart-range-value">{min.toFixed(1)} - {max.toFixed(1)} {unit}</span>
          </div>
          <div className="chart-data-points">
            <span className="chart-points-count">{data.length} points</span>
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
            color: '#0ea5e9',
            minValue: 8,
            maxValue: 18
          })}
          
          {renderChart({
            title: 'Discharge Pressure',
            unit: 'bar',
            data: chartData.dischargePressure,
            color: '#10b981',
            minValue: 35,
            maxValue: 55
          })}
          
          {renderChart({
            title: 'Compressor Temperature',
            unit: '°C',
            data: chartData.temperature,
            color: '#f59e0b',
            minValue: 65,
            maxValue: 95
          })}
          
          {renderChart({
            title: 'Flow Rate',
            unit: 'MMSCFD',
            data: chartData.flowRate,
            color: '#ef4444',
            minValue: 100,
            maxValue: 150
          })}
          
          <div className="chart-card chart-card--large">
            <div className="chart-header">
              <div className="chart-title-section">
                <h3 className="chart-title chart-title--large">False Signal Detection</h3>
                <h4 className="chart-subtitle">Guided Scenario</h4>
                <div className="chart-current-value">
                  <span className="chart-value">{chartData.falseSignalDetection[chartData.falseSignalDetection.length - 1]?.value || 0}</span>
                  <span className="chart-unit">bar</span>
                </div>
              </div>
              <div className="chart-change">
                <span className={`chart-change-icon ${
                  chartData.falseSignalDetection.length > 1 && 
                  chartData.falseSignalDetection[chartData.falseSignalDetection.length - 1]?.value >= 
                  chartData.falseSignalDetection[chartData.falseSignalDetection.length - 2]?.value 
                    ? 'chart-change--up' : 'chart-change--down'
                }`}>
                  {chartData.falseSignalDetection.length > 1 && 
                   chartData.falseSignalDetection[chartData.falseSignalDetection.length - 1]?.value >= 
                   chartData.falseSignalDetection[chartData.falseSignalDetection.length - 2]?.value ? '↗' : '↘'}
                </span>
                <span className="chart-change-value">
                  {chartData.falseSignalDetection.length > 1 ? 
                    Math.abs(((chartData.falseSignalDetection[chartData.falseSignalDetection.length - 1]?.value - 
                              chartData.falseSignalDetection[chartData.falseSignalDetection.length - 2]?.value) / 
                              chartData.falseSignalDetection[chartData.falseSignalDetection.length - 2]?.value) * 100).toFixed(1)
                    : '0.0'}%
                </span>
              </div>
            </div>
            
            <div className="chart-container chart-container--large">
              <svg 
                className="chart-svg" 
                viewBox="0 0 100 60"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="gradient-false-signal" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#000000" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.05"/>
                  </linearGradient>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f1f5f9" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                
                <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5"/>
                
                {(() => {
                  const data = chartData.falseSignalDetection;
                  if (data.length === 0) return null;
                  
                  const values = data.map(d => d.value);
                  const min = 5;
                  const max = 16;
                  const range = max - min;
                  
                  const width = 100;
                  const height = 60;
                  const padding = 5;
                  
                  const pathData = data.map((point, index) => {
                    const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
                    const y = height - padding - ((point.value - min) / range) * (height - padding * 2);
                    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ');

                  const areaPath = `${pathData} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;
                  const currentValue = values[values.length - 1];
                  
                  return (
                    <>
                      <path 
                        d={areaPath}
                        fill="url(#gradient-false-signal)"
                      />
                      <path
                        d={pathData}
                        fill="none"
                        stroke="#000000"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx={width - padding}
                        cy={height - padding - ((currentValue - min) / range) * (height - padding * 2)}
                        r="3"
                        fill="#000000"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    </>
                  );
                })()}
              </svg>
              
              <div className="chart-y-axis">
                <span className="chart-y-max">16.0</span>
                <span className="chart-y-mid">10.5</span>
                <span className="chart-y-min">5.0</span>
              </div>
            </div>
            
            <div className="chart-footer">
              <div className="chart-range-info">
                <span className="chart-range-label">Range:</span>
                <span className="chart-range-value">5.0 - 16.0 bar</span>
              </div>
              <div className="chart-data-points">
                <span className="chart-points-count">{chartData.falseSignalDetection.length} points</span>
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
