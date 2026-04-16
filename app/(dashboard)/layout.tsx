'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

const VENDOR_EMAIL = 'keshavlaundry@gmail.com';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Not logged in — send to login
    if (!isAuthenticated || !user) {
      router.push('/');
      return;
    }

    const isVendorRoute = pathname.startsWith('/dashboard/vendor');
    const isAdminRoute = pathname.startsWith('/dashboard/admin');

    // Non-vendor trying to access vendor pages
    if (isVendorRoute && user.email !== VENDOR_EMAIL) {
      router.push('/dashboard/student');
      return;
    }

    // Non-admin trying to access admin pages
    if (isAdminRoute && user.role !== 'admin') {
      router.push('/dashboard/student');
      return;
    }

    // Vendor trying to access student pages
    if (user.email === VENDOR_EMAIL && !isVendorRoute) {
      router.push('/dashboard/vendor');
      return;
    }
  }, [isAuthenticated, user, pathname, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  // Block render until redirect happens
  const isVendorRoute = pathname.startsWith('/dashboard/vendor');
  const isAdminRoute = pathname.startsWith('/dashboard/admin');

  if (isVendorRoute && user.email !== VENDOR_EMAIL) return null;
  if (isAdminRoute && user.role !== 'admin') return null;
  if (user.email === VENDOR_EMAIL && !isVendorRoute) return null;

  return <>{children}</>;
}