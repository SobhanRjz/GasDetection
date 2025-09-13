// Navigation types
export interface NavItem {
  path: string;
  label: string;
  icon: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  avatar?: string;
}

// Alert types
export interface Alert {
  id: string;
  message: string;
  time: string;
  severity: 'high' | 'medium' | 'low';
  type: 'gas' | 'temperature' | 'system' | 'maintenance';
}

// Sensor types
export interface SensorData {
  id: string;
  type: 'gas' | 'temperature' | 'pressure';
  value: number;
  unit: string;
  threshold: number;
  status: 'normal' | 'warning' | 'danger';
  lastUpdate: Date;
}

// Settings types
export interface AppSettings {
  emailNotifications: boolean;
  smsAlerts: boolean;
  gasThreshold: number;
  temperatureAlert: boolean;
  maintenanceReminders: boolean;
  dataRetention: number;
  theme: 'dark' | 'light' | 'auto';
  language: string;
}
