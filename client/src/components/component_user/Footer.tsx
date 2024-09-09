export default function Footer() {
  return (
    <>
      {/* footer start */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0">
          <div className="lg:w-1/2 space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/009/182/690/original/thi-letter-logo-design-with-polygon-shape-thi-polygon-and-cube-shape-logo-design-thi-hexagon-logo-template-white-and-black-colors-thi-monogram-business-and-real-estate-logo-vector.jpg"
                alt="Logo"
                className="w-24 h-24 rounded-full"
              />
              <h1 className="text-2xl font-semibold">
                OnlineTest - Luyện thi miễn phí
              </h1>
            </div>
            <p className="text-gray-400">
              OnlineTest là một hệ thống thi trắc nghiệm trực tuyến linh hoạt và
              tiện ích. Người dùng có thể tạo và tham gia các bài kiểm tra. Hệ
              thống cung cấp các loại câu hỏi đa dạng và tính năng tùy chỉnh,
              cùng với công cụ quản lý.
            </p>
            <div className="flex space-x-4 text-2xl">
              <i className="fa-brands fa-facebook hover:text-blue-500"></i>
              <i className="fa-brands fa-twitter hover:text-blue-400"></i>
              <i className="fa-brands fa-github hover:text-gray-600"></i>
              <i className="fa-brands fa-instagram hover:text-pink-500"></i>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Về OnlineTest</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <i className="fa-solid fa-building"></i> Group 3
                </li>
                <li>
                  <i className="fa-solid fa-users"></i> Tuyển dụng
                </li>
                <li>
                  <i className="fa-solid fa-shop"></i> Group 3 Mall
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Hỗ trợ</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <i className="fa-solid fa-circle-info"></i> Điều khoản
                </li>
                <li>
                  <i className="fa-solid fa-shield-halved"></i> Bảo mật
                </li>
                <li>
                  <i className="fa-solid fa-truck-fast"></i> Dịch vụ
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Thông tin khác</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <i className="fa-solid fa-blog"></i> Group 3 blog
                </li>
                <li>
                  <i className="fa-solid fa-circle-question"></i> Thông tin đề
                  thi
                </li>
                <li>
                  <i className="fa-solid fa-handshake"></i> Cam kết
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center text-sm text-gray-400">
          <div>
            <span>&copy; 2024 OnlineTest. Creat with </span>
            <i className="fa-solid fa-heart text-red-600"></i>
            <span> by Group 3</span>
          </div>
          <div>
            <span>Trao tri thức - Nhận niềm tin!</span>
          </div>
        </div>
      </footer>
      {/* footer end */}
    </>
  );
}
