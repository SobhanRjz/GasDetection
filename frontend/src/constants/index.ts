// App constants
export const APP_NAME = 'Gas Safety';
export const APP_VERSION = '1.0.0';

// API endpoints
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
  ABOUT: '/about',
} as const;

// Sensor thresholds
export const THRESHOLDS = {
  GAS_SAFE: 50,
  GAS_WARNING: 70,
  GAS_DANGER: 90,
  TEMPERATURE_MAX: 40,
  TEMPERATURE_MIN: -10,
} as const;

// Alert severities
export const ALERT_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

// Sensor types
export const SENSOR_TYPES = {
  GAS: 'gas',
  TEMPERATURE: 'temperature',
  PRESSURE: 'pressure',
} as const;

// Status values
export const STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  MAINTENANCE: 'maintenance',
  ERROR: 'error',
} as const;

// Languages
export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
] as const;

// Themes
export const THEMES = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'auto', label: 'Auto' },
] as const;
