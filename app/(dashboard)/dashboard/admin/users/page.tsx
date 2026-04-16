'use client';

import { Sidebar } from '@/components/shared/Sidebar';
import { TopNav } from '@/components/shared/TopNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/utils/storage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminUsersPage() {
  const users = storage.getUsers();
  
  const students = users.filter(u => u.role === 'student');
  const vendors = users.filter(u => u.role === 'vendor');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav title="User Management" />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600 mt-2">
                  Manage all platform users
                </p>
              </div>
              <Button>+ Add User</Button>
            </div>

            {/* Users Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">
                  All Users ({users.length})
                </TabsTrigger>
                <TabsTrigger value="students">
                  Students ({students.length})
                </TabsTrigger>
                <TabsTrigger value="vendors">
                  Vendors ({vendors.length})
                </TabsTrigger>
              </TabsList>

              {/* All Users */}
              <TabsContent value="all" className="space-y-4">
                {users.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-gray-500 py-8">No users found</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {users.map((user) => (
                      <Card key={user.id} className="hover:border-gray-400 transition-colors">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{user.name}</h3>
                              <p className="text-sm text-gray-600">{user.email}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Joined: {new Date(user.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <Badge variant="outline">
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                              </Badge>
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Students */}
              <TabsContent value="students" className="space-y-4">
                {students.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-gray-500 py-8">No students found</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {students.map((user) => (
                      <Card key={user.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{user.name}</h3>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                            <Button variant="outline" size="sm">View Profile</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Vendors */}
              <TabsContent value="vendors" className="space-y-4">
                {vendors.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-gray-500 py-8">No vendors found</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {vendors.map((user) => (
                      <Card key={user.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{user.name}</h3>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                            <Button variant="outline" size="sm">View Store</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
