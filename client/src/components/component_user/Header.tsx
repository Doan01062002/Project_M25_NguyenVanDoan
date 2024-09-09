import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCourse } from "@/services/course.service";
import { useRouter } from "next/navigation";

export default function Header() {
  const [account, setAccount] = useState(
    JSON.parse(localStorage.getItem("account") || "null")
  );

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    const confirmLogout = confirm("Bạn có chắc chắn đăng xuất không?");
    if (confirmLogout) {
      localStorage.removeItem("account");
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
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <a href="/">
            <img
              src="https://static.vecteezy.com/system/resources/previews/009/182/690/original/thi-letter-logo-design-with-polygon-shape-thi-polygon-and-cube-shape-logo-design-thi-hexagon-logo-template-white-and-black-colors-thi-monogram-business-and-real-estate-logo-vector.jpg"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
          </a>
          <p className="text-xl font-semibold">OnlineTest</p>
        </div>

        {/* Search bar */}
        <div className="relative w-full max-w-lg">
          <input
            type="search"
            className="w-full py-2 pl-4 pr-10 rounded-md text-black"
            placeholder="Tìm kiếm ở đây"
            value={search}
            onChange={handleSearchSubject}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
            <i className="fa-solid fa-search"></i>
          </button>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-6">
          <nav className="space-x-4">
            <a href="/" className="hover:text-gray-400">
              Trang chủ
            </a>
            <a href="#" className="hover:text-gray-400">
              Trang khóa học
            </a>
            <a href="#" className="hover:text-gray-400">
              Liên hệ
            </a>
          </nav>
          <div id="loginOut" className="flex items-center gap-4">
            {account ? (
              <div className="flex items-center gap-4">
                <a href="/profile">
                  <img
                    src={account.image}
                    alt="Profile"
                    className="w-9 h-9 rounded-full"
                  />
                </a>
                <a href="/profile">{account.name}</a>
                <button
                  onClick={handleLogOut}
                  className="hover:text-red-400 transition"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </div>
            ) : (
              <>
                <a href="/loginPage" className="hover:text-gray-400">
                  Đăng nhập
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
