"use client";
import Header from "@/components/component_user/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllExam, searchExam } from "@/services/exam.service";
import { Exam } from "@/interface/admin";
import Footer from "@/components/component_user/Footer";
import { useParams, useRouter } from "next/navigation";

export default function Exams() {
  const { subject, id }: { subject: string; id: any } = useParams();
  const examState = useSelector((state: any) => state.exams.exam);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      dispatch(getAllExam(parseInt(id)));
    }
  }, [dispatch, id]);

  const handleClick = (idCheck: number, exam: Exam) => {
    const encodedNameLesson = encodeURIComponent(exam.nameLesson);
    router.push(`/user/examDetail/${encodedNameLesson}/${idCheck}`);
  };

  // Hàm tìm kiếm đề thi
  const [search, setSearch] = useState<string>("");
  const handleSearch = async () => {
    if (id) {
      await dispatch(searchExam({ idLesson: parseInt(id), search }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
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

        {/* Search section */}
        <div className="flex justify-center py-6">
          <input
            type="search"
            name="search"
            value={search}
            className="w-80 h-12 border border-gray-400 rounded-md px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tìm kiếm đề thi"
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Tìm kiếm
          </button>
        </div>

        {/* Exam list */}
        <section className="container mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-6">Các đề thi {subject}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {examState.map((exam: Exam) => (
              <div
                key={exam.id}
                onClick={() => handleClick(exam.id, exam)}
                className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={exam.image}
                  alt={exam.nameLesson}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-red-500">
                    {exam.nameLesson}
                  </h3>
                  <p className="text-green-500">{exam.describe}</p>
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
