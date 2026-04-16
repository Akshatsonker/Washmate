'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/lib/hooks/useNotifications';
import { Button } from '@/components/ui/button';

export function NotificationCenter({ userId }) {
  const { notifications, markAsRead, deleteNotification, markAllAsRead } =
    useNotifications(userId);

  const unreadNotifications = notifications.filter(n => !n.isRead);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Notifications</CardTitle>
        {unreadNotifications.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => markAllAsRead(userId)}
          >
            Mark all as read
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No notifications</p>
        ) : (
          notifications
            .slice()
            .reverse()
            .map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  notif.isRead
                    ? 'bg-white border-gray-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
                onClick={() => markAsRead(notif.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">
                        {notif.title}
                      </h4>
                      {!notif.isRead && (
                        <Badge variant="default" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notif.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(notif.createdAt).toLocaleDateString()} at{' '}
                      {new Date(notif.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notif.id);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
        )}
      </CardContent>
    </Card>
  );
}
