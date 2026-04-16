'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn } from '@/lib/utils';

const studentMenuItems = [
  { label: 'Dashboard', href: '/dashboard/student', icon: '📊' },
  { label: 'My Orders', href: '/dashboard/student/orders', icon: '📦' },
  { label: 'Messages', href: '/dashboard/student/messages', icon: '💬' },
  { label: 'Order History', href: '/dashboard/student/history', icon: '📜' },
];

const vendorMenuItems = [
  { label: 'Dashboard', href: '/dashboard/vendor', icon: '📊' },
  { label: 'Incoming Orders', href: '/dashboard/vendor/orders', icon: '📥' },
  { label: 'Analytics', href: '/dashboard/vendor/analytics', icon: '📈' },
  { label: 'Settings', href: '/dashboard/vendor/settings', icon: '⚙️' },
];

const adminMenuItems = [
  { label: 'Dashboard', href: '/dashboard/admin', icon: '📊' },
  { label: 'Users', href: '/dashboard/admin/users', icon: '👥' },
  { label: 'Vendors', href: '/dashboard/admin/vendors', icon: '🏪' },
  { label: 'Reports', href: '/dashboard/admin/reports', icon: '📋' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user = {}, logout } = useAuth();

  const menuItems =
    user?.role === 'student' ? studentMenuItems :
    user?.role === 'vendor' ? vendorMenuItems :
    adminMenuItems;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-blue-500">
        <h1 className="text-2xl font-bold">🧺 WashMate</h1>
        <p className="text-xs text-blue-100 mt-1">
          {user?.role === 'student' && 'Student Dashboard'}
          {user?.role === 'vendor' && 'Vendor Dashboard'}
          {user?.role === 'admin' && 'Admin Dashboard'}
        </p>
      </div>

      {/* User Info — NO role switching buttons */}
      <div className="p-4 border-b border-blue-500">
        <p className="text-sm font-medium">{user?.name}</p>
        <p className="text-xs text-blue-100">{user?.email}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              pathname === item.href
                ? 'bg-blue-500 text-white'
                : 'text-blue-100 hover:bg-blue-500/50'
            )}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-blue-500">
        <Button
          variant="outline"
          className="w-full bg-blue-500 text-white hover:bg-blue-400 border-0"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}