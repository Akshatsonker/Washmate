// User and Authentication Types
export type UserRole = 'student' | 'vendor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// Order Types
export type OrderStatus = 'placed' | 'accepted' | 'processing' | 'ready' | 'delivered' | 'rejected';
export type ServiceType = 'washing' | 'ironing' | 'blankets' | 'dry-clean' | 'express';

export interface Order {
  id: string;
  studentId: string;
  studentName: string;
  studentPhone?: string;
  vendorId?: string;
  vendorName?: string;
  serviceType: ServiceType;
  quantity: number;
  status: OrderStatus;
  pickupDate: Date;
  deliveryDate?: Date;
  price: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  orderId: string;
  senderId: string;
  senderRole: UserRole;
  senderName: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order_update' | 'message' | 'payment' | 'general';
  title: string;
  message: string;
  orderId?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  operatingHours: {
    open: string;
    close: string;
  };
  services: ServiceType[];
  rating: number;
  totalOrders: number;
  acceptanceRate: number;
  avatar?: string;
  createdAt: Date;
}

export interface StoreSettings {
  storeName: string;
  location: string;
  phone: string;
  operatingHours: {
    open: string;
    close: string;
  };
  services: ServiceType[];
  pricePerKg: number;
}

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  completedOrders: number;
  averageRating: number;
  revenueByDate: { date: string; revenue: number }[];
  serviceBreakdown: { service: ServiceType; count: number }[];
  orderStats: {
    pending: number;
    completed: number;
    rejected: number;
  };
}
