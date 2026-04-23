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
  const { messages, sendMessage, loading: messagesLoading } = useMessages(orderId);
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const prevMessageCountRef = useRef(0);

  // ─── Auto-scroll on new messages ───
  useEffect(() => {
    if (messages.length > prevMessageCountRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      prevMessageCountRef.current = messages.length;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!content.trim() || sending) return;

    setSending(true);
    await sendMessage(userId, userRole, userName, content.trim());
    setContent('');
    setSending(false);
  };

  return (
    <Card className="flex flex-col h-96">
      <CardHeader className="border-b py-3">
        <CardTitle className="text-lg">Messages</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
        {messagesLoading ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <p>Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => {
              // ✅ Stringify both sides — MongoDB ObjectId vs plain string never mismatches
              const isOwnMessage = msg.senderId?.toString() === userId?.toString();

              return (
                <div
                  key={msg._id || msg.id}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl ${
                      isOwnMessage
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-gray-200 text-gray-900 rounded-bl-sm'
                    }`}
                  >
                    <p className={`text-xs font-semibold mb-1 ${
                      isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.senderName}
                      <span className="font-normal opacity-75"> · {msg.senderRole}</span>
                    </p>

                    <p className="text-sm leading-relaxed">{msg.content}</p>

                    <p className={`text-xs mt-1 text-right ${
                      isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
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
            disabled={sending}
            className="flex-1"
            autoComplete="off"
          />
          <Button
            type="submit"
            disabled={sending || !content.trim()}
            className="px-6"
          >
            {sending ? '...' : 'Send'}
          </Button>
        </form>
      </div>
    </Card>
  );
}
