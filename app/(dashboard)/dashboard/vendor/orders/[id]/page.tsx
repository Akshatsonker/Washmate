'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/shared/Sidebar';
import { TopNav } from '@/components/shared/TopNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';
import { useOrders } from '@/lib/hooks/useOrders';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MessageCenter } from '@/components/features/MessageCenter';
export default function VendorOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string ;
  const { user } = useAuth();
 const { orders, updateOrderStatus } = useOrders(user?.id || "vendor1", 'vendor');
  const [loading, setLoading] = useState(false);

  const order = orders.find(o => o.id === orderId);

  const handleAccept = async () => {
    setLoading(true);
    updateOrderStatus(orderId, 'accepted');
    setLoading(false);
    alert('Order accepted! Student has been notified.');
  };

  const handleReject = async () => {
    setLoading(true);
    updateOrderStatus(orderId, 'rejected');
    setLoading(false);
    alert('Order rejected. Student has been notified.');
  };

  const handleUpdateStatus = (newStatus: string) => {
    setLoading(true);
    updateOrderStatus(orderId, newStatus as any);
    setLoading(false);
    alert(`Order status updated to ${newStatus}`);
  };

  if (!order) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopNav title="Order Details" />
          <div className="flex-1 flex items-center justify-center">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">Order not found</p>
                <Link href="/dashboard/vendor/orders">
                  <Button className="mt-4">Back to Orders</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
        <TopNav title="Order Management" />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Order #{order.id.slice(-8)}
                </h1>
                <p className="text-gray-600 mt-2">
                  From: {order.studentName}
                </p>
              </div>
              <Badge className={`${getStatusColor(order.status)} text-base px-4 py-2`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Service Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Service Type</p>
                    <p className="font-semibold text-gray-900">
                      {order.serviceType.charAt(0).toUpperCase() + order.serviceType.slice(1)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Quantity</p>
                    <p className="font-semibold text-gray-900">{order.quantity} kg/items</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Order Total</p>
                    <p className="font-semibold text-xl text-blue-600">
                      ${order.price.toFixed(2)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Pickup Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(order.pickupDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold text-gray-900">{order.studentName}</p>
                  </div>
                  
                  {order.studentPhone && (
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">{order.studentPhone}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Special Instructions */}
            {order.notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Special Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded">
                    {order.notes}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.status === 'placed' && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      This order is waiting for your response. Accept or reject this order.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        onClick={handleAccept}
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700"
                        size="lg"
                      >
                        ✓ Accept Order
                      </Button>
                      <Button
                        onClick={handleReject}
                        disabled={loading}
                        variant="destructive"
                        size="lg"
                      >
                        ✕ Reject Order
                      </Button>
                    </div>
                  </div>
                )}
                
                {order.status === 'accepted' && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      You have accepted this order. Update the status as you progress.
                    </p>
                    <Button
                      onClick={() => handleUpdateStatus('processing')}
                      disabled={loading}
                      className="w-full"
                      size="lg"
                    >
                      Start Processing
                    </Button>
                  </div>
                )}
                
                {order.status === 'processing' && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      The order is being processed. Mark as ready when complete.
                    </p>
                    <Button
                      onClick={() => handleUpdateStatus('ready')}
                      disabled={loading}
                      className="w-full"
                      size="lg"
                    >
                      Mark as Ready
                    </Button>
                  </div>
                )}
                
                {order.status === 'ready' && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      The order is ready. Mark as delivered when customer picks it up.
                    </p>
                    <Button
                      onClick={() => handleUpdateStatus('delivered')}
                      disabled={loading}
                      className="w-full"
                      size="lg"
                    >
                      Mark as Delivered
                    </Button>
                  </div>
                )}
                
                {(order.status === 'delivered' || order.status === 'rejected') && (
                  <div className="space-y-3 p-4 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">
                      This order is {order.status === 'delivered' ? 'completed' : 'rejected'}.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>


          {/* Message Customer */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">💬 Message Customer</CardTitle>
              </CardHeader>
              <CardContent>
                {user && (
                  <MessageCenter
                    orderId={order.id}
                    userId={user.id}
                    userName={user.name}
                    userRole={'vendor'}
                  />
                )}
              </CardContent>
            </Card>

            
            {/* Back Button */}
            <Link href="/dashboard/vendor/orders">
              <Button variant="outline" className="w-full">
                Back to Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
