const STORAGE_KEYS = {
  AUTH: 'washmate_auth',
  ORDERS: 'washmate_orders',
  MESSAGES: 'washmate_messages',
  NOTIFICATIONS: 'washmate_notifications',
  VENDORS: 'washmate_vendors',
  USERS: 'washmate_users',
  STORE_SETTINGS: 'washmate_store_settings',
};

export const storage = {
  // Auth
  setAuth: (auth) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(auth));
    }
  },
  getAuth: () => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem(STORAGE_KEYS.AUTH);
      return auth ? JSON.parse(auth) : null;
    }
    return null;
  },
  clearAuth: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  },

  // Orders
  setOrders: (orders) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }
  },
  getOrders: () => {
    if (typeof window !== 'undefined') {
      const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return orders ? JSON.parse(orders) : [];
    }
    return [];
  },

  // Messages
  setMessages: (messages) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    }
  },
  getMessages: () => {
    if (typeof window !== 'undefined') {
      const messages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return messages ? JSON.parse(messages) : [];
    }
    return [];
  },

  // Notifications
  setNotifications: (notifications) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    }
  },
  getNotifications: () => {
    if (typeof window !== 'undefined') {
      const notifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return notifications ? JSON.parse(notifications) : [];
    }
    return [];
  },

  // Vendors
  setVendors: (vendors) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(vendors));
    }
  },
  getVendors: () => {
    if (typeof window !== 'undefined') {
      const vendors = localStorage.getItem(STORAGE_KEYS.VENDORS);
      return vendors ? JSON.parse(vendors) : [];
    }
    return [];
  },

  // Users
  setUsers: (users) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
  },
  getUsers: () => {
    if (typeof window !== 'undefined') {
      const users = localStorage.getItem(STORAGE_KEYS.USERS);
      return users ? JSON.parse(users) : [];
    }
    return [];
  },

  // Store Settings
  setStoreSettings: (settings) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.STORE_SETTINGS, JSON.stringify(settings));
    }
  },
  getStoreSettings: () => {
    if (typeof window !== 'undefined') {
      const settings = localStorage.getItem(STORAGE_KEYS.STORE_SETTINGS);
      return settings ? JSON.parse(settings) : null;
    }
    return null;
  },

  // Utility
  clearAll: () => {
    if (typeof window !== 'undefined') {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    }
  },
};
