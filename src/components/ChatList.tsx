import React from 'react';
import { X, MessageCircle, Clock, Circle } from 'lucide-react';
import { ChatRoom, Farmer } from '../types';
import { mockChatRooms, mockFarmers } from '../data/mockData';

interface ChatListProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChat: (farmer: Farmer) => void;
}

export const ChatList: React.FC<ChatListProps> = ({
  isOpen,
  onClose,
  onSelectChat
}) => {
  const formatTime = (timestamp: string) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - messageTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} นาทีที่แล้ว`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} ชั่วโมงที่แล้ว`;
    } else {
      return messageTime.toLocaleDateString('th-TH');
    }
  };

  const handleChatSelect = (chatRoom: ChatRoom) => {
    const farmer = mockFarmers.find(f => f.id === chatRoom.farmerId);
    if (farmer) {
      onSelectChat(farmer);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#4CAF50] text-white p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <MessageCircle className="w-6 h-6" />
            <span>แชทกับเกษตรกร</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat List */}
        <div className="divide-y divide-gray-200">
          {mockChatRooms.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <MessageCircle className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg">ยังไม่มีการสนทนา</p>
              <p className="text-sm">เริ่มแชทกับเกษตรกรจากหน้าสินค้า</p>
            </div>
          ) : (
            mockChatRooms.map((chatRoom) => {
              const farmer = mockFarmers.find(f => f.id === chatRoom.farmerId);
              if (!farmer) return null;

              return (
                <div
                  key={chatRoom.id}
                  onClick={() => handleChatSelect(chatRoom)}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <img
                        src={farmer.avatar}
                        alt={farmer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        farmer.isOnline ? 'bg-green-400' : 'bg-gray-400'
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {farmer.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {chatRoom.unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                              {chatRoom.unreadCount}
                            </span>
                          )}
                          <span className="text-xs text-gray-500 flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(chatRoom.updatedAt)}</span>
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 truncate mb-1">
                        {chatRoom.lastMessage?.message || 'ยังไม่มีข้อความ'}
                      </p>
                      
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Circle className={`w-2 h-2 ${farmer.isOnline ? 'fill-green-400 text-green-400' : 'fill-gray-400 text-gray-400'}`} />
                        <span>{farmer.isOnline ? 'ออนไลน์' : 'ออฟไลน์'}</span>
                        <span>•</span>
                        <span>{farmer.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              ต้องการสอบถามเกี่ยวกับสินค้า?
            </p>
            <p className="text-xs text-gray-500">
              คลิกที่ปุ่ม "แชทกับเกษตรกร" ในหน้าสินค้า
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};