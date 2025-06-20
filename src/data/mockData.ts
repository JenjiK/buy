import { Product, User, PointsTransaction, PointsReward, PaymentMethod } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'มะเขือเทศสด',
    price: 45,
    unit: 'กิโลกรัม',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400',
    farmer: 'สวนป้าสมใจ',
    location: 'นครปฐม',
    category: 'ผัก',
    stock: 50,
    description: 'มะเขือเทศสดใหม่ ปลอดสารพิษ หวานฉ่ำ เก็บใหม่ทุกวัน',
    organic: true
  },
  {
    id: '2',
    name: 'ข้าวหอมมะลิ',
    price: 120,
    unit: 'กิโลกรัม',
    image: 'https://images.pexels.com/photos/33239/rice-grain-seed-food.jpg?auto=compress&cs=tinysrgb&w=400',
    farmer: 'ไร่ลุงสมชาย',
    location: 'สุรินทร์',
    category: 'ข้าว',
    stock: 100,
    description: 'ข้าวหอมมะลิแท้ 100% หุงแล้วหอม นุ่ม อร่อย',
    organic: false
  },
  {
    id: '3',
    name: 'กล้วยหอมทอง',
    price: 35,
    unit: 'หวี',
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
    farmer: 'สวนป้าแก้ว',
    location: 'ระยอง',
    category: 'ผลไม้',
    stock: 30,
    description: 'กล้วยหอมทองสุก หวานหอม เนื้อนุ่ม ขนาดใหญ่',
    organic: true
  },
  {
    id: '4',
    name: 'ผักบุ้งจีน',
    price: 25,
    unit: 'กิโลกรัม',
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=400',
    farmer: 'ฟาร์มลุงประสิทธิ์',
    location: 'สุพรรณบุรี',
    category: 'ผัก',
    stock: 25,
    description: 'ผักบุ้งจีนสด เก็บใหม่ทุกเช้า ใบเขียวสด กรอบ',
    organic: true
  },
  {
    id: '5',
    name: 'มะม่วงน้ำดอกไม้',
    price: 80,
    unit: 'กิโลกรัม',
    image: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=400',
    farmer: 'สวนป้าวิไล',
    location: 'ชัยนาท',
    category: 'ผลไม้',
    stock: 20,
    description: 'มะม่วงน้ำดอกไม้สุก หวานหอม เนื้อนุ่ม ไม่เป็นเส้น',
    organic: false
  },
  {
    id: '6',
    name: 'แตงกวาญี่ปุ่น',
    price: 40,
    unit: 'กิโลกรัม',
    image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=400',
    farmer: 'ฟาร์มป้าจันทร์',
    location: 'เชียงใหม่',
    category: 'ผัก',
    stock: 35,
    description: 'แตงกวาญี่ปุ่นสด กรอบ หวาน เก็บใหม่ทุกวัน',
    organic: true
  }
];

export const mockUser: User = {
  id: '1',
  name: 'คุณสมศรี ใจดี',
  email: 'somsri@email.com',
  points: 1250,
  totalSpent: 12500,
  memberSince: '2023-01-15'
};

export const mockPointsHistory: PointsTransaction[] = [
  {
    id: '1',
    type: 'earned',
    amount: 125,
    description: 'ซื้อสินค้า 1,250 บาท (ได้แต้ม 10%)',
    date: '2024-01-20',
    orderId: 'ORD001'
  },
  {
    id: '2',
    type: 'redeemed',
    amount: -100,
    description: 'ใช้แต้มแลกส่วนลด 100 บาท',
    date: '2024-01-18',
    orderId: 'ORD002'
  },
  {
    id: '3',
    type: 'earned',
    amount: 85,
    description: 'ซื้อสินค้า 850 บาท (ได้แต้ม 10%)',
    date: '2024-01-15',
    orderId: 'ORD003'
  },
  {
    id: '4',
    type: 'earned',
    amount: 200,
    description: 'โบนัสสมาชิกใหม่',
    date: '2023-01-15'
  }
];

export const pointsRewards: PointsReward[] = [
  {
    id: '1',
    title: 'ส่วนลด 50 บาท',
    description: 'แลกส่วนลด 50 บาท สำหรับการซื้อขั้นต่ำ 200 บาท',
    pointsRequired: 100,
    discountAmount: 50,
    type: 'fixed',
    icon: '🎫'
  },
  {
    id: '2',
    title: 'ส่วนลด 100 บาท',
    description: 'แลกส่วนลด 100 บาท สำหรับการซื้อขั้นต่ำ 400 บาท',
    pointsRequired: 200,
    discountAmount: 100,
    type: 'fixed',
    icon: '🎟️'
  },
  {
    id: '3',
    title: 'ส่วนลด 10%',
    description: 'แลกส่วนลด 10% สูงสุด 150 บาท สำหรับการซื้อขั้นต่ำ 500 บาท',
    pointsRequired: 300,
    discountAmount: 10,
    type: 'percentage',
    icon: '🏷️'
  },
  {
    id: '4',
    title: 'ส่วนลด 250 บาท',
    description: 'แลกส่วนลด 250 บาท สำหรับการซื้อขั้นต่ำ 1,000 บาท',
    pointsRequired: 500,
    discountAmount: 250,
    type: 'fixed',
    icon: '🎁'
  },
  {
    id: '5',
    title: 'ส่วนลด 15%',
    description: 'แลกส่วนลด 15% สูงสุด 300 บาท สำหรับการซื้อขั้นต่ำ 800 บาท',
    pointsRequired: 750,
    discountAmount: 15,
    type: 'percentage',
    icon: '💎'
  },
  {
    id: '6',
    title: 'ส่วนลด 500 บาท',
    description: 'แลกส่วนลด 500 บาท สำหรับการซื้อขั้นต่ำ 2,000 บาท',
    pointsRequired: 1000,
    discountAmount: 500,
    type: 'fixed',
    icon: '👑'
  }
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'cash',
    name: 'เก็บเงินปลายทาง',
    type: 'cash',
    icon: '💵'
  },
  {
    id: 'transfer',
    name: 'โอนเงินผ่านธนาคาร',
    type: 'transfer',
    icon: '🏦'
  },
  {
    id: 'qr',
    name: 'สแกน QR Code',
    type: 'qr',
    icon: '📱'
  }
];