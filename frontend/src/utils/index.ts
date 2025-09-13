// Utility functions for the Gas Safety application

/**
 * Format a timestamp to a human-readable relative time
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInMs = now.getTime() - targetDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

  return targetDate.toLocaleDateString();
}

/**
 * Get status color based on value and thresholds
 */
export function getStatusColor(value: number, thresholds: { safe: number; warning: number; danger: number }): string {
  if (value >= thresholds.danger) return '#ef4444'; // red
  if (value >= thresholds.warning) return '#f59e0b'; // amber
  return '#22c55e'; // green
}

/**
 * Get status label based on value and thresholds
 */
export function getStatusLabel(value: number, thresholds: { safe: number; warning: number; danger: number }): string {
  if (value >= thresholds.danger) return 'Danger';
  if (value >= thresholds.warning) return 'Warning';
  return 'Safe';
}

/**
 * Format sensor value with unit
 */
export function formatSensorValue(value: number, unit: string, decimals: number = 1): string {
  return `${value.toFixed(decimals)} ${unit}`;
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Debounce function for search/filter inputs
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
