import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Star, MapPin, Truck, User, Phone, CreditCard, QrCode } from 'lucide-react';
import { CartItem, User as UserType, CustomerInfo, PaymentMethod } from '../types';
import { paymentMethods } from '../data/mockData';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  user: UserType;
  onCheckout: (pointsUsed: number, customerInfo: CustomerInfo, paymentMethod: PaymentMethod) => void;
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  user,
  onCheckout
}) => {
  const [pointsToUse, setPointsToUse] = useState(0);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: user.name,
    phone: '',
    address: ''
  });
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(paymentMethods[0]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discount = Math.min(pointsToUse, subtotal);
  const total = subtotal - discount;
  const pointsToEarn = Math.floor(total * 0.1); // 10% points back

  const handleCheckout = () => {
    if (!customerInfo.name.trim() || !customerInfo.phone.trim() || !customerInfo.address.trim()) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (selectedPayment.type === 'qr') {
      setShowQRCode(true);
      return;
    }

    onCheckout(pointsToUse, customerInfo, selectedPayment);
    resetForm();
  };

  const handleQRPayment = () => {
    onCheckout(pointsToUse, customerInfo, selectedPayment);
    setShowQRCode(false);
    resetForm();
  };

  const resetForm = () => {
    setShowCheckout(false);
    setPointsToUse(0);
    setCustomerInfo({ name: user.name, phone: '', address: '' });
    setSelectedPayment(paymentMethods[0]);
  };

  if (!isOpen) return null;

  // QR Code Modal
  if (showQRCode) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">สแกน QR Code เพื่อชำระเงิน</h3>
            <p className="text-gray-600 mb-6">ยอดชำระ: ฿{total.toLocaleString()}</p>
            
            {/* Mock QR Code */}
            <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center mx-auto mb-6">
              <div className="text-center">
                <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">QR Code สำหรับชำระเงิน</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleQRPayment}
                className="w-full bg-[#4CAF50] text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
              >
                ยืนยันการชำระเงิน
              </button>
              <button
                onClick={() => setShowQRCode(false)}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
            <ShoppingBag className="w-6 h-6 text-[#4CAF50]" />
            <span>ตะกร้าสินค้า</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg">ตะกร้าว่างเปล่า</p>
            <p className="text-sm">เพิ่มสินค้าเพื่อเริ่มช้อปปิ้ง</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="p-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{item.product.farmer}</span>
                      </p>
                      <p className="text-[#4CAF50] font-bold">
                        ฿{item.product.price}/{item.product.unit}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-[#4CAF50] hover:bg-green-600 text-white flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">฿{(item.product.price * item.quantity).toLocaleString()}</p>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-red-500 hover:text-red-700 text-sm transition-colors"
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              {!showCheckout ? (
                <>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-600">
                      <span>ยอดรวม</span>
                      <span>฿{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#4CAF50] font-semibold">
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>จะได้รับแต้ม</span>
                      </span>
                      <span>+{pointsToEarn} แต้ม</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-[#4CAF50] text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    ดำเนินการสั่งซื้อ
                  </button>
                </>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {/* Customer Information */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>ข้อมูลผู้สั่งซื้อ</span>
                    </h3>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                      placeholder="ชื่อ-นามสกุล"
                      required
                    />
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                      placeholder="เบอร์โทรศัพท์"
                      required
                    />
                    <textarea
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent resize-none"
                      rows={3}
                      placeholder="ที่อยู่จัดส่งที่ชัดเจน..."
                      required
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                      <CreditCard className="w-4 h-4" />
                      <span>วิธีการชำระเงิน</span>
                    </h3>
                    <div className="space-y-2">
                      {paymentMethods.map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedPayment.id === method.id
                              ? 'border-[#4CAF50] bg-green-50'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedPayment.id === method.id}
                            onChange={() => setSelectedPayment(method)}
                            className="text-[#4CAF50] focus:ring-[#4CAF50]"
                          />
                          <span className="text-xl">{method.icon}</span>
                          <span className="font-medium">{method.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Points Usage */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800 flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>ใช้แต้มสะสม</span>
                      </span>
                      <span className="text-sm text-gray-600">มี {user.points.toLocaleString()} แต้ม</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max={Math.min(user.points, subtotal)}
                      value={pointsToUse}
                      onChange={(e) => setPointsToUse(Math.min(parseInt(e.target.value) || 0, Math.min(user.points, subtotal)))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                      placeholder="จำนวนแต้มที่ต้องการใช้"
                    />
                    <p className="text-xs text-gray-500 mt-1">1 แต้ม = 1 บาท (สูงสุด {Math.min(user.points, subtotal).toLocaleString()} แต้ม)</p>
                  </div>

                  {/* Final Summary */}
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between">
                      <span>ยอดรวม</span>
                      <span>฿{subtotal.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-yellow-600">
                        <span>ส่วนลดจากแต้ม</span>
                        <span>-฿{discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>ยอดชำระ</span>
                      <span className="text-[#4CAF50]">฿{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#4CAF50]">
                      <span>จะได้รับแต้ม</span>
                      <span>+{pointsToEarn} แต้ม</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      ย้อนกลับ
                    </button>
                    <button
                      onClick={handleCheckout}
                      className="flex-1 bg-[#4CAF50] text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      ยืนยันสั่งซื้อ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};