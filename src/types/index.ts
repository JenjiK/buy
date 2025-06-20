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