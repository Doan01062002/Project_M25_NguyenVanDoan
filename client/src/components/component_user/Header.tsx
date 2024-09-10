import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCourse } from "@/services/course.service";
import { useRouter } from "next/navigation";
import { LogoutOutlined } from "@ant-design/icons";

export default function Header() {
  const [account, setAccount] = useState(
    JSON.parse(localStorage.getItem("checkUser") || "null")
  );

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    const confirmLogout = confirm("Bạn có chắc chắn đăng xuất không?");
    if (confirmLogout) {
      localStorage.removeItem("checkUser");
      router.push("/loginPage");
      setAccount(null);
    }
  };

  const [search, setSearch] = useState<string>("");
  const handleSearchSubject = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(e.target.value);
    await dispatch(searchCourse(e.target.value));
  };

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-0 gap-3">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <a href="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7YjOcWqqSFwp2tsPsnvu4Hx4n5hdvanfzbg&s"
              alt="Logo"
              className="w-20 h-8 rounded-full hover:scale-105 transition-transform object-cover"
            />
          </a>
          <p className="text-xl font-semibold hover:text-gray-400 transition-colors">
            OnlineTest
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full max-w-lg hidden sm:block">
          <input
            type="search"
            className="w-full py-2 pl-4 pr-10 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tìm kiếm ở đây"
            value={search}
            onChange={handleSearchSubject}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900">
            <i className="fa-solid fa-search"></i>
          </button>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-4">
            <a href="/" className="hover:text-gray-400 transition-colors">
              Trang chủ
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Trang khóa học
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Liên hệ
            </a>
          </nav>
          <div id="loginOut" className="flex items-center gap-4">
            {account ? (
              <div className="flex items-center gap-4">
                <a href="/user/profile">
                  <img
                    src={account.image}
                    alt="Profile"
                    className="w-20 h-8 rounded-full hover:scale-105 transition-transform object-cover"
                  />
                </a>
                <a href="/user/profile" className="hover:text-gray-400">
                  {account.name}
                </a>
                <button
                  onClick={handleLogOut}
                  className="hover:text-red-500 transition-colors text-xl"
                >
                  <LogoutOutlined />
                </button>
              </div>
            ) : (
              <a
                href="/loginPage"
                className="hover:text-gray-400 transition-colors"
              >
                Đăng nhập
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
