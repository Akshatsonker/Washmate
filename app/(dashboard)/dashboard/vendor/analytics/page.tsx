'use client';

import { Sidebar } from '@/components/shared/Sidebar';
import { TopNav } from '@/components/shared/TopNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalyticsDashboard } from '@/components/features/AnalyticsDashboard';
import { useAuth } from '@/lib/hooks/useAuth';
import { useOrders } from '@/lib/hooks/useOrders';

export default function VendorAnalyticsPage() {
  const { user } = useAuth();
  const { orders } = useOrders(user?.id, 'vendor');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav title="Analytics" />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Track your business performance and order metrics
              </p>
            </div>

            {orders.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500 py-8">
                    No orders yet. Start accepting orders to see analytics.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <AnalyticsDashboard orders={orders} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
