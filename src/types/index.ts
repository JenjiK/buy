export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  farmer: string;
  location: string;
  category: string;
  stock: number;
  description: string;
  organic: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  totalSpent: number;
  memberSince: string;
}

export interface PointsTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  amount: number;
  description: string;
  date: string;
  orderId?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  pointsEarned: number;
  pointsUsed: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
  deliveryAddress: string;
}

export interface PointsReward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  discountAmount: number;
  type: 'percentage' | 'fixed';
  icon: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'cash' | 'transfer' | 'qr';
  icon: string;
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  totalProducts: number;
  joinedDate: string;
  description: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'customer' | 'farmer';
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'product';
  productId?: string;
  imageUrl?: string;
  isRead: boolean;
}

export interface ChatRoom {
  id: string;
  farmerId: string;
  customerId: string;
  farmerName: string;
  customerName: string;
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}