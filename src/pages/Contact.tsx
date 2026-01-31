import { Mail, Phone, MapPin, Send, MessageSquare, User } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-20 px-4 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hãy để chúng tôi giúp bạn biến ý tưởng thành hiện thực với công nghệ AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Thông Tin Liên Hệ
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi
                qua bất kỳ kênh nào dưới đây hoặc điền form bên cạnh.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                  <p className="text-slate-600">contact@aicoresolution.vn</p>
                  <p className="text-slate-600">sales@aicoresolution.vn</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Điện Thoại</h3>
                  <p className="text-slate-600">+84 123 456 789</p>
                  <p className="text-slate-600">+84 987 654 321</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Địa Chỉ</h3>
                  <p className="text-slate-600">Đà Nẵng, Việt Nam</p>
                  <p className="text-slate-600">Làm việc từ xa toàn quốc</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-3">Giờ Làm Việc</h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>Thứ 2 - Thứ 6:</span>
                  <span className="font-semibold">8:00 - 18:00</span>
                </p>
                <p className="flex justify-between">
                  <span>Thứ 7:</span>
                  <span className="font-semibold">8:00 - 12:00</span>
                </p>
                <p className="flex justify-between">
                  <span>Chủ Nhật:</span>
                  <span className="font-semibold">Nghỉ</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Gửi Tin Nhắn
            </h2>

            <form className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <User className="w-4 h-4" />
                  Họ và Tên
                </label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Phone className="w-4 h-4" />
                  Số Điện Thoại
                </label>
                <input
                  type="tel"
                  placeholder="+84 123 456 789"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Nội Dung
                </label>
                <textarea
                  rows={5}
                  placeholder="Mô tả dự án hoặc câu hỏi của bạn..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Gửi Tin Nhắn</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
