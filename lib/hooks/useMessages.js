'use client';

import { useCallback, useEffect, useState } from 'react';
import { storage } from '../utils/storage';

export function useMessages(orderId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(() => {
    const allMessages = storage.getMessages();
    if (orderId) {
      const filtered = allMessages.filter(m => m.orderId === orderId);
      setMessages(filtered);
    } else {
      setMessages(allMessages);
    }
    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    fetchMessages();

    // ✅ Poll every 2 seconds so new messages appear instantly
    const interval = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => clearInterval(interval); // cleanup on unmount
  }, [fetchMessages]);

  const sendMessage = useCallback(
    (senderId, senderRole, senderName, content) => {
      if (!orderId) return;

      const newMessage = {
        id: `msg_${Date.now()}`,
        orderId,
        senderId,
        senderRole,
        senderName,
        content,
        createdAt: new Date(),
        isRead: false,
      };

      const allMessages = storage.getMessages();
      storage.setMessages([...allMessages, newMessage]);
      fetchMessages(); // ✅ immediate refresh after sending
    },
    [orderId, fetchMessages]
  );

  return {
    messages,
    loading,
    sendMessage,
    refetch: fetchMessages,
  };
}