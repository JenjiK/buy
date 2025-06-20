import React from 'react';
import { Plus, MapPin, Award, Leaf, MessageCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onChatWithFarmer: (farmerName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onChatWithFarmer 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-[#4CAF50]/30">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.organic && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <Leaf className="w-3 h-3" />
            <span>ออร์แกนิค</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
          คงเหลือ {product.stock} {product.unit}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#4CAF50] transition-colors">
            {product.name}
          </h3>
          <span className="bg-[#F5F5DC] text-[#4CAF50] px-2 py-1 rounded-lg text-xs font-semibold">
            {product.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Farmer & Location */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Award className="w-4 h-4" />
            <span>{product.farmer}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{product.location}</span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-[#4CAF50]">
            ฿{product.price}
            <span className="text-sm font-normal text-gray-500 ml-1">/{product.unit}</span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="bg-[#4CAF50] text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-all duration-200 flex items-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span className="font-semibold">เพิ่ม</span>
          </button>
        </div>

        {/* Chat with Farmer Button */}
        <button
          onClick={() => onChatWithFarmer(product.farmer)}
          className="w-full bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-xl hover:bg-blue-100 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold"
        >
          <MessageCircle className="w-4 h-4" />
          <span>แชทกับเกษตรกร</span>
        </button>
      </div>
    </div>
  );
};