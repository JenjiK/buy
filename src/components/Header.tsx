import React from 'react';
import { ShoppingCart, User, Star, MessageCircle } from 'lucide-react';
import { CartItem, User as UserType } from '../types';

interface HeaderProps {
  cartItems: CartItem[];
  user: UserType;
  onCartClick: () => void;
  onPointsClick: () => void;
  onChatClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  cartItems, 
  user, 
  onCartClick, 
  onPointsClick,
  onChatClick 
}) => {
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-[#4CAF50] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img
              src="/ChatGPT_Image_17_.._2568_10_27_08 copy.png"
              alt="Farm2Hand Logo"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">Farm2Hand</h1>
              <p className="text-sm text-white/90">ตรงจากไร่สู่มือคุณ</p>
            </div>
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center space-x-4">
            {/* Points Display */}
            <button
              onClick={onPointsClick}
              className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Star className="w-5 h-5" />
              <span className="font-semibold">{user.points.toLocaleString()} แต้ม</span>
            </button>

            {/* Chat */}
            <button
              onClick={onChatClick}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">แชท</span>
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">ตะกร้า</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-2 text-white">
              <User className="w-5 h-5" />
              <span className="font-medium">{user.name}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};