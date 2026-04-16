import { User, Order, Vendor, Message, Notification } from '../types';

export const mockUsers: User[] = [
  {
    id: 'student-1',
    email: 'john@university.edu',
    name: 'John Student',
    role: 'student',
    avatar: '👨‍🎓',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'vendor-1',
    email: 'keshavlaundry@gmail.com',
    name: 'Keshav',
    role: 'vendor',
    avatar: '👔',
    createdAt: new Date('2023-06-20'),
  },
  {
    id: 'admin-1',
    email: 'admin@washmate.com',
    name: 'Admin User',
    role: 'admin',
    avatar: '👨‍💼',
    createdAt: new Date('2023-01-01'),
  },
];

export const mockVendors: Vendor[] = [
  {
    id: 'vendor-1',
    name: 'Keshav Laundry Pro',
    email: 'keshavlaundry@gmail.com',
    phone: '+1 555-0123',
    location: 'Adityapur, Jamhsedpur',
    operatingHours: { open: '08:00', close: '20:00' },
    services: ['washing', 'ironing', 'dry-clean'],
    rating: 4.8,
    totalOrders: 342,
    acceptanceRate: 0.96,
    createdAt: new Date('2023-06-20'),
  },
  
];

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    studentId: 'student-1',
    studentName: 'John Student',
    vendorId: 'vendor-1',
    vendorName: 'Keshav Laundry pro',
    serviceType: 'washing',
    quantity: 5,
    status: 'processing',
    pickupDate: new Date('2024-04-10'),
    deliveryDate: new Date('2024-04-12'),
    price: 25.00,
    notes: 'Delicate fabrics, gentle wash',
    createdAt: new Date('2024-04-10T08:30:00'),
    updatedAt: new Date('2024-04-11T10:00:00'),
  },
  
];

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    orderId: 'order-1',
    senderId: 'student-1',
    senderRole: 'student',
    senderName: 'John Student',
    content: 'Hi, can you pick up my laundry this afternoon?',
    createdAt: new Date('2024-04-10T08:35:00'),
    isRead: true,
  },
  
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'student-1',
    type: 'order_update',
    title: 'Order Accepted',
    message: 'Your washing order has been accepted by Alex Laundry Pro',
    orderId: 'order-1',
    isRead: false,
    createdAt: new Date('2024-04-10T08:45:00'),
  },
  {
    id: 'notif-2',
    userId: 'student-1',
    type: 'order_update',
    title: 'Order Ready for Pickup',
    message: 'Your ironing order is ready! Pick up at Quick Clean Express',
    orderId: 'order-2',
    isRead: true,
    createdAt: new Date('2024-04-11T15:00:00'),
  },
];

export function initializeMockData() {
  if (typeof window !== 'undefined') {
    const { storage } = require('./storage');
    
    // Only initialize if data doesn't exist
    if (!localStorage.getItem('washmate_users')) {
      storage.setUsers(mockUsers);
      storage.setVendors(mockVendors);
      storage.setOrders(mockOrders);
      storage.setMessages(mockMessages);
      storage.setNotifications(mockNotifications);
    }
  }
}
