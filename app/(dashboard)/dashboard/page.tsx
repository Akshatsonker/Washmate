'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/'); // 🔐 not logged in → go to login
      return;
    }

    if (user) {
      // ✅ Use user (NOT data.user)
      if (user.role === 'student') {
        router.push('/dashboard/student');
      } else if (user.role === 'vendor') {
        router.push('/dashboard/vendor');
      } else if (user.role === 'admin') {
        router.push('/dashboard/admin');
      }
    }
  }, [user, isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Loading...</p>
    </div>
  );
}