import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { PointsModal } from './components/PointsModal';
import { CategoryFilter } from './components/CategoryFilter';
import { OrderSuccess } from './components/OrderSuccess';
import { ChatList } from './components/ChatList';
import { ChatModal } from './components/ChatModal';
import { mockProducts, mockUser, mockPointsHistory, mockFarmers } from './data/mockData';
import { CartItem, Product, User, PointsTransaction, CustomerInfo, PaymentMethod, Farmer } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [isChatListOpen, setIsChatListOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [user, setUser] = useState<User>(mockUser);
  const [pointsHistory, setPointsHistory] = useState<PointsTransaction[]>(mockPointsHistory);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

  const filteredProducts = selectedCategory === 'all' 
    ? mockProducts 
    : mockProducts.filter(product => product.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCheckout = (pointsUsed: number, customerInfo: CustomerInfo, paymentMethod: PaymentMethod) => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const total = subtotal - pointsUsed;
    const pointsEarned = Math.floor(total * 0.1);
    const orderId = `ORD${Date.now()}`;

    // Update user points
    setUser(prev => ({
      ...prev,
      points: prev.points - pointsUsed + pointsEarned,
      totalSpent: prev.totalSpent + total
    }));

    // Add to points history
    const newTransactions: PointsTransaction[] = [];
    
    if (pointsUsed > 0) {
      newTransactions.push({
        id: `${Date.now()}-used`,
        type: 'redeemed',
        amount: -pointsUsed,
        description: `ใช้แต้มแลกส่วนลด ${pointsUsed} บาท`,
        date: new Date().toISOString().split('T')[0],
        orderId
      });
    }

    newTransactions.push({
      id: `${Date.now()}-earned`,
      type: 'earned',
      amount: pointsEarned,
      description: `ซื้อสินค้า ${total.toLocaleString()} บาท (ได้แต้ม 10%)`,
      date: new Date().toISOString().split('T')[0],
      orderId
    });

    setPointsHistory(prev => [...newTransactions, ...prev]);

    // Set order details for success modal
    setOrderDetails({
      orderId,
      total,
      pointsEarned,
      pointsUsed,
      customerInfo,
      paymentMethod
    });

    // Clear cart and show success
    setCartItems([]);
    setIsCartOpen(false);
    setIsOrderSuccessOpen(true);
  };

  const handleChatWithFarmer = (farmerName: string) => {
    const farmer = mockFarmers.find(f => f.name === farmerName);
    if (farmer) {
      setSelectedFarmer(farmer);
      setIsChatModalOpen(true);
    }
  };

  const handleSelectChat = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setIsChatListOpen(false);
    setIsChatModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] to-white">
      <Header
        cartItems={cartItems}
        user={user}
        onCartClick={() => setIsCartOpen(true)}
        onPointsClick={() => setIsPointsModalOpen(true)}
        onChatClick={() => setIsChatListOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#4CAF50] mb-2">
            ยินดีต้อนรับสู่ Farm2Hand
          </h1>
          <p className="text-xl text-gray-600">
            สินค้าเกษตรสดใหม่ ตรงจากไร่สู่มือคุณ
          </p>
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onChatWithFarmer={handleChatWithFarmer}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">ไม่พบสินค้าในหมวดหมู่นี้</p>
          </div>
        )}
      </main>

      {/* Modals */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        user={user}
        onCheckout={handleCheckout}
      />

      <PointsModal
        isOpen={isPointsModalOpen}
        onClose={() => setIsPointsModalOpen(false)}
        user={user}
        pointsHistory={pointsHistory}
      />

      <OrderSuccess
        isOpen={isOrderSuccessOpen}
        onClose={() => setIsOrderSuccessOpen(false)}
        orderDetails={orderDetails}
      />

      <ChatList
        isOpen={isChatListOpen}
        onClose={() => setIsChatListOpen(false)}
        onSelectChat={handleSelectChat}
      />

      {selectedFarmer && (
        <ChatModal
          isOpen={isChatModalOpen}
          onClose={() => setIsChatModalOpen(false)}
          farmer={selectedFarmer}
          user={user}
        />
      )}
    </div>
  );
}

export default App;