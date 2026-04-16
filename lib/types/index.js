// Type definitions as JSDoc comments for documentation

/**
 * @typedef {('student' | 'vendor' | 'admin')} UserRole
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {UserRole} role
 * @property {string} [avatar]
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} AuthState
 * @property {boolean} isAuthenticated
 * @property {User|null} user
 * @property {string|null} token
 */

/**
 * @typedef {('washing' | 'ironing' | 'blankets' | 'dry-clean' | 'express')} ServiceType
 */

/**
 * @typedef {('placed' | 'accepted' | 'processing' | 'ready' | 'delivered' | 'rejected')} OrderStatus
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} studentId
 * @property {string} studentName
 * @property {string} [studentPhone]
 * @property {string} [vendorId]
 * @property {string} [vendorName]
 * @property {ServiceType} serviceType
 * @property {number} quantity
 * @property {OrderStatus} status
 * @property {Date} pickupDate
 * @property {Date} [deliveryDate]
 * @property {number} price
 * @property {string} [notes]
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} orderId
 * @property {string} senderId
 * @property {UserRole} senderRole
 * @property {string} senderName
 * @property {string} content
 * @property {Date} createdAt
 * @property {boolean} isRead
 */

/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {string} userId
 * @property {('order_update' | 'message' | 'payment' | 'general')} type
 * @property {string} title
 * @property {string} message
 * @property {string} [orderId]
 * @property {boolean} isRead
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} Vendor
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [phone]
 * @property {string} location
 * @property {Object} operatingHours
 * @property {string} operatingHours.open
 * @property {string} operatingHours.close
 * @property {ServiceType[]} services
 * @property {number} rating
 * @property {number} totalOrders
 * @property {number} acceptanceRate
 * @property {string} [avatar]
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} StoreSettings
 * @property {string} storeName
 * @property {string} location
 * @property {string} phone
 * @property {Object} operatingHours
 * @property {string} operatingHours.open
 * @property {string} operatingHours.close
 * @property {ServiceType[]} services
 * @property {number} pricePerKg
 */

/**
 * @typedef {Object} AnalyticsData
 * @property {number} totalRevenue
 * @property {number} totalOrders
 * @property {number} completedOrders
 * @property {number} averageRating
 * @property {Array<{date: string, revenue: number}>} revenueByDate
 * @property {Array<{service: ServiceType, count: number}>} serviceBreakdown
 * @property {Object} orderStats
 * @property {number} orderStats.pending
 * @property {number} orderStats.completed
 * @property {number} orderStats.rejected
 */

export {};
