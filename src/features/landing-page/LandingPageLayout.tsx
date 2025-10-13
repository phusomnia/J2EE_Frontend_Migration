export default function LandingPageLayout() {
    return (
        <>
            <LandingPage />
        </>
    );
}

export function LandingPage() {
    return (
        <>
            <div className="h-screen w-screen bg-gray-100">
                <div className="grid grid-cols-2 mx-auto p-4">
                    <div className="relative">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Tạo sơ yếu lý lịch
                        </h1>
                        <p className="text-lg text-gray-600">
                            Nhanh chóng có được công việc mơ ước của bạn
                        </p>
                        <div className="flex gap-8">
                            <div className="">
                                <button className="p-4 rounded-lg bg-orange-500 hover:bg-amber-50 hover:scale-105 transition-transform duration-300">
                                    Tạo CV
                                </button>
                            </div>
                            <div className="space-y-2">
                                <div className="">
                                    <button className="p-4 rounded-lg bg-blue-500 hover:bg-amber-50 hover:scale-105 transition-transform duration-300">
                                        Nâng cấp cv
                                    </button>
                                </div>
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-sm text-center">
                                    hỗ trợ bởi AI
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-200 rounded-full filter blur-3xl opacity-30"></div>
                        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-300 rounded-full filter blur-3xl opacity-20"></div>
                        <div className="relative bg-white p-4 rounded-xl shadow-xl transform rotate-2 hover:rotate-0 transition-all">
                            <img
                                src=""
                                alt="style resume example"
                                className="rounded-lg w-full object-cover h-[400px]"
                            />
                            <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-full shadow-lg transform rotate-12 hover:rotate-0 transition-all"></div>
                        </div>
                    </div>
                </div>

                {/* Features section */}
                <div className="mx-auto p-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Vì sao bạn lại chọn sản phẩm của chúng tôi?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Tạo ra những bản sơ yếu lý lịch với những mẫu sáng
                            tạo, giúp hồ sơ bạn trở nên nổi bật hơn
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mx-auto">
                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
                            <h3 className="text-xl font-bold mb-2">
                                Thiết kế độc đáo
                            </h3>
                            <p className="text-gray-600">
                                Nhiều mẫu tùy chỉnh, phù hợp với cá tính và
                                nghành nghề của bạn
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
                            <h3 className="text-xl font-bold mb-2">
                                Tạo mẫu nhanh chóng
                            </h3>
                            <p className="text-gray-600">
                                Tạo sơ yếu lý lịch chuyên nghiệp trong vài phút
                                với giao diện trực quan và dễ sử dụng của chúng
                                tôi
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
                            <h3 className="text-xl font-bold mb-2">
                                Thân thiện với ATS
                            </h3>
                            <p className="text-gray-600">
                                Tương thích với hệ thống ATS để vượt qua vòng
                                sàng lọc tự động
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
                            <h3 className="text-xl font-bold mb-2">
                                Thân thiện với ATS
                            </h3>
                            <p className="text-gray-600">
                                Tương thích với hệ thống ATS để vượt qua vòng
                                sàng lọc tự động
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
                            <h3 className="text-xl font-bold mb-2">
                                Hỗ trợ đa nền tảng
                            </h3>
                            <p className="text-gray-600">
                                Tải xuống sơ yếu lý lịch của bạn ở định dạng
                                PDF, PNG hoặc chia sẻ trực tiếp lên mạng xã hội
                                hoặc các nền tảng việc làm của bạn
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
                            <h3 className="text-xl font-bold mb-2">
                                Hỗ trợ bởi AI
                            </h3>
                            <p className="text-gray-600">
                                AI của chúng tôi gợi ý phong cách, màu sắc và bố
                                cục hoàn hảo dựa trên nghề nghiệp và sở thích
                                của bạn
                            </p>
                        </div>
                    </div>
                </div>

                {/* Template showcase */}
                {/* <div className="">

            </div> */}

                <section className="py-16 md:py-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl opacity-30"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-700 rounded-full filter blur-3xl opacity-20"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl mx-auto text-center text-white">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                                Chuẩn bị tạo mẫu cho sơ yếu lý lịch chưa?
                            </h2>
                            <p className="text-xl mb-8 text-primary-100 text-black">
                                Hãy gia nhập cùng với 10.000 ứng viên đã tìm
                                được công việc mơ ước nhờ các mẫu sơ yếu lý lịch
                                độc đáo của chúng tôi
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-8 py-4 rounded-lg font-medium text-black hover:bg-primary-50 transform hover:-translate-y-1 transition-all shadow-lg ">
                                    Bắt đầu xây dựng ngay thôi nào
                                </button>
                                <button className="px-8 py-4 border text-black rounded-lg font-medium hover:bg-primary-700 transform hover:-translate-y-1 transition-all">
                                    Khám phá các mẫu thiết kế cao cấp
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                {/* <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        <div>
                        <h3 className="text-white text-lg font-bold mb-4">Web tạo CV</h3>
                        <p className="mb-4">Create standout resumes with anime-inspired designs that showcase your personality and professional skills.</p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <i className="fa-brands fa-twitter text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <i className="fa-brands fa-instagram text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <i className="fa-brands fa-linkedin text-xl"></i>
                            </a>
                        </div>
                        </div>
                        
                        <div>
                        <h4 className="text-white text-md font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="">Templates</a></li>
                            <li><a href="#" className="">Pricing</a></li>
                            <li><a href="#" className="">Resources</a></li>
                            <li><a href="#" className="">FAQ</a></li>
                        </ul>
                        </div>
                        
                        <div>
                        <h4 className="text-white text-md font-bold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="">Terms of Service</a></li>
                            <li><a href="#" className="">Privacy Policy</a></li>
                            <li><a href="#" className="">Cookie Policy</a></li>
                            <li><a href="#" className="">GDPR Compliance</a></li>
                        </ul>
                        </div>
                        
                        <div>
                        <h4 className="text-white text-md font-bold mb-4">Newsletter</h4>
                        <p className="mb-4">Subscribe to get the latest updates and offers.</p>
                        <div className="flex">
                            <input 
                            type="email" 
                            placeholder="Your email" 
                            className="px-4 py-2 bg-gray-800 text-white rounded-l-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                            <button className="px-4 py-2 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition-colors">
                            <span className="material-symbols-outlined">send</span>
                            </button>
                        </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 pt-8">
                        <p className="text-center text-sm">© 2023 AI Builder Resume. All rights reserved.</p>
                    </div>
                </div>
            </footer> */}
            </div>
        </>
    );
}
