'use client';

import { useCallback, useEffect, useState } from 'react';
import { storage } from '../utils/storage';

export function useOrders(userId, role) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(() => {
    const allOrders = storage.getOrders();
    
    if (userId && role === 'student') {
      const filtered = allOrders.filter(o => o.studentId === userId);
      setOrders(filtered);
    }  else if (role === 'vendor') {
  // Single vendor app — show all orders that have vendorId 'vendor-1'
  const filtered = allOrders.filter(o => o.vendorId === 'vendor-1');
  setOrders(filtered);
} else {
      setOrders(allOrders);
    }
    setLoading(false);
  }, [userId, role]);

 useEffect(() => {
  fetchOrders();

  const interval = setInterval(() => {
    fetchOrders(); // 🔁 refresh every second
  }, 1000);

  return () => clearInterval(interval);
}, [fetchOrders]);

  const updateOrderStatus = useCallback((orderId, newStatus) => {
    const allOrders = storage.getOrders();
    const updated = allOrders.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus, updatedAt: new Date() };
      }
      return o;
    });
    storage.setOrders(updated);
    fetchOrders();
  }, [fetchOrders]);

  const createOrder = useCallback((order) => {
    const newOrder = {
      ...order,
      id: `order_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const allOrders = storage.getOrders();
    storage.setOrders([...allOrders, newOrder]);
    fetchOrders();
    return newOrder;
  }, [fetchOrders]);

  const deleteOrder = useCallback((orderId) => {
    const allOrders = storage.getOrders();
    storage.setOrders(allOrders.filter(o => o.id !== orderId));
    fetchOrders();
  }, [fetchOrders]);

  const rejectOrder = useCallback((orderId) => {
    updateOrderStatus(orderId, 'rejected');
  }, [updateOrderStatus]);

  return {
    orders,
    loading,
    updateOrderStatus,
    createOrder,
    deleteOrder,
    rejectOrder,
    refetch: fetchOrders,
  };
}
