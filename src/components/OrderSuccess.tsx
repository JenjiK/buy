import React from 'react';
import { CheckCircle, Star, Truck, X, User, Phone, CreditCard } from 'lucide-react';
import { CustomerInfo, PaymentMethod } from '../types';

interface OrderSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    orderId: string;
    total: number;
    pointsEarned: number;
    pointsUsed: number;
    customerInfo: CustomerInfo;
    paymentMethod: PaymentMethod;
  };
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({
  isOpen,
  onClose,
  orderDetails
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">สั่งซื้อสำเร็จ!</h2>
          <p className="text-gray-600 mb-6">ขอบคุณที่ใช้บริการ Farm2Hand</p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">หมายเลขคำสั่งซื้อ</span>
                <span className="font-semibold">#{orderDetails.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ยอดชำระ</span>
                <span className="font-semibold text-[#4CAF50]">฿{orderDetails.total.toLocaleString()}</span>
              </div>
              {orderDetails.pointsUsed > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">แต้มที่ใช้</span>
                  <span className="font-semibold text-red-500">-{orderDetails.pointsUsed} แต้ม</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>แต้มที่ได้รับ</span>
                </span>
                <span className="font-semibold text-yellow-600">+{orderDetails.pointsEarned} แต้ม</span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <div className="flex items-start space-x-2 mb-3">
              <User className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-left">
                <p className="font-semibold text-blue-800">ข้อมูลผู้สั่งซื้อ</p>
                <p className="text-sm text-blue-700">{orderDetails.customerInfo.name}</p>
                <p className="text-sm text-blue-700 flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>{orderDetails.customerInfo.phone}</span>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-left">
                <p className="font-semibold text-blue-800 mb-1">ที่อยู่จัดส่ง</p>
                <p className="text-sm text-blue-700">{orderDetails.customerInfo.address}</p>
                <p className="text-xs text-blue-600 mt-2">
                  สินค้าจะถูกจัดส่งภายใน 1-2 วันทำการ
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              <div className="text-left">
                <p className="font-semibold text-green-800">วิธีการชำระเงิน</p>
                <p className="text-sm text-green-700 flex items-center space-x-1">
                  <span>{orderDetails.paymentMethod.icon}</span>
                  <span>{orderDetails.paymentMethod.name}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-[#4CAF50] text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  );
};