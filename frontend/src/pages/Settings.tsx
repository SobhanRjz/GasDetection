import { useState } from 'react';
import './Settings.css';

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsAlerts: false,
    gasThreshold: 70,
    temperatureAlert: true,
    maintenanceReminders: true,
    dataRetention: 90,
    theme: 'dark',
    language: 'en'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings">
      <header className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">Configure your gas detection system preferences</p>
      </header>

      <div className="settings-content">
        {/* Notifications Section */}
        <section className="settings-section">
          <h2 className="section-title">Notifications</h2>

          <div className="setting-item">
            <div className="setting-info">
              <h3 className="setting-label">Email Notifications</h3>
              <p className="setting-description">Receive alerts via email when thresholds are exceeded</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3 className="setting-label">SMS Alerts</h3>
              <p className="setting-description">Receive critical alerts via SMS</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.smsAlerts}
                onChange={(e) => handleSettingChange('smsAlerts', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3 className="setting-label">Temperature Alerts</h3>
              <p className="setting-description">Get notified about temperature fluctuations</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.temperatureAlert}
                onChange={(e) => handleSettingChange('temperatureAlert', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </section>

        {/* Thresholds Section */}
        <section className="settings-section">
          <h2 className="section-title">Thresholds</h2>

          <div className="setting-item">
            <div className="setting-info">
              <h3 className="setting-label">Gas Level Threshold</h3>
              <p className="setting-description">Alert when gas level exceeds this percentage</p>
            </div>
            <div className="slider-container">
              <input
                type="range"
                min="50"
                max="100"
                value={settings.gasThreshold}
                onChange={(e) => handleSettingChange('gasThreshold', Number(e.target.value))}
                className="slider"
              />
              <span className="slider-value">{settings.gasThreshold}%</span>
            </div>
          </div>
        </section>

        {/* System Section */}
        <section className="settings-section">
          <h2 className="section-title">System</h2>

          <div className="setting-item">
            <div className="setting-info">
              <h3 className="setting-label">Maintenance Reminders</h3>
              <p className="setting-description">Receive reminders for system maintenance</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.maintenanceReminders}
                onChange={(e) => handleSettingChange('maintenanceReminders', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3 className="setting-label">Data Retention</h3>
              <p className="setting-description">Days to keep historical data</p>
            </div>
            <select
              value={settings.dataRetention}
              onChange={(e) => handleSettingChange('dataRetention', Number(e.target.value))}
              className="select-input"
            >
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
              <option value={180}>180 days</option>
              <option value={365}>1 year</option>
            </select>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="settings-section">
          <h2 className="section-title">Preferences</h2>

          <div className="setting-item">
            <div className="setting-info">
              <h3 className="setting-label">Theme</h3>
              <p className="setting-description">Choose your preferred theme</p>
            </div>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
              className="select-input"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3 className="setting-label">Language</h3>
              <p className="setting-description">Select your language</p>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="select-input"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="settings-actions">
          <button className="btn-primary" onClick={handleSave}>
            Save Settings
          </button>
          <button className="btn-secondary" onClick={() => window.location.reload()}>
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
