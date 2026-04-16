'use client';

import { Sidebar } from '@/components/shared/Sidebar';
import { TopNav } from '@/components/shared/TopNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/hooks/useAuth';
import { useOrders } from '@/lib/hooks/useOrders';
import Link from 'next/link';

export default function VendorOrdersPage() {
  const { user } = useAuth();
  const { orders } = useOrders(user?.id, 'vendor');

  const pendingOrders = orders.filter(o => o.status === 'placed');
  const activeOrders = orders.filter(o => 
    o.status === 'accepted' || o.status === 'processing'
  );
  const completedOrders = orders.filter(o => o.status === 'delivered' || o.status === 'rejected');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'placed':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav title="Manage Orders" />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-600 mt-2">
                Accept, reject, and manage incoming orders
              </p>
            </div>

            {/* Orders Tabs */}
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">
                  Pending ({pendingOrders.length})
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active ({activeOrders.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({completedOrders.length})
                </TabsTrigger>
              </TabsList>

              {/* Pending Orders */}
              <TabsContent value="pending" className="space-y-4">
                {pendingOrders.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-gray-500 py-8">No pending orders</p>
                    </CardContent>
                  </Card>
                ) : (
                  pendingOrders.map((order) => (
                    <Link
                      key={order.id}
                      href={`/dashboard/vendor/orders/${order.id}`}
                    >
                      <Card className="border-yellow-200 bg-yellow-50 hover:border-yellow-400 hover:shadow-md transition-all cursor-pointer">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-gray-900">
                                  {order.studentName}
                                </h3>
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  New Request
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                {order.serviceType.charAt(0).toUpperCase() + order.serviceType.slice(1)} • {order.quantity} items
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                Pickup: {new Date(order.pickupDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-gray-900">
                                ${order.price.toFixed(2)}
                              </p>
                              <p className="text-xs text-blue-600 font-medium mt-2">
                                Click to review →
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </TabsContent>

              {/* Active Orders */}
              <TabsContent value="active" className="space-y-4">
                {activeOrders.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-gray-500 py-8">No active orders</p>
                    </CardContent>
                  </Card>
                ) : (
                  activeOrders.map((order) => (
                    <Link
                      key={order.id}
                      href={`/dashboard/vendor/orders/${order.id}`}
                    >
                      <Card className="border-blue-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-gray-900">
                                  {order.studentName}
                                </h3>
                                <Badge className={getStatusColor(order.status)}>
                                  {order.status === 'accepted' ? 'Accepted' : 'Processing'}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                {order.serviceType.charAt(0).toUpperCase() + order.serviceType.slice(1)} • {order.quantity} items
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                Pickup: {new Date(order.pickupDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-gray-900">
                                ${order.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </TabsContent>

              {/* Completed Orders */}
              <TabsContent value="completed" className="space-y-4">
                {completedOrders.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-gray-500 py-8">No completed orders</p>
                    </CardContent>
                  </Card>
                ) : (
                  completedOrders.map((order) => (
                    <Link
                      key={order.id}
                      href={`/dashboard/vendor/orders/${order.id}`}
                    >
                      <Card className="hover:border-gray-400 transition-all cursor-pointer opacity-75">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-gray-900">
                                  {order.studentName}
                                </h3>
                                <Badge className={getStatusColor(order.status)}>
                                  {order.status === 'delivered' ? 'Delivered' : 'Rejected'}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                {new Date(order.updatedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-gray-900">
                                ${order.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
