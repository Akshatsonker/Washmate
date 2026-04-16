
'use client';
import { Sidebar } from '@/components/shared/Sidebar';
import { TopNav } from '@/components/shared/TopNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/hooks/useAuth';
import { useOrders } from '@/lib/hooks/useOrders';
import Link from 'next/link';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { orders } = useOrders(user?.id, 'student');

  const activeOrders = orders.filter(o => 
    o.status === 'placed' || o.status === 'accepted' || o.status === 'processing'
  );
  const completedOrders = orders.filter(o => 
    o.status === 'delivered' || o.status === 'rejected'
  );

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
        <TopNav title="Student Dashboard" />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-2">
                Track your laundry orders and manage your requests
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-600">{activeOrders.length}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Completed Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">{completedOrders.length}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-purple-600">
                    ${orders.reduce((sum, o) => sum + o.price, 0).toFixed(2)}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-orange-600">{orders.length}</p>
                </CardContent>
              </Card>
            </div>

            {/* Active Orders Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Orders</CardTitle>
                <Link href="/dashboard/student/orders">
                  <Button size="sm" variant="outline">
                    View All Orders
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {activeOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No active orders</p>
                    <Link href="/dashboard/student/orders">
                      <Button>Create New Order</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activeOrders.map((order) => (
                      <Link
                        key={order.id}
                        href={`/dashboard/student/orders/${order.id}`}
                        className="block p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <p className="font-medium text-gray-900">
                                {order.serviceType.charAt(0).toUpperCase() + order.serviceType.slice(1)}
                              </p>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              Vendor: {order.vendorName || 'Not assigned'}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Pickup: {new Date(order.pickupDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${order.price.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">{order.quantity} items</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/dashboard/student/orders">
                    <Button className="w-full" size="lg">
                      📦 New Order
                    </Button>
                  </Link>
                  <Link href="/dashboard/student/messages">
                    <Button variant="outline" className="w-full" size="lg">
                      💬 Messages
                    </Button>
                  </Link>
                  <Link href="/dashboard/student/history">
                    <Button variant="outline" className="w-full" size="lg">
                      📜 Order History
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
