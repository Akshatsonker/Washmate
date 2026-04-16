export const mockUsers = [
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
    email: 'keshavlaundry.com',
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

export const mockVendors = [
  {
    id: 'vendor-1',
    name: 'keshav',
    email: 'keshav@laundry.com',
    phone: '999999999',
    location: 'Adityapur, Jamshedpur',
    operatingHours: { open: '08:00', close: '20:00' },
    services: ['washing', 'ironing', 'dry-clean'],
    rating: 4.8,
    totalOrders: 342,
    acceptanceRate: 0.96,
    createdAt: new Date('2023-06-20'),
  },
];

export const mockOrders = [
  {
    id: 'order-1',
    studentId: 'student-1',
    studentName: 'John Student',
    vendorId: 'vendor-1',
    vendorName: 'Keshav',
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

export const mockMessages = [
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
  {
    id: 'msg-2',
    orderId: 'order-1',
    senderId: 'vendor-1',
    senderRole: 'vendor',
    senderName: 'Keshav',
    content: 'Sure! We can pick up between 2-4 PM today. See you soon!',
    createdAt: new Date('2024-04-10T08:40:00'),
    isRead: true,
  },
];

export const mockNotifications = [
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
];

export function initializeMockData() {
  if (typeof window !== 'undefined') {
    // ✅ Only initialize if data doesn't already exist
    if (!localStorage.getItem('washmate_users')) {
      const { storage } = require('./storage');
      storage.setUsers(mockUsers);
      storage.setVendors(mockVendors);
      storage.setOrders(mockOrders);
      storage.setMessages(mockMessages);
      storage.setNotifications(mockNotifications);
    }
  }
}