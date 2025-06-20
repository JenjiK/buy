import { Product, User, PointsTransaction, PointsReward, PaymentMethod, Farmer, ChatMessage, ChatRoom } from '../types';

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

export const mockFarmers: Farmer[] = [
  {
    id: 'farmer1',
    name: 'สวนป้าสมใจ',
    location: 'นครปฐม',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4.8,
    totalProducts: 12,
    joinedDate: '2022-03-15',
    description: 'เกษตรกรรุ่นใหม่ที่ใส่ใจในการปลูกผักปลอดสารพิษ มีประสบการณ์ 15 ปี',
    isOnline: true
  },
  {
    id: 'farmer2',
    name: 'ไร่ลุงสมชาย',
    location: 'สุรินทร์',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4.9,
    totalProducts: 8,
    joinedDate: '2021-11-20',
    description: 'เกษตรกรผู้เชี่ยวชาญด้านข้าวหอมมะลิ ได้รับรางวัลข้าวดีเด่นระดับจังหวัด',
    isOnline: false,
    lastSeen: '2024-01-20T10:30:00Z'
  },
  {
    id: 'farmer3',
    name: 'สวนป้าแก้ว',
    location: 'ระยอง',
    avatar: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4.7,
    totalProducts: 15,
    joinedDate: '2022-07-10',
    description: 'สวนผลไม้ครอบครัว เน้นผลไม้หวานหอม คุณภาพดี ส่งตรงจากสวน',
    isOnline: true
  },
  {
    id: 'farmer4',
    name: 'ฟาร์มลุงประสิทธิ์',
    location: 'สุพรรณบุรี',
    avatar: 'https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4.6,
    totalProducts: 20,
    joinedDate: '2021-09-05',
    description: 'ฟาร์มผักไฮโดรโปนิกส์ สะอาด ปลอดภัย ได้มาตรฐาน GAP',
    isOnline: true
  },
  {
    id: 'farmer5',
    name: 'สวนป้าวิไล',
    location: 'ชัยนาท',
    avatar: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4.5,
    totalProducts: 10,
    joinedDate: '2022-01-25',
    description: 'สวนมะม่วงโบราณ รสชาติหวานหอม เก็บใหม่ทุกวัน',
    isOnline: false,
    lastSeen: '2024-01-19T15:45:00Z'
  },
  {
    id: 'farmer6',
    name: 'ฟาร์มป้าจันทร์',
    location: 'เชียงใหม่',
    avatar: 'https://images.pexels.com/photos/1181684/pexels-photo-1181684.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4.8,
    totalProducts: 18,
    joinedDate: '2021-12-12',
    description: 'ฟาร์มผักออร์แกนิกในเขตหนาว ผักสด หวาน กรอบ',
    isOnline: true
  }
];

export const mockChatRooms: ChatRoom[] = [
  {
    id: 'chat1',
    farmerId: 'farmer1',
    customerId: '1',
    farmerName: 'สวนป้าสมใจ',
    customerName: 'คุณสมศรี ใจดี',
    lastMessage: {
      id: 'msg1',
      senderId: 'farmer1',
      senderName: 'สวนป้าสมใจ',
      senderType: 'farmer',
      message: 'มะเขือเทศวันนี้สดมากค่ะ เก็บใหม่เมื่อเช้า',
      timestamp: '2024-01-21T14:30:00Z',
      type: 'text',
      isRead: false
    },
    unreadCount: 1,
    createdAt: '2024-01-21T10:00:00Z',
    updatedAt: '2024-01-21T14:30:00Z'
  },
  {
    id: 'chat2',
    farmerId: 'farmer3',
    customerId: '1',
    farmerName: 'สวนป้าแก้ว',
    customerName: 'คุณสมศรี ใจดี',
    lastMessage: {
      id: 'msg2',
      senderId: '1',
      senderName: 'คุณสมศรี ใจดี',
      senderType: 'customer',
      message: 'กล้วยหวีไหนหวานที่สุดคะ',
      timestamp: '2024-01-20T16:45:00Z',
      type: 'text',
      isRead: true
    },
    unreadCount: 0,
    createdAt: '2024-01-20T15:00:00Z',
    updatedAt: '2024-01-20T16:45:00Z'
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg1',
    senderId: '1',
    senderName: 'คุณสมศรี ใจดี',
    senderType: 'customer',
    message: 'สวัสดีค่ะ อยากสอบถามเรื่องมะเขือเทศค่ะ',
    timestamp: '2024-01-21T10:00:00Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg2',
    senderId: 'farmer1',
    senderName: 'สวนป้าสมใจ',
    senderType: 'farmer',
    message: 'สวัสดีค่ะ มีอะไรให้ช่วยไหมคะ',
    timestamp: '2024-01-21T10:05:00Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg3',
    senderId: '1',
    senderName: 'คุณสมศรี ใจดี',
    senderType: 'customer',
    message: 'มะเขือเทศของป้าหวานไหมคะ เก็บมาแล้วกี่วันแล้ว',
    timestamp: '2024-01-21T10:10:00Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg4',
    senderId: 'farmer1',
    senderName: 'สวนป้าสมใจ',
    senderType: 'farmer',
    message: 'หวานมากค่ะ เก็บเมื่อเช้านี้เอง สดใหม่มาก ป้าปลูกแบบออร์แกนิกไม่ใส่สารเคมี',
    timestamp: '2024-01-21T10:15:00Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg5',
    senderId: '1',
    senderName: 'คุณสมศรี ใจดี',
    senderType: 'customer',
    message: 'ดีเลยค่ะ ถ้าซื้อ 2 กิโลจะลดให้ไหมคะ',
    timestamp: '2024-01-21T10:20:00Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg6',
    senderId: 'farmer1',
    senderName: 'สวนป้าสมใจ',
    senderType: 'farmer',
    message: 'ได้ค่ะ ซื้อ 2 กิโลลด 5 บาทให้ เป็น 85 บาทค่ะ',
    timestamp: '2024-01-21T10:25:00Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg7',
    senderId: 'farmer1',
    senderName: 'สวนป้าสมใจ',
    senderType: 'farmer',
    message: 'มะเขือเทศวันนี้สดมากค่ะ เก็บใหม่เมื่อเช้า',
    timestamp: '2024-01-21T14:30:00Z',
    type: 'text',
    isRead: false
  }
];