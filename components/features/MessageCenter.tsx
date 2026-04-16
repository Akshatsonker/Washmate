'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMessages } from '@/lib/hooks/useMessages';

export function MessageCenter({
  orderId,
  userId,
  userName,
  userRole,
}) {
  const { messages, sendMessage } = useMessages(orderId);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
const prevMessageCountRef = useRef(0);

useEffect(() => {
  if (messages.length > prevMessageCountRef.current) {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    prevMessageCountRef.current = messages.length;
  }
}, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    sendMessage(userId, userRole, userName, content);
    setContent('');
    setLoading(false);
  };

  return (
    <Card className="flex flex-col h-96">
      <CardHeader className="border-b">
        <CardTitle className="text-lg">Messages</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.senderId === userId
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm font-medium">
                    {msg.senderName}
                  </p>
                  <p className="mt-1">{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.senderId === userId
                        ? 'text-blue-100'
                        : 'text-gray-600'
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </CardContent>

      {/* Message Input */}
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={loading || !content.trim()}
            className="px-6"
          >
            {loading ? '...' : 'Send'}
          </Button>
        </form>
      </div>
    </Card>
  );
}
