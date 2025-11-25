import { Footer } from "@/components/footer/footer";
import { HeaderLayout } from "@/components/header/header";

export default function LandingPageLayout() {
  return (
    <>
      <HeaderLayout />
      <LandingPage />
      <Footer />
    </>
  );
}

export function LandingPage() {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                  Tạo sơ yếu lý lịch
                  <span className="px-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    chuyên nghiệp
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Nhanh chóng có được công việc mơ ước của bạn với những mẫu CV
                  độc đáo và ấn tượng
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md">
                  Tạo CV ngay
                </button>
                <div className="relative">
                  <button className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md">
                    <a href="/chat">Nâng cấp CV với AI</a>
                  </button>
                  <div className="absolute -top-2 -right-2 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full animate-pulse">
                    NEW
                  </div>
                </div>
              </div>

              {/* Stats */}
              {/* <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Người dùng</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Mẫu thiết kế</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Hài lòng</div>
                </div>
              </div> */}
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-300 rounded-full filter blur-3xl opacity-20 animate-pulse delay-75"></div>
              <div className="relative bg-white p-6 rounded-2xl shadow-2xl transform hover:rotate-0 rotate-2 transition-all duration-300">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl w-full h-[400px] flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-6xl">📄</div>
                    <p className="text-gray-500 font-medium">CV Mẫu</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full shadow-xl transform hover:rotate-0 rotate-12 transition-all cursor-pointer">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Vì sao bạn lại chọn sản phẩm của chúng tôi?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Tạo ra những bản sơ yếu lý lịch với những mẫu sáng tạo, giúp hồ
                sơ bạn trở nên nổi bật hơn
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group h-[200px] bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-200">
                {/* <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">🎨</span>
                                </div> */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Thiết kế độc đáo
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Nhiều mẫu tùy chỉnh, phù hợp với cá tính và nghành nghề của
                  bạn
                </p>
              </div>

              <div className="group h-[200px] bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-200">
                {/* <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">⚡</span>
                                </div> */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Tạo mẫu nhanh chóng
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Tạo sơ yếu lý lịch chuyên nghiệp trong vài phút với giao diện
                  trực quan
                </p>
              </div>

              <div className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-green-200">
                {/* <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">✅</span>
                                </div> */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Thân thiện với ATS
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Tương thích với hệ thống ATS để vượt qua vòng sàng lọc tự động
                </p>
              </div>

              <div className="group bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-orange-200">
                {/* <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">📱</span>
                                </div> */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Hỗ trợ đa nền tảng
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Tải xuống định dạng PDF, PNG hoặc chia sẻ trực tiếp lên mạng
                  xã hội
                </p>
              </div>

              <div className="group bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-pink-200">
                {/* <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">🤖</span>
                                </div> */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Hỗ trợ bởi AI
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  AI gợi ý phong cách, màu sắc và bố cục hoàn hảo dựa trên nghề
                  nghiệp
                </p>
              </div>

              <div className="group h-[200px] bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-200">
                {/* <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">🔒</span>
                                </div> */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Bảo mật cao
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Dữ liệu của bạn được mã hóa và bảo mật tuyệt đối theo tiêu
                  chuẩn quốc tế
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
