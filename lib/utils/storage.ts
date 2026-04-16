import { User, Order, Message, Notification, Vendor, StoreSettings } from '../types';

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
  setAuth: (auth: { user: User; token: string }) => {
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
  setOrders: (orders: Order[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }
  },
  getOrders: (): Order[] => {
    if (typeof window !== 'undefined') {
      const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return orders ? JSON.parse(orders) : [];
    }
    return [];
  },

  // Messages
  setMessages: (messages: Message[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    }
  },
  getMessages: (): Message[] => {
    if (typeof window !== 'undefined') {
      const messages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return messages ? JSON.parse(messages) : [];
    }
    return [];
  },

  // Notifications
  setNotifications: (notifications: Notification[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    }
  },
  getNotifications: (): Notification[] => {
    if (typeof window !== 'undefined') {
      const notifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return notifications ? JSON.parse(notifications) : [];
    }
    return [];
  },

  // Vendors
  setVendors: (vendors: Vendor[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(vendors));
    }
  },
  getVendors: (): Vendor[] => {
    if (typeof window !== 'undefined') {
      const vendors = localStorage.getItem(STORAGE_KEYS.VENDORS);
      return vendors ? JSON.parse(vendors) : [];
    }
    return [];
  },

  // Users
  setUsers: (users: User[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
  },
  getUsers: (): User[] => {
    if (typeof window !== 'undefined') {
      const users = localStorage.getItem(STORAGE_KEYS.USERS);
      return users ? JSON.parse(users) : [];
    }
    return [];
  },

  // Store Settings
  setStoreSettings: (settings: StoreSettings) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.STORE_SETTINGS, JSON.stringify(settings));
    }
  },
  getStoreSettings: (): StoreSettings | null => {
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
