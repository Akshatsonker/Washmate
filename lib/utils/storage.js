// ─────────────────────────────────────────────────────────────
//  storage.js — single source of truth for all localStorage ops
//  ALL auth reads/writes go through setAuth / getAuth / clearAuth
//  so the token is always consistent across the app.
// ─────────────────────────────────────────────────────────────

const STORAGE_KEYS = {
  AUTH: 'washmate_auth',
  MESSAGES: 'washmate_messages',        // legacy — no longer used by useMessages
  NOTIFICATIONS: 'washmate_notifications',
  VENDORS: 'washmate_vendors',
  USERS: 'washmate_users',
  STORE_SETTINGS: 'washmate_store_settings',
};

export const storage = {
  // ── Auth ────────────────────────────────────────────────────
  setAuth: ({ user, token }) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify({ user, token }));
  },

  getAuth: () => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  clearAuth: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },

  // ── Notifications (still local — migrate later if needed) ───
  setNotifications: (notifications) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  },

  getNotifications: () => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  // ── Vendors (mock — replace when backend has /vendors) ──────
  setVendors: (vendors) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(vendors));
  },

  getVendors: () => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.VENDORS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  // ── Users (mock — Admin panel) ───────────────────────────────
  setUsers: (users) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  getUsers: () => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USERS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  // ── Store settings ───────────────────────────────────────────
  setStoreSettings: (settings) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.STORE_SETTINGS, JSON.stringify(settings));
  },

  getStoreSettings: () => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.STORE_SETTINGS);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  // ── Utility ─────────────────────────────────────────────────
  clearAll: () => {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  },
};
