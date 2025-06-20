import React from 'react';
import { X, Star, TrendingUp, Gift, Calendar, ShoppingBag, Award } from 'lucide-react';
import { User, PointsTransaction } from '../types';
import { pointsRewards } from '../data/mockData';

interface PointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  pointsHistory: PointsTransaction[];
}

export const PointsModal: React.FC<PointsModalProps> = ({
  isOpen,
  onClose,
  user,
  pointsHistory
}) => {
  if (!isOpen) return null;

  const totalEarned = pointsHistory
    .filter(t => t.type === 'earned')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRedeemed = pointsHistory
    .filter(t => t.type === 'redeemed')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const availableRewards = pointsRewards.filter(reward => user.points >= reward.pointsRequired);
  const upcomingRewards = pointsRewards.filter(reward => user.points < reward.pointsRequired);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Star className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">แต้มสะสม</h2>
                <p className="opacity-90">รายละเอียดแต้มและสิทธิพิเศษ</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Points Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">แต้มปัจจุบัน</p>
                  <p className="text-2xl font-bold text-yellow-600">{user.points.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">แต้มที่ได้รับ</p>
                  <p className="text-2xl font-bold text-green-600">{totalEarned.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">แต้มที่ใช้</p>
                  <p className="text-2xl font-bold text-blue-600">{totalRedeemed.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Available Rewards */}
          {availableRewards.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5 text-green-500" />
                <span>สิทธิพิเศษที่ใช้ได้</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{reward.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-green-800">{reward.title}</h4>
                        <p className="text-sm text-green-700 mb-2">{reward.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                            ใช้ {reward.pointsRequired.toLocaleString()} แต้ม
                          </span>
                          <span className="text-xs text-green-600 font-semibold">✓ ใช้ได้</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Rewards */}
          {upcomingRewards.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Gift className="w-5 h-5 text-orange-500" />
                <span>สิทธิพิเศษที่จะได้รับ</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingRewards.slice(0, 4).map((reward) => {
                  const pointsNeeded = reward.pointsRequired - user.points;
                  return (
                    <div
                      key={reward.id}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4 opacity-75"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl grayscale">{reward.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-700">{reward.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                              ใช้ {reward.pointsRequired.toLocaleString()} แต้ม
                            </span>
                            <span className="text-xs text-orange-600 font-semibold">
                              อีก {pointsNeeded.toLocaleString()} แต้ม
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Member Info */}
          <div className="bg-[#F5F5DC] rounded-xl p-4 mb-6 border border-[#4CAF50]/20">
            <h3 className="font-bold text-[#4CAF50] mb-2">ข้อมูลสมาชิก</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">ชื่อสมาชิก</p>
                <p className="font-semibold">{user.name}</p>
              </div>
              <div>
                <p className="text-gray-600">สมาชิกตั้งแต่</p>
                <p className="font-semibold">{new Date(user.memberSince).toLocaleDateString('th-TH')}</p>
              </div>
              <div>
                <p className="text-gray-600">ยอดซื้อสะสม</p>
                <p className="font-semibold">฿{user.totalSpent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">อัตราแต้ม</p>
                <p className="font-semibold text-[#4CAF50]">10% ของยอดซื้อ</p>
              </div>
            </div>
          </div>

          {/* Points History */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>ประวัติการใช้แต้ม</span>
            </h3>
            <div className="space-y-3">
              {pointsHistory.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'earned' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'earned' ? (
                          <TrendingUp className="w-5 h-5" />
                        ) : (
                          <Gift className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{transaction.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{new Date(transaction.date).toLocaleDateString('th-TH')}</span>
                          {transaction.orderId && (
                            <span className="flex items-center space-x-1">
                              <ShoppingBag className="w-3 h-3" />
                              <span>#{transaction.orderId}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`text-right ${
                      transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <p className="text-lg font-bold">
                        {transaction.type === 'earned' ? '+' : ''}{transaction.amount.toLocaleString()} แต้ม
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Points Usage Info */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2">วิธีการใช้แต้ม</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 1 แต้ม = 1 บาท สามารถใช้แทนเงินสดได้</li>
              <li>• ได้รับแต้ม 10% จากทุกการซื้อ</li>
              <li>• แต้มไม่มีวันหมดอายุ</li>
              <li>• สามารถใช้แต้มได้สูงสุดไม่เกินยอดสั่งซื้อ</li>
              <li>• สะสมแต้มเพื่อแลกสิทธิพิเศษต่างๆ</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};