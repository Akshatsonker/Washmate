'use client';

import { Sidebar } from '@/components/shared/Sidebar';
import { TopNav } from '@/components/shared/TopNav';
import { NotificationCenter } from '@/components/features/NotificationCenter';
import { useAuth } from '@/lib/hooks/useAuth';

export default function StudentHistoryPage() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav title="Order History & Notifications" />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order History & Notifications
              </h1>
              <p className="text-gray-600 mt-2">
                Track all your notifications and order updates
              </p>
            </div>

            {/* Notifications */}
            {user && (
              <NotificationCenter userId={user.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
