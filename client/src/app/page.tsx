"use client";
import { useDispatch, useSelector } from "react-redux";
import Footer from "@/components/component_user/Footer";
import Header from "@/components/component_user/header";
import { useEffect } from "react";
import { getAllCourse } from "@/services/course.service";
import { Course } from "@/interface/admin";
import { useRouter } from "next/navigation";

export default function Home() {
  const courseState = useSelector((state: any) => state.courses.course);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getAllCourse());
  }, [dispatch]);

  const handleClick = (id: number, course: Course) => {
    router.push(`/subject/${course.nameCourse}/${id}`);
    localStorage.setItem("idCourse", JSON.stringify(id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1">
        {/* Carousel */}
        <section className="relative">
          <div id="carouselExampleCaptions" className="carousel slide">
            <div className="carousel-inner relative overflow-hidden w-full">
              {[
                {
                  imgSrc:
                    "https://i.ytimg.com/vi/Vw6sX_a-xyM/maxresdefault.jpg",
                  captionTitle: "Cô Vũ Thị Mai Phương",
                  captionText: "Nâng cao trình độ ngữ pháp cùng từ vựng!",
                },
                {
                  imgSrc:
                    "https://mshoagiaotiep.com/uploads/images/resize/900x900/2020/08/lotrinhkhtructuyen.png",
                  captionTitle: "Cô Nguyễn Minh Hoa",
                  captionText: "Kỹ năng giao tiếp linh hoạt!",
                },
                {
                  imgSrc:
                    "https://i.ytimg.com/vi/3uUa9-LKfcA/maxresdefault.jpg",
                  captionTitle: "Thầy Lưu Huy Thưởng",
                  captionText:
                    "Đạt giải thưởng Giáo viên Quốc Tế và Tin Học Nâng Cao",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={item.imgSrc}
                    className="d-block w-full h-96 object-cover"
                    alt={`Slide ${index + 1}`}
                  />
                  <div className="carousel-caption absolute bottom-0 left-0 right-0 text-center bg-gradient-to-t from-black to-transparent text-white p-4">
                    <h1 className="text-2xl font-bold mb-2 bg-yellow-500 p-2 rounded-lg">
                      {item.captionTitle}
                    </h1>
                    <p className="text-lg bg-yellow-500 p-2 rounded-lg">
                      {item.captionText}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-4">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="bg-gray-800 text-white rounded-full w-3 h-3"
                aria-current="true"
                aria-label="Slide 1"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                className="bg-gray-800 text-white rounded-full w-3 h-3"
                aria-label="Slide 2"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                className="bg-gray-800 text-white rounded-full w-3 h-3"
                aria-label="Slide 3"
              />
            </div>
          </div>
        </section>

        {/* Banner */}
        <div className="relative overflow-hidden bg-gray-800 text-white">
          <div className="absolute inset-0">
            <img
              src="https://eduquiz.vn/_next/image?url=%2Fassets%2Fimages%2Fhomepage%2Fbanner_user_4.png&w=3840&q=100"
              alt="Banner Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50" />
          </div>
          <div className="relative z-10 p-6 text-center">
            <h1 className="text-4xl font-bold mb-2">Công cụ ôn thi</h1>
            <p className="text-lg mb-4">Trắc Nghiệm hiệu quả</p>
            <p className="mb-6">
              Thông qua các bài thi trắc nghiệm, công cụ sẽ giúp bạn học tập, ôn
              thi hiệu quả hơn, đạt điểm cao hơn.
            </p>
            <a href="Subjects.html">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
                Thi Ngay
              </button>
            </a>
            <div className="mt-6 flex justify-around text-center text-white">
              <div>
                <p className="text-3xl font-bold">10M+</p>
                <p>Lượt truy cập</p>
              </div>
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p>Đề thi</p>
              </div>
              <div>
                <p className="text-3xl font-bold">100M+</p>
                <p>Lượt thi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses */}
        <section className="p-6">
          <h1 className="text-3xl font-bold text-center mb-8">
            Các khóa luyện thi
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {courseState.map((course: Course) => (
              <div
                key={course.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => handleClick(course.id, course)}
              >
                <img
                  src={course.image}
                  alt={course.nameCourse}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-center text-red-600 mb-2">
                    {course.nameCourse}
                  </h3>
                  <p className="text-center text-gray-600">{course.describe}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
