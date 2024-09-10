"use client";
import { useDispatch, useSelector } from "react-redux";
import Footer from "@/components/component_user/Footer";
import Header from "@/components/component_user/Header";
import { useEffect } from "react";
import { getAllCourse } from "@/services/course.service";
import { Course } from "@/interface/admin";
import { useRouter } from "next/navigation";
import Carousel from "react-bootstrap/Carousel";

export default function Home() {
  const courseState = useSelector((state: any) => state.courses.course);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getAllCourse());
  }, [dispatch]);

  const handleClick = (id: number, course: Course) => {
    router.push(`/user/subject/${course.nameCourse}/${id}`);
    localStorage.setItem("idCourse", JSON.stringify(id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1">
        {/* Carousel */}
        <Carousel fade>
          <Carousel.Item>
            <img
              src="https://i.ytimg.com/vi/Vw6sX_a-xyM/maxresdefault.jpg"
              alt="First slide"
              className="w-full h-[500px] object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
            <Carousel.Caption>
              <h3 className="text-xl font-bold">First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://mshoagiaotiep.com/uploads/images/resize/900x900/2020/08/lotrinhkhtructuyen.png"
              alt="Second slide"
              className="w-full h-[500px] object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
            <Carousel.Caption>
              <h3 className="text-xl font-bold">Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://i.ytimg.com/vi/3uUa9-LKfcA/maxresdefault.jpg"
              alt="Third slide"
              className="w-full h-[500px] object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
            <Carousel.Caption>
              <h3 className="text-xl font-bold">Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

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
        {/* Banner */}
        <div className="relative overflow-hidden bg-gray-800 text-white">
          <div className="absolute inset-0">
            <img
              src="https://png.pngtree.com/thumb_back/fh260/back_our/20190625/ourmid/pngtree-college-entrance-test-cartoon-education-banner-background-image_257536.jpg"
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
      </main>
      <br />
      <Footer />
    </div>
  );
}
