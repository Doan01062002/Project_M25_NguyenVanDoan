"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "@/components/component_user/Footer";
import Header from "@/components/component_user/Header";
import { getExamById } from "@/services/exam.service";
import { Exam } from "@/interface/admin";
import { getAllQues } from "@/services/question.service";
import { useParams, useRouter } from "next/navigation";

export default function ExamDetail() {
  const [account, setAccount] = useState(
    JSON.parse(localStorage.getItem("account") || "null")
  );
  const { id }: { id: any } = useParams();
  const examDetail = useSelector((state: any) => state.exams.examDetail);
  const quesState = useSelector((state: any) => state.questions.ques);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      dispatch(getExamById(parseInt(id)));
      dispatch(getAllQues(parseInt(id)));
    }
  }, [dispatch, id]);

  const handleClick = (id: number, exam: Exam) => {
    if (account) {
      const encodedNameLesson = encodeURIComponent(exam.nameLesson);
      router.push(`/user/question/${encodedNameLesson}/${id}`);
    } else {
      router.push("/loginPage");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100 p-6">
        <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Thông tin đề thi</h1>
          {examDetail ? (
            <div className="flex flex-col md:flex-row items-start">
              <img
                src={examDetail.image}
                alt="Exam"
                className="w-full md:w-1/3 rounded-lg shadow-md mb-6 md:mb-0"
              />
              <div className="md:ml-6">
                <h2 className="text-2xl font-semibold mb-2">
                  {examDetail.nameLesson}
                </h2>
                <div className="text-lg mb-4">
                  <p className="flex items-center mb-2">
                    <i className="fas fa-calendar-day mr-2"></i>
                    Lượt thi: {examDetail.examTurn}
                  </p>
                  <p className="flex items-center mb-2">
                    <i className="fas fa-question-circle mr-2"></i>
                    {quesState.length} câu hỏi
                  </p>
                  <p className="flex items-center mb-2">
                    <i className="fas fa-clock mr-2"></i>
                    20 phút
                  </p>
                </div>
                <div className="flex items-center mb-4">
                  <i className="fas fa-star text-yellow-400 mr-1"></i>
                  <i className="fas fa-star text-yellow-400 mr-1"></i>
                  <i className="fas fa-star text-yellow-400 mr-1"></i>
                  <i className="fas fa-star text-yellow-400 mr-1"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
                <button
                  onClick={() => handleClick(examDetail.id, examDetail)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center"
                >
                  <i className="fas fa-play mr-2"></i>
                  Bắt Đầu Làm Bài
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">Loading...</p>
          )}
        </div>
      </main>
      <section className="bg-gray-200 p-6">
        <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <img
              src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" // Add profile image URL here
              alt="Profile"
              className="w-12 h-12 rounded-full mr-4"
            />
            <p className="text-lg font-semibold">User Name</p>
          </div>
          <div className="mb-4">
            <textarea
              id="input-comment"
              cols={100}
              placeholder="Bình luận...."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none"
            />
          </div>
          <div className="flex gap-4 mb-4">
            <button
              id="oldComment"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Bình luận
            </button>
            <button
              id="updateComment"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
            >
              Cập nhật
            </button>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center w-full">
            <p className="flex-grow text-center">Tất cả bình luận</p>
          </button>
          <div id="displayComment" className="mt-4" />
        </div>
      </section>
      <Footer />
    </div>
  );
}
