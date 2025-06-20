import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Phone, Video, MoreVertical, Star, MapPin, Clock, Circle } from 'lucide-react';
import { Farmer, ChatMessage, User } from '../types';
import { mockChatMessages } from '../data/mockData';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmer: Farmer;
  user: User;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  farmer,
  user
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: `msg${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      senderType: 'customer',
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text',
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate farmer typing and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const farmerResponse: ChatMessage = {
        id: `msg${Date.now() + 1}`,
        senderId: farmer.id,
        senderName: farmer.name,
        senderType: 'farmer',
        message: 'ขอบคุณที่สนใจสินค้าของเราค่ะ จะตอบกลับให้เร็วที่สุดนะคะ',
        timestamp: new Date().toISOString(),
        type: 'text',
        isRead: false
      };
      setMessages(prev => [...prev, farmerResponse]);
    }, 2000);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatLastSeen = (lastSeen: string) => {
    const now = new Date();
    const lastSeenDate = new Date(lastSeen);
    const diffInMinutes = Math.floor((now.getTime() - lastSeenDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} นาทีที่แล้ว`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} ชั่วโมงที่แล้ว`;
    } else {
      return lastSeenDate.toLocaleDateString('th-TH');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl h-[600px] shadow-2xl flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="bg-[#4CAF50] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={farmer.avatar}
                alt={farmer.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                farmer.isOnline ? 'bg-green-400' : 'bg-gray-400'
              }`} />
            </div>
            <div>
              <h3 className="font-bold text-lg">{farmer.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-white/90">
                <MapPin className="w-3 h-3" />
                <span>{farmer.location}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Circle className={`w-2 h-2 ${farmer.isOnline ? 'fill-green-400 text-green-400' : 'fill-gray-400 text-gray-400'}`} />
                  <span>
                    {farmer.isOnline ? 'ออนไลน์' : `ออฟไลน์ ${farmer.lastSeen ? formatLastSeen(farmer.lastSeen) : ''}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Farmer Info Bar */}
        <div className="bg-green-50 border-b border-green-100 p-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-semibold">{farmer.rating}</span>
              </div>
              <div className="text-gray-600">
                สินค้า {farmer.totalProducts} รายการ
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>สมาชิกตั้งแต่ {new Date(farmer.joinedDate).toLocaleDateString('th-TH')}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-2">{farmer.description}</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderType === 'customer' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.senderType === 'customer'
                  ? 'bg-[#4CAF50] text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}>
                <p className="text-sm">{message.message}</p>
                <p className={`text-xs mt-1 ${
                  message.senderType === 'customer' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
              placeholder="พิมพ์ข้อความ..."
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-[#4CAF50] text-white p-2 rounded-full hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};