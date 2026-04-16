'use client';

import { useCallback, useEffect, useState } from 'react';
import { storage } from '../utils/storage';

export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(() => {
    const allNotifications = storage.getNotifications();
    
    if (userId) {
      const filtered = allNotifications.filter(n => n.userId === userId);
      setNotifications(filtered);
      const unread = filtered.filter(n => !n.isRead).length;
      setUnreadCount(unread);
    } else {
      setNotifications(allNotifications);
      const unread = allNotifications.filter(n => !n.isRead).length;
      setUnreadCount(unread);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
    
    const interval = setInterval(fetchNotifications, 3000);
    
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const addNotification = useCallback(
    (notification) => {
      const newNotification = {
        ...notification,
        id: `notif_${Date.now()}`,
        createdAt: new Date(),
      };

      const allNotifications = storage.getNotifications();
      storage.setNotifications([...allNotifications, newNotification]);
      fetchNotifications();
    },
    [fetchNotifications]
  );

  const markAsRead = useCallback((notificationId) => {
    const allNotifications = storage.getNotifications();
    const updated = allNotifications.map(n => {
      if (n.id === notificationId) {
        return { ...n, isRead: true };
      }
      return n;
    });
    storage.setNotifications(updated);
    fetchNotifications();
  }, [fetchNotifications]);

  const markAllAsRead = useCallback((userId) => {
    const allNotifications = storage.getNotifications();
    const updated = allNotifications.map(n => {
      if (n.userId === userId) {
        return { ...n, isRead: true };
      }
      return n;
    });
    storage.setNotifications(updated);
    fetchNotifications();
  }, [fetchNotifications]);

  const deleteNotification = useCallback((notificationId) => {
    const allNotifications = storage.getNotifications();
    storage.setNotifications(allNotifications.filter(n => n.id !== notificationId));
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refetch: fetchNotifications,
  };
}
