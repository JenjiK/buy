import React from 'react';
import { Leaf, Apple, Wheat, Carrot } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'ทั้งหมด', icon: Leaf },
  { id: 'ผัก', name: 'ผัก', icon: Carrot },
  { id: 'ผลไม้', name: 'ผลไม้', icon: Apple },
  { id: 'ข้าว', name: 'ข้าว', icon: Wheat },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">หมวดหมู่สินค้า</h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                isSelected
                  ? 'bg-[#4CAF50] text-white shadow-lg transform scale-105'
                  : 'bg-[#F5F5DC] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white hover:shadow-md hover:scale-105'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};