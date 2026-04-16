'use client';

import { Sidebar } from '@/components/shared/Sidebar';
import { TopNav } from '@/components/shared/TopNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockVendors } from '@/lib/utils/mockData';

export default function AdminVendorsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav title="Vendor Management" />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
                <p className="text-gray-600 mt-2">
                  Monitor and manage all vendor partners
                </p>
                
              </div>
           
            </div>
            

            {/* Vendors List */}
            <div className="space-y-4">
              {mockVendors.map((vendor) => (
                <Card key={vendor.id} className="hover:border-gray-400 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{vendor.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{vendor.location}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {vendor.services.map((service) => (
                            <Badge key={service} variant="secondary" className="text-xs">
                              {service.charAt(0).toUpperCase() + service.slice(1).replace('-', ' ')}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-6 mt-4 text-sm text-gray-600">
                          <div>
                            <span className="text-gray-500">Rating:</span>
                            <span className="font-semibold text-gray-900 ml-2">⭐ {vendor.rating}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Orders:</span>
                            <span className="font-semibold text-gray-900 ml-2">{vendor.totalOrders}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Acceptance Rate:</span>
                            <span className="font-semibold text-gray-900 ml-2">
                              {(vendor.acceptanceRate * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">View Orders</Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          Disable
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
