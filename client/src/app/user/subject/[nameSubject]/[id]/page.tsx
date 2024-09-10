"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubject, searchSubject } from "@/services/subject.service";
import { Subject } from "@/interface/admin";
import Header from "@/components/component_user/Header";
import Footer from "@/components/component_user/Footer";
import { useParams, useRouter } from "next/navigation";

export default function Subjects() {
  const { course, id }: { course: string; id: any } = useParams();
  const subjectState = useSelector((state: any) => state.subjects.subject);
  const dispatch = useDispatch();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectsPerPage] = useState(3); // Number of subjects per page

  useEffect(() => {
    if (id) {
      dispatch(getAllSubject(parseInt(id)));
    }
  }, [dispatch, id]);

  const handleSearch = () => {
    dispatch(searchSubject({ idCourse: parseInt(id), searchItem: searchTerm }));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleClick = (id: number, subject: Subject) => {
    router.push(`/user/exam/${encodeURIComponent(subject.nameSubject)}/${id}`);
    localStorage.setItem("idSubject", JSON.stringify(id));
  };

  // Pagination logic
  const indexOfLastSubject = currentPage * subjectsPerPage;
  const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
  const currentSubjects = subjectState.slice(
    indexOfFirstSubject,
    indexOfLastSubject
  );
  const totalPages = Math.ceil(subjectState.length / subjectsPerPage);

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
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
              onClick={() => handleSearch()}
            >
              Thi Ngay
            </button>
          </div>
        </div>

        {/* Search and Subject List */}
        <section className="container mx-auto py-12 px-4">
          <div className="mb-4 flex justify-between items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm môn học..."
              className="border border-gray-400 rounded-lg px-4 py-2"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Tìm kiếm
            </button>
          </div>

          <h1 className="text-3xl font-bold mb-6">Các môn thi {course}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentSubjects.map((subject: Subject) => (
              <div
                key={subject.id}
                onClick={() => handleClick(subject.id, subject)}
                className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={subject.image}
                  alt={subject.nameSubject}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-red-500">
                    {subject.nameSubject}
                  </h3>
                  <p className="text-green-500">{subject.describe}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-2 px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
